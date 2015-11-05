angular.module('NavbarApp')
    .controller('NavbarCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$http',
        'ApartmentSearchSvc',
        'AuthFct',
        'SmartSearchSvc',
        function($rootScope, $scope, $state, $http, ApartmentSearchSvc, AuthFct, SmartSearchSvc) {
            $scope.goToLogin = function() {
                $state.go('Login');
            };
            $scope.search = function() {
                ApartmentSearchSvc.searchApartment($scope.searchString);
                $state.go('Unit.Display');
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

            $scope.goBlog = function(val) {
                $state.go('Blog.List');

            };
            $scope.goAccoutCreate = function() {
                $state.go('Account.Create');
            };
            $scope.goAccountDashboard = function(){
                $state.go('Account.Dashboard.Main');
            };
        }
    ]);
