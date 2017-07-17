angular.module('FlyOutMenuApp')
    .controller('FlyOutMenuCtrl', [
        '$scope',
        function($scope){
            $scope.menuIsOpen = false;
            var hideFloorPlanButton = false;
            function viewFloorPlan() {
                $scope.$emit('ToggleFloorPlan', {});
                $scope.menuIsOpen = !$scope.menuIsOpen;
            }
            function viewPhotoList() {
                $scope.$emit('TogglePhotoList');
                $scope.menuIsOpen = !$scope.menuIsOpen;

            }
            function enableAccelerometer() {
                $scope.accelerometerToggle();
            }
            $scope.openCloseMenu = function() {
                $scope.menuIsOpen = !$scope.menuIsOpen;
                // set floorplan button visibility
                if($scope.floorPlan){
                    $scope.actions[0].show = true;
                } else {
                    $scope.actions[0].show = false;
                }
            };
            $scope.actions = [
                {
                    'name': 'Floor Plan',
                    'action': viewFloorPlan,
                    'show': hideFloorPlanButton

                },
                {
                    'name': 'Photo List',
                    'action': viewPhotoList,
                    'show': true
                },
                {
                    'name': '360 Control',
                    'action': enableAccelerometer,
                    'show': true

                }
            ];
        }
    ]);
