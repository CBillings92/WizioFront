angular.module('SharedServicesApp')
    .service('ApartmentSearch', [
        '$rootScope',
        'Search',
        function($rootScope, Search) {
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
                    Search.query(null, {
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
                    Search.query(null, {
                        flag: queryParams.flag,
                        searchString: queryParams.string
                    }, function(results, status) {
                        $rootScope.$broadcast('searchFinished', results);
                        return "search complete";
                    });
                }
            }
            return {
                search: searchApartment
            };
        }
    ]);
