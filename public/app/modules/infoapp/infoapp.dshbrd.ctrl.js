angular.module('InfoApp')
    .controller('InfoAppDashboardCtrl', [
        '$scope',
        '$resource',
        'WizioConfig',
        function($scope, $resource, WizioConfig){
            alert('works');
            $resource(WizioConfig.baseAPIURL + 'info')
            .get(function(response){
                alert('in response');
                $scope.data = response;
            })
        }
    ]);
