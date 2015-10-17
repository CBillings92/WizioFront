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
                $state.go('AptDisplay');
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
            $scope.createUnit = function(val) {
                $state.go('Unit.Create');
            };
            $scope.goHome = function(val) {
                $state.go('LandingPage');
            };
            $scope.goAbout = function(val) {
                $state.go('About');
            };
            $scope.goBlog = function(val) {
                $state.go('Blog');
            };
            $scope.goAccoutCreate = function(val) {
                $state.go('Account.Create');
            };
        }
    ]);
