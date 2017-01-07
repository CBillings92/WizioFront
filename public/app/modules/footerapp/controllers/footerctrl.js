angular.module('FooterApp').controller('FooterCtrl', [
    '$rootScope',
    '$scope',
    '$state',
    '$http',
    '$uibModal',
    'AuthFct',
    'SmartSearchSvc',
    'WizioConfig',
    'ModalBuilderFct',
    function($rootScope, $scope, $state, $http, $uibModal, AuthFct, SmartSearchSvc, WizioConfig, ModalBuilderFct) {

        $scope.goToLogin = function() {
            $state.go('Login');
        };
        //FIXME search functionality
        //   $scope.search = function() {
        //       $state.go('Unit.Display');
        //   };
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
        $scope.goAccountCreate = function() {
            ModalBuilderFct.buildComplexModal('md', '/public/app/modules/accountapp/termsandservices/termsandservices.view.html', 'TermsAndServicesCtrl', null).then(function(response) {
                if (response === "success") {
                    ModalBuilderFct.buildComplexModal('md', 'public/app/modules/accountapp/auth2app/views/signupmodal.view.html', 'SignupFormCtrl', null).then(function(response) {});
                }
            });
        };

        $scope.goAccountDashboard = function() {
            $state.go('Account.Dashboard.Main');
        };
    }
]);
