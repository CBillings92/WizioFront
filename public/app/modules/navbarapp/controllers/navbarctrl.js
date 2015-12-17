angular.module('NavbarApp')
    .controller('NavbarCtrl', [
        '$rootScope',
        '$location',
        '$scope',
        '$state',
        '$http',
        '$modal',
        'ApartmentSearchSvc',
        'AuthFct',
        'SmartSearchSvc',
        'ModalSvc',
        'WizioConfig',
        function($rootScope, $location, $scope, $state, $http, $modal, ApartmentSearchSvc, AuthFct, SmartSearchSvc, ModalSvc, WizioConfig) {
            $scope.isCollapsed = false;
            var modalOptions = function(closeButtonText, actionButtonText, headerText, bodyText) {
                return {
                    closeButtonText: closeButtonText,
                    actionButtonText: actionButtonText,
                    headerText: headerText,
                    bodyText: bodyText,
                };
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

            $scope.isActive = function(route) {
                return (route === $location.path());
            };

            $scope.goToLogin = function() {
                var authViews = WizioConfig.AccountAuthViewsURL;
                var modalDefaultsLogin = modalDefaults(authViews + 'Login.html', 'AuthLoginModalCtrl');

                ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result) {
                    return;
                });
            };
            $scope.search = function() {
                //SECOND ARG IS UNIT NUM
                ApartmentSearchSvc.searchApartment($scope.searchString, null, $scope.filters, function(err, results) {
                    $state.go('Unit.Display');
                });

            };
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };
            $scope.logout = function(success) {
                AuthFct.logout();
            };
            $scope.createUnit = function() {
                $state.go('Unit.Create');
            };
            $scope.goHome = function() {
                $state.go('LandingPage');
            };
            $scope.goAbout = function() {
                $state.go('About');
            };

            $scope.goBlog = function(val) {};
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

                var modalDefaultsLandlordSignup = modalDefaults(authViews + 'AuthCreateAcctForm.html', 'AuthCreateAcctModalCtrl', 'Landlord');

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
                    } else if (result === 'landlordSignup') {
                        ModalSvc.showModal(modalDefaultsLandlordSignup, {}).then(function(result) {
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
            $scope.goAccountDashboard = function() {
                $state.go('Account.Dashboard.Main');
            };
        }
    ]);
