angular.module('SharedServiceApp')
    .service('ApartmentSearchSvc', [
        '$rootScope',
        '$sessionStorage',
        '$state',
        'SearchResource',
        'UnitCreateSvc',
        function($rootScope, $sessionStorage, $state, SearchResource, UnitCreateSvc) {
            function searchApartment(searchString, unitNum, filters, callback) {
            //     //second argument is apartmentparams, which is null.
            //     UnitCreateSvc.parseGeocodeData(searchString, {
            //         unitNum: unitNum
            //     }, function(err, data) {
            //         if ($state.current.name === 'AdminPanel.Main') {
            //             data.adminSearch = true;
            //         }
            //         data.filters = filters;
            //         //send POST to /api/search with the apartment data for searching
            //         SearchResource.save(data, function(data, status) {
            //             //data is array of apartments we get back from search
            //             if ($state.current.name !== 'AdminPanel.Main') {
            //                 for (i = 0; i < data.length; i++) {
            //                     var left = Math.floor((data[i].concatAddr.charCodeAt(5) / 19) + 4);
            //                     var right = Math.floor((data[i].concatAddr.charCodeAt(3) / 19) + 4);
            //                     var houseNumInt = parseInt((data[i].concatAddr).replace(/(^\d+)(.+$)/i, '$1'));
            //                     var houseNumLow = houseNumInt - left;
            //                     if (houseNumInt < 15) {
            //                         houseNumLow = 1;
            //                     }
            //                     var houseNumHigh = houseNumInt + right;
            //                     var houseNumRange = houseNumLow.toString() + "-" + houseNumHigh.toString();
            //                     data[i].hiddenAddress = houseNumRange + data[i].concatAddr.replace(/^\d+/, '');
            //                 }
            //             }
            //
            //             $sessionStorage.apartmentSearch = data;
            //             $rootScope.$broadcast('searchFinished', data);
            //             return callback(null, data);
            //         });
            //     });
            // }
            // return {
            //     searchApartment: searchApartment
            }
        }
    ])
    .service('UserRegistrationSvc', [
        '$state',
        'AuthRegistrationResource',
        function($state, AuthRegistrationResource) {
            function registerUser(user, callback) {
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
                if ($localStorage.token && !jwtHelper.isTokenExpired($localStorage.token)) {
                    return jwtHelper.decodeToken($localStorage.token);
                } else {
                    return "No Token";
                }

            };
            //returns true if the token is expired
            var checkExp = function() {
                //If the token exists
                if ($localStorage.token) {
                    if (jwtHelper.isTokenExpired($localStorage.token)) {
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
                    if (jwtHelper.isTokenExpired($localStorage.token)) {
                        $localStorage.token = undefined;
                        delete $localStorage.token;
                        return 'No Token';
                    }
                    return $localStorage.token;
                } else {
                    return 'No Token';
                }
            };
            var deleteToken = function() {
                if ($localStorage.token) {
                    $localStorage.token = undefined;
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
        '$state',
        'FlexGetSetSvc',
        'ApartmentClaimGetSetSvc',
        function($http, $state, FlexGetSetSvc, ApartmentClaimGetSetSvc) {
            //accepts a search string, makes a request to the google API
            //and returns the formatted address to the controller
            var smartSearch = function(val, sessionStorageVar) {
                return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                    headers: {
                        searchCheck: true
                    },
                    params: {
                        address: val,
                        sensor: false,
                        components: 'country:US'
                    }
                }).then(function(response) {
                    if(sessionStorageVar === 'Staging-ApartmentClaims'){
                        ApartmentClaimGetSetSvc.reset('Staging-ApartmentClaims');
                        ApartmentClaimGetSetSvc.set(response.data, sessionStorageVar);
                    } else {
                        FlexGetSetSvc.set(response, sessionStorageVar);
                    }
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
    ])
    .service('ModalSvc', [
        '$uibModal',
        function($uibModal) {
            var modalDefaults = {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: "/public/app/modules/shared/viewtemplates/defaultmodal.html"
            };

            var modalOptions = {
                closeButtonText: "Close",
                actionButtonText: "OK",
                headerText: "Proceed?",
                bodyText: "perform this action"
            };

            this.showModal = function(customModalDefaults, customModalOptions) {
                if (!customModalDefaults) customModalDefaults = {};
                // customModalDefaults.backdrop = 'static';
                return this.show(customModalDefaults, customModalOptions);
            };

            this.show = function(customModalDefaults, customModalOptions) {
                var tempModalDefaults = {};
                var tempModalOptions = {};

                //Map angular-ui modal custom defaults to modal defaults defined in service
                angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

                //Map modal.html $scope custom properties to defaults defined in service
                angular.extend(tempModalOptions, modalOptions, customModalOptions);
                if (!tempModalDefaults.controller) {
                    tempModalDefaults.controller = ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
                        $scope.modalOptions = tempModalOptions;
                        $scope.modalOptions.ok = function(result) {
                            $uibModalInstance.close(result);
                        };
                        $scope.modalOptions.close = function(result) {
                            $uibModalInstance.close('cancel');
                        };
                    }];
                }
                return $uibModal.open(tempModalDefaults).result;
            };

        }
    ])
    .service('TimeFormatterSvc', [
        'moment',
        function(moment){
            function formatTimeFlex(timeToFormat, formatString){
                var formattedDate = moment(timeToFormat).format(formatString);

                return formattedDate;
            }

            return {
                formatTimeFlex: formatTimeFlex
            };
        }
    ]);
