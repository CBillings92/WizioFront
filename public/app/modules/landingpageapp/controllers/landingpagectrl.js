angular.module('LandingPageApp').controller('LandingPageCtrl', [
    '$scope',
    '$state',
    '$resource',
    'SmartSearchSvc',
    'SearchFct',
    'WizioConfig',
    'ModalSvc',
    'ModalBuilderFct',
    'UnitMapFct',
    function($scope, $state, $resource, SmartSearchSvc, SearchFct, WizioConfig, ModalSvc, ModalBuilderFct, UnitMapFct) {
        $scope.devEnvironmentCheck = window.location.origin = 'http://172.16.0.2:3000';
        $scope.data = {};
        $scope.mapViewSelected = false;
        $scope.filters = {
            beds: null,
            baths: null,
            minPrice: null,
            maxPrice: null
        };
        var listOfUnits = null;

        $scope.toggleMapView = function() {
            if (listOfUnits) {
                $scope.mapViewSelected = !$scope.mapViewSelected;

            } else {
                $resource(WizioConfig.baseAPIURL + 'apartment/landingpage/mapunits').query(function(response) {
                    $scope.mapViewSelected = !$scope.mapViewSelected;
                    var googleMap = new google.maps.Map(document.getElementById('mapLP'), {
                        scrollwheel: false,
                        zoom: 12,
                        center: new google.maps.LatLng(42.3601, -71.0589),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });
                    listOfUnits = response;
                    var mapOptions = UnitMapFct.setMapOptions(response);

                    UnitMapFct.addMapPinsToMap(response, googleMap);

                });
            }

            return;
        };

        var modalDefaults = function(templateUrl, controller, accountType) {
            return {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                templateUrl: templateUrl,
                controller: controller,
                animation: false,
                resolve: {
                    data: function() {
                        return accountType;
                    }
                }
            };
        };
        //smart search/typeahead functionality
        $scope.getLocation = function(val) {
            return SmartSearchSvc.smartSearch(val);
        };
        //search function
        $scope.search = function() {
            SearchFct.search({
                concatAddr: $scope.data.searchString
            }, $scope.filters, function(response) {
                $state.go('Unit.Display');
            });
        };

        $scope.openTermsOfServicesModal = function openTermsOfServicesModal() {
            ModalBuilderFct.buildComplexModal('md', '/public/app/modules/accountapp/termsandservices/termsandservices.view.html', 'TermsAndServicesCtrl', null).then(function(response) {
                if (response === "success") {
                    ModalBuilderFct.buildComplexModal('md', 'public/app/modules/accountapp/auth2app/views/signupmodal.view.html', 'SignupFormCtrl', null)
                    .then(function(response){
                    });
                }
            });
        };

        function goAccountCreate() {

            //shorten the authViews URL variable so we don't need to type wizioconfig.yada every time...
            var authViews = WizioConfig.AccountAuthViewsURL;
            /*
                                create variables by using local function above that will be used to
                                create the modals with the correct templateUrl, controller, and if
                                applicable, data
                            */
            var modalDefaultsAccountType = modalDefaults(authViews + 'AccountTypeModal.html', 'AccountTypeModalCtrl');

            var modalDefaultsTenantSignup = modalDefaults(authViews + 'AuthCreateAcctForm.html', 'AuthCreateAcctModalCtrl', 'Tenant');

            var modalDefaultsPropertyManagerSignup = modalDefaults(authViews + 'AuthCreateAcctForm.html', 'AuthCreateAcctModalCtrl', 'PropertyManager');

            var modalDefaultsLogin = modalDefaults(authViews + 'Login.html', 'AuthLoginModalCtrl');

            //show modal for choosing account type
            ModalSvc.showModal(modalDefaultsAccountType, {}).then(function(result) {
                /*
                                if they choose "Tenant", show account create form and pass 'Tenant' to controller as data
                                */
                if (result === 'tenantSignup') {
                    ModalSvc.showModal(modalDefaultsTenantSignup, {}).then(function(result) {
                        //if they choose to login instead of create an account, load login modal
                        if (result === "login") {
                            ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result) {
                                return;
                            });

                        } else if (result == 'backStep') {
                            $scope.goAccoutCreate();
                        } else {
                            return;
                        }
                    });
                } else if (result === 'propertyManagerSignup') {
                    ModalSvc.showModal(modalDefaultsPropertyManagerSignup, {}).then(function(result) {
                        if (result === 'login') {
                            ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result) {
                                return;
                            });
                        } else {
                            return;
                        }
                    });
                }
            });

        }

        $scope.goAccountCreate = goAccountCreate;

    }
]);
