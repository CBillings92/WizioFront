angular.module('SharedServiceApp')
    .service('ApartmentSearchSvc', [
        '$rootScope',
        '$sessionStorage',
        'SearchResource',
        'UnitCreateSvc',
        function($rootScope, $sessionStorage, SearchResource, UnitCreateSvc) {
            function searchApartment(searchString, callback) {
                    UnitCreateSvc.parseGeocodeData(searchString, null, function(err, data) {
                        console.dir(data);
                        SearchResource.save(data, function(data, status){
                            console.dir(data);
                            $rootScope.$broadcast('searchFinished', data);
                            $sessionStorage.apartmentSearch = data;
                            return callback(null, data);
                        });
                    });
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
                console.dir(user);
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
        '$rootScope',
        '$localStorage',
        'jwtHelper',
        function($rootScope, $localStorage, jwtHelper) {
            //decode auth token for front end. Retrieves user information
            var decode = function() {
                return jwtHelper.decodeToken($localStorage.token);
            };
            //returns true if the token is expired
            var checkExp = function() {
                //If the token exists
                if ($localStorage.token) {
                    if(jwtHelper.isTokenExpired($localStorage.token)){
                        delete $localStorage.token;
                        return true;
                    }
                    //if not expired return false
                    return false;
                }
                //if token does equal "No Token" return that token is expired
                return true;
            };
            var storeToken = function(token) {
                if (token) {
                    $rootScope.isLoggedIn = true;
                    $localStorage.token = token;
                    return true;
                }
                return false;
            };
            var getToken = function() {
                if ($localStorage.token) {
                    return $localStorage.token;
                } else {
                    return 'No Token';
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
                        components: 'country:US|administrative_area:MA'
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
