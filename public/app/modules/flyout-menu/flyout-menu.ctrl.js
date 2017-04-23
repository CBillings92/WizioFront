angular.module('FlyOutMenuApp')
    .controller('FlyOutMenuCtrl', [
        '$scope',
        function($scope){
            $scope.menuIsOpen = false;
            function viewFloorPlan() {
                $scope.buttonAction('toggleFloorplan');
                $scope.menuIsOpen = !$scope.menuIsOpen
            }
            function viewPhotoList() {
                $scope.buttonAction('togglePhotos');
                // $scope.selectPhoto = !$scope.selectPhoto;
                $scope.menuIsOpen = !$scope.menuIsOpen

            }
            function enableAccelerometer() {
                $scope.accelerometerToggle();
            }
            $scope.openCloseMenu = function() {
                console.dir($scope.menuIsOpen);
                $scope.menuIsOpen = !$scope.menuIsOpen
            }
            $scope.actions = [
                {
                    'name': 'Floor Plan',
                    'action': viewFloorPlan
                },
                {
                    'name': 'Photo List',
                    'action': viewPhotoList
                },
                {
                    'name': 'Enable Accelerometer',
                    'action': enableAccelerometer
                }
            ]
        }
    ])
