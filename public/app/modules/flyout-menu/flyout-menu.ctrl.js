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
                // $scope.selectPhoto = !$scope.selectPhoto;
                $scope.menuIsOpen = !$scope.menuIsOpen;

            }
            function enableAccelerometer() {
                $scope.accelerometerToggle();
            }
            $scope.openCloseMenu = function() {
                $scope.menuIsOpen = !$scope.menuIsOpen;
                $scope.actions[0].hide =  $scope.hideFloorPlanButton;
            };
            $scope.actions = [
                {
                    'name': 'Floor Plan',
                    'action': viewFloorPlan,
                    'hide': hideFloorPlanButton

                },
                {
                    'name': 'Photo List',
                    'action': viewPhotoList,
                    'hide': false
                },
                {
                    'name': '360 Control',
                    'action': enableAccelerometer,
                    'hide': false

                }
            ];
        }
    ]);
