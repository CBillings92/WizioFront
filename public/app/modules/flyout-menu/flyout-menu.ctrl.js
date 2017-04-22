angular.module('FlyOutMenuApp')
    .controller('FlyOutMenuCtrl', [
        '$scope',
        function($scope){
            $scope.actions = [
                {
                    'name': 'Floor Plan'
                },
                {
                    'name': 'Photo List'
                },
                {
                    'name': 'Enable Accelerometer'
                }
            ]
        }
    ])
