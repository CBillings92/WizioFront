angular.module('NavbarApp')
    .controller('NavbarCtrl', [
        '$rootScope',
        '$location',
        '$scope',
        '$state',
        '$uibModal',
        'ApartmentModel',
        'AuthFct',
        'SmartSearchSvc',
        'ModalBuilderFct',
        'ModalSvc',
        'WizioConfig',
        function($rootScope, $location, $scope, $state, $uibModal, ApartmentModel, AuthFct, SmartSearchSvc, ModalBuilderFct, ModalSvc, WizioConfig) {
            $scope.isCollapsed = false;
            $scope.showWhiteLogoFlag = $state.current.name === 'LandingPage' || $state.current.name === 'About' ? true : false;

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

            if($state.current.name === 'LandingPage' || $state.current.name === 'About'){
                $scope.landingPageStyle = {position: "absolute"};
            } else {
                $scope.landingPageStyle = {};
            }

            $scope.goToLogin = function() {
                var view = WizioConfig.pages.login.modals.view;
                var controller = WizioConfig.pages.login.modals.controller;

                ModalBuilderFct.buildComplexModal(
                    "md",
                    view,
                    controller,
                    {}
                )
                .then(function (response) {
                    return;
                })
            };
            $scope.search = function(){
                //massage data into proper form for building a new apartment instance
                var data = {
                    concatAddr : $scope.searchString
                };
                // SearchFct.search(data, $scope.filters, function(response){
                //     $state.go('Unit.Display');
                // });

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
            $scope.navigate = function(state) {
                $state.go(state);
            };
            $scope.goBlog = function(val) {};

            $scope.signup = function signup() {
                var modalDefaultsSignup = modalDefaults('public/app/modules/accountapp/auth2app/views/signupmodal.view.html', 'SignupFormCtrl');

                ModalSvc.showModal(modalDefaultsSignup, {})
                .then(function(response) {
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
            $scope.goAccountDashboard = function() {
                $state.go('Account.Dashboard.ShareTour');
                return;
            };
        }
    ]);
