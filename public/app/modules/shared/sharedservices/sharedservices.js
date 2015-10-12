angular.module('SharedServiceApp')
    .service('ApartmentSearchSvc', [
        '$rootScope',
        '$sessionStorage',
        'SearchResource',
        'UnitCreateSvc',
        function($rootScope, $sessionStorage, SearchResource, UnitCreateSvc) {
            function searchApartment(searchString) {
                //store reused javascript regular expression in re
                //regular expression checks for any non-decimal character
                var re = /\D/;
                //initialize empty javascript object for storing query params
                var queryParams = {};

                //check if the searched string has any non-decimal characters (anything not 0-9)
                if (searchString.match(re) === null) {
                    //if search string only has numbers, build queryParams obj
                    //ZIP CODE SEARCHED
                    queryParams = {
                        string: searchString,
                        flag: "zip"
                    };
                    //call a GET request to search API passing in the search string from queryParams
                    //store results in local storage
                    //$scope.$storage.apartments =
                    SearchResource.query(null, {
                        flag: queryParams.flag,
                        searchString: queryParams.string
                    }, function(results, status) {
                        console.dir(results);
                        $rootScope.$broadcast('searchFinished', results);
                        return "search complete";
                    });
                } else {
                    //NOT ZIP SEARCHED
                    queryParams = {
                        //call a GET request to search API passing in the search string from queryParams
                        //store results in local storage
                        string: searchString,
                        flag: "mix"
                    };

                    UnitCreateSvc.parseGeocodeData(searchString, null, function(err, data) {
                        console.dir(data);
                    });
                    /*            //$scope.$storage.apartments =
                                SearchResource.query(null, {
                                    flag: queryParams.flag,
                                    searchString: queryParams.string
                                }, function(results, status) {
                                    $rootScope.$broadcast('searchFinished', results);
                                    $sessionStorage.apartmentSearch = results;
                                    console.dir(results);
                                    console.dir(status);
                                    return "search complete";
                                });
                                */
                }
            }
            return {
                searchApartment: searchApartment
            };
        }
    ])
    .service('UserRegistrationSvc', [
        '$state',
        'AuthRegistrationResource',
        function($state, AuthRegistrationResource) {
            function registerUser(user, callback) {
                console.dir("in setUserObj");
                AuthRegistrationResource.save(user, function(data) {
                    callback(data);
                });
            }
            return {
                saveUser: registerUser
            };
        }

    ])
    .service('TokenSvc', [
        '$localStorage',
        'jwtHelper',
        function($localStorage, jwtHelper) {
            //decode auth token for front end. Retrieves user information
            var decode = function(token) {
                if (token) {
                    return jwtHelper.decodeToken(token);
                }
                return jwtHelper.decodeToken($localStorage.token);
            };
            //returns true if the token is expired
            var checkExp = function(token) {
                if (token) {
                    return jwtHelper.isTokenExpired(token);
                } else if ($localStorage.token) {
                    return jwtHelper.isTokenExpired($localStorage.token);
                }
                return false;
            };
            var storeToken = function(token) {
                if (token) {
                    $localStorage.token = token;
                    return true;
                }
                return false;
            };
            var getToken = function() {
                if ($localStorage.token) {
                    return $localStorage.token;
                } else {
                    return false;
                }
            };
            var deleteToken = function() {
                if ($localStorage.token) {
                    delete $localStorage.token;
                    return true;
                } else {
                    return false;
                }
            };
            //return all functions
            return {
                decode: decode,
                checkExp: checkExp,
                storeToken: storeToken,
                getToken: getToken,
                deleteToken: deleteToken
            };
        }
    ])
    .service('SmartSearchSvc', [
        '$http',
        'FlexGetSetSvc',
        function($http, FlexGetSetSvc) {
            //accepts a search string, makes a request to the google API
            //and returns the formatted address to the controller
            var smartSearch = function(val) {
                return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                    headers: {
                        searchCheck: true
                    },
                    params: {
                        address: val,
                        sensor: false,
                        components: "state:MA"
                    }
                }).then(function(response) {
                    console.dir(response);
                    FlexGetSetSvc.set(response);
                    return response.data.results.map(function(item) {
                        return item.formatted_address;

                    });
                });
            };
            //return all functions
            return {
                smartSearch: smartSearch
            };
        }
    ]);
