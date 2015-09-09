angular.module('SharedServicesApp')
    .service('ApartmentSearchSvc', [
        '$rootScope',
        '$sessionStorage',
        'Search',
        function($rootScope, $sessionStorage, Search) {
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
    .service('UserRegistration', [
        '$state',
        'registration',
        function($state, registration){
            function registerUser(user, callback){
                console.dir("in setUserObj");
                registration.save(user, function(data){
                    console.dir(data);
                    console.dir(user);
                    if(user.userType === 1){
                        $state.go('ApartmentsDisplay');
                    } else if (user.userType === 2){

                    } else if (user.userType === 3) {
                        $state.go('BrokerAdditionalInfo');
                    }
                });
            }
            return {
                saveUser: registerUser
            };
        }

    ])
    .service('ModalSvc', [
        '$modal',
        function($modal){
            //refer to angular-ui documentation for modal docs
            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: '/app/viewtemplates/public/accountcreate.html'
            };
            var modalOptions =  {
                closeButtonText: 'Close',
                actionButtonText: 'Ok',
                headerText: 'Proceed?',
                bodyText: 'Perform this action?'
            };
            this.showModal = function(customModalDefaults, customModalOptions){
                if (!customModalDefaults) customModalDefaults = {};
                customModalDefaults.backdrop = 'static';
                return this.show(customModalDefaults, customModalOptions);
            };
            this.show = function(customModalDefaults, customModalOptions){
                var tempModalDefaults = {};
                var tempModalOptions = {};

                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);
                angular.extend(tempModalOptions, modalOptions, customModalOptions);

                if(!tempModalDefaults.controller){
                    tempModalDefaults.controller = function($scope, $modalInstance){
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function(result){
                            $modalInstance.close(result);
                        };
                        $scope.modalOptions.close = function(result){
                            $modalInstance.dismiss('cancel');
                        };
                    };
                }

                return $modal.open(tempModalDefaults).result;
            };
        }
    ]);
