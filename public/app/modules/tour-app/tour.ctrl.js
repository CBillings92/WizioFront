angular.module('TourApp')
    .controller('TourCtrl', [
    '$scope',
    function ($scope) {
        $scope.viewFloorPlan = false;
        $scope.selectPhoto = false;
        document.getElementsByTagName('body')[0].style["padding-bottom"] = 0;

        $scope.media = {
            vrphoto: [
                {title: 'Photo 1'},
                {title: 'Photo 2'},
            ]
        }

        /**
         * Handles control button actions
         * @param  {[type]} toggle [description]
         * @return {[type]}        [description]
         */
        $scope.buttonAction = function(toggle) {
            if (toggle === 'toggleFloorplan') {
                $scope.viewFloorPlan = !$scope.viewFloorPlan
                if ($scope.selectPhoto && $scope.viewFloorPlan) {
                    $scope.selectPhoto = !$scope.selectPhoto;
                }
            } else {
                $scope.selectPhoto = !$scope.selectPhoto
                if ($scope.viewFloorPlan && $scope.selectPhoto) {
                    $scope.viewFloorPlan = !$scope.viewFloorPlan;
                }

            }
        }
    }
])
