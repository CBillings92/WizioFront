angular.module('InfoApp')
    .controller('InfoAppDashboardCtrl', [
        '$scope',
        '$resource',
        'WizioConfig',
        'lodash',
        function($scope, $resource, WizioConfig, lodash){
            // alert('works');
            $resource(WizioConfig.baseAPIURL + 'info')
            .get(function(response){
                // alert('in response');
                var neighborhoods = {};
                console.dir('hello');
                console.dir(response);
                lodash.forEach(response.byNeighborhood, function(val, key){
                    neighborhoods.amount = val.length;
                    neighborhoods.neighborhood = key;

                    neighborhoods[key] = {
                        amount: val.length,
                        neighborhood: key
                    };
                });
                console.dir(neighborhoods);
                $scope.sortedNeighborhoods = lodash.sortBy(neighborhoods, 'amount');
                console.dir($scope.sortedNeighborhoods);
                $scope.data = response;
            });
        }
    ]);
