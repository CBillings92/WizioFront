angular.module('NavbarApp')
    .controller('NavbarCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$http',
        '$modal',
        'ApartmentSearchSvc',
        'AuthFct',
        'SmartSearchSvc',
        'WizioConfig',
        function($rootScope, $scope, $state, $http, $modal, ApartmentSearchSvc, AuthFct, SmartSearchSvc, WizioConfig) {
            var modal = function(templateUrl, controller, size) {
                var modalInstance = $modal.open({
                    templateUrl: templateUrl,
                    controller: controller,
                    size: size,
                    animation: false
                });
                return modalInstance;
            };
            $scope.goToLogin = function() {
                //$state.go('Login');

                modal(WizioConfig.AccountAuthViewsURL + 'Login.html', 'AuthLoginModalCtrl', 'md');

                modalInstanceLoginForm.result.then(function(result) {

                });
            };
            $scope.search = function() {
                //SECOND ARG IS UNIT NUM
                ApartmentSearchSvc.searchApartment($scope.searchString, null, function(err, results) {
                    $state.go('Unit.Display');
                });

            };
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };
            $scope.logout = function(success) {
                AuthFct.logout();
            };
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
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

            $scope.goBlog = function(val) {
                $state.go('Blog.List');

            };
            $scope.goAccoutCreate = function() {
                //create the Account Type modal
                var modalInstanceAccountType = modal(WizioConfig.AccountAuthViewsURL + 'AccountTypeModal.html', 'AccountTypeModalCtrl', 'md');

                modalInstanceAccountType.result.then(function(result) {
                    //if the user selects to sign up as a tenant, load the account creation form
                    if (result === 'tenantSignup') {
                        var modalInstanceSignup = modal(WizioConfig.AccountAuthViewsURL + 'AuthCreateAcctForm.html', 'AuthCreateAcctModalCtrl', 'md');
                        //if the user selects the login button instead of creating an account, bring them to login modal
                        modalInstanceSignup.result.then(function(result) {
                            if (result === 'login') {
                                var modalInstanceLoginForm = modal(WizioConfig.AccountAuthViewsURL + 'Login.html', 'AuthLoginModalCtrl', 'md');

                                modalInstanceLoginForm.result.then(function(result) {
                                    if (result === 'ok') {

                                    }
                                });
                            } else if (result == 'backStep') {
                                $scope.goAccoutCreate();
                            }
                        });
                    } else if (result === "landlordSignup") {

                    }
                });


            };
            $scope.goAccountDashboard = function() {
                $state.go('Account.Dashboard.Main');
            };
        }
    ]);
