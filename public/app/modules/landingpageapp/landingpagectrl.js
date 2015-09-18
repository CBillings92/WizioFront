angular.module('landingPageApp')
    .controller('landingPageCtrl', [
        '$scope',
        '$http',
        '$state',
        'userRegistration',
        'apartmentSearchSvc',
        function($scope, $http, $state, userRegistration, apartmentSearchSvc) {
            $scope.radioModel = {
                realtor: false,
                tenant: true,
                broker: false
            };
            $scope.search = function() {
                apartmentSearchSvc.search($scope.searchString);
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
            $scope.registerUser = function() {

                var user = {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    password: $scope.password
                };
                console.dir($scope.radioModel);
                if ($scope.radioModel === "tenant") {
                    user.userType = 1;
                } else if ($scope.radioModel === "realtor") {
                    user.userType = 2;
                } else if ($scope.radioModel === "broker") {
                    user.userType = 3;
                }

                userRegistration.saveUser(user);
            };

        }
    ]);
