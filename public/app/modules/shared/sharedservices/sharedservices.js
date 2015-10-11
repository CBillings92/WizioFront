angular.module('SharedServiceApp')
    .service('ApartmentSearchSvc', [
        '$rootScope',
        '$sessionStorage',
        'SearchResource',
        function($rootScope, $sessionStorage, SearchResource) {
            function searchApartment(searchString) {
                //store reused javascript regular expression in re
                //regular expression checks for any non-decimal character
                var re = /\D/;
                //initialize empty javascript object for storing query params
                var queryParams = {};
                //store the current URL of the web app in local variable currenLocation
                var currentLocation = window.location.href;
                //check if the current URL is the search results page. If it isn't
                //redirect user to the search results page
                var getUrl = window.location;
                var baseUrl = getUrl.protocol + "//" + getUrl.host;
                if (currentLocation !== baseUrl + "/#/apartments") {
                    window.location.href = baseUrl + "/#/apartments";
                }
                //check if the searched string has any non-decimal characters (anything not 0-9)
                if (searchString.match(re) === null) {
                    //if search string onl has numbers, build queryParams obj
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
                    //$scope.$storage.apartments =
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
                }
            }
            return {
                search: searchApartment
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
        function($localStorage, jwtHelper){
            var decode = function(token){
                if(token){
                    return jwtHelper.decodeToken(token);
                }
                return jwtHelper.decodeToken($localStorage.token);
            };
            //returns true if the token is expired
            var checkExp = function(token){
                if(token){
                    console.log("WHY AM I IN HERE");
                    console.log(token);
                    return jwtHelper.isTokenExpired(token);
                } else if($localStorage.token){
                    console.dir(jwtHelper.isTokenExpired($localStorage.token));
                    return jwtHelper.isTokenExpired($localStorage.token);
                }
                console.log("NO IF STATEMENTS WORK");
                return false;
            };
            var storeToken = function(token){
                console.dir(token);
                if(token){
                    console.dir(token);
                    $localStorage.token = token;
                    console.dir($localStorage.token);
                    return true;
                }
                return false;
            };
            var getToken = function(){
                if($localStorage.token){
                    return $localStorage.token;
                } else {
                    return false;
                }
            };
            var deleteToken = function(){
                if($localStorage.token){
                    delete $localStorage.token;
                    return true;
                } else {
                    return false;
                }
            };

            return {
                decode: decode,
                checkExp: checkExp,
                storeToken: storeToken,
                getToken: getToken,
                deleteToken: deleteToken
            };
        }
    ]);
