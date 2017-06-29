angular.module('InfoApp')
    .controller('InfoAppDashboardCtrl', [
        '$scope',
        '$resource',
        'WizioConfig',
        'lodash',
        function($scope, $resource, WizioConfig, lodash){
            $resource(WizioConfig.baseAPIURL + 'info')
            .get(function(response){
                var neighborhoods = {};
                lodash.forEach(response.byNeighborhood, function(val, key){
                    neighborhoods.amount = val.length;
                    neighborhoods.neighborhood = key;

                    neighborhoods[key] = {
                        amount: val.length,
                        neighborhood: key
                    };
                });
                $scope.sortedNeighborhoods = lodash.sortBy(neighborhoods, 'amount');
                $scope.data = response;
            });
        }
    ]);
