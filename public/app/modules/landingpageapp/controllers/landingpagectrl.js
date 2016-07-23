angular.module('LandingPageApp')
    .controller('LandingPageCtrl', [
        '$scope',
        '$state',
        'SmartSearchSvc',
        'SearchFct',
        'WizioConfig',
        'ModalSvc',
        'ModalBuilderFct',
        function($scope, $state, SmartSearchSvc, SearchFct, WizioConfig, ModalSvc, ModalBuilderFct) {
            $scope.data = {};
            $scope.filters = {
                beds: null,
                baths: null,
                minPrice: null,
                maxPrice: null
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
                SearchFct.search(
                    {concatAddr: $scope.data.searchString},
                    $scope.filters,
                    function(response) {
                        $state.go('Unit.Display');
                    });
            };
            $scope.goAccoutCreate = function() {

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

            };

        
        }
    ]);
