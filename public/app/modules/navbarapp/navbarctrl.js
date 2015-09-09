angular.module('NavbarApp')
    .controller('NavbarCtrl', [
        '$rootScope',
        '$scope',
        '$state',
        '$http',
        'ApartmentSearchSvc',
        function($rootScope, $scope, $state, $http, ApartmentSearchSvc) {
            $scope.goToLogin = function() {
                $state.go('Login');
            };
            $scope.search = function() {
                ApartmentSearchSvc.search($scope.searchString);
            };
            $scope.getLocation = function(val) {
                return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                    headers: {
                        searchCheck: true
                    },
                    params: {
                        address: val,
                        sensor: false,
                        components: "state:MA"
                    }
                }).then(function(response) {
                    console.dir(response);
                    return response.data.results.map(function(item) {
                        return item.formatted_address;
                    });
                });
            };
        }
    ]);
