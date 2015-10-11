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
                ApartmentSearchSvc.search($scope.searchString);
            };
            $scope.logout = function(success) {
                AuthFct.logout();
            };
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };
        }
    ]);
