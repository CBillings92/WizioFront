angular.module('NewTourApp')
.controller('VrPlayerInterfaceCtrl', [
    '$scope',
    '$state',
    '$resource',
    'lodash',
    'WizioConfig',
    'AWSFct',
    'LoadingSpinnerFct',
    '$sce',
    'VrPlayerInterfaceFct',
    function($scope, $state, $resource, lodash, WizioConfig, AWSFct, LoadingSpinnerFct, $sce, VrPlayerInterfaceFct) {
        $scope.state = $state.current.name;
        $scope.showInterface = true;
        $scope.$on('InterfaceDataReceived', function(event, data){
            $scope.data = data;
            $scope.media = data.media;
            $scope.showInterface = data.showInterface;
            $scope.floorPlan = data.floorPlan;
        });

        $scope.$on('ToggleFloorPlan', function(event, data) {
            menuButtonAction('toggleFloorplan');
        });

        $scope.$on('TogglePhotoList', function(event, data) {
            menuButtonAction('togglePhotoList');

        })

        // For photo and floorplan selection
        $scope.selectPhoto = false;
        $scope.viewFloorPlan = false;

        /* If the state calls for a full screen VR Player, remove body styling and show controls */
        if ($scope.state === 'Tour' || $scope.state === 'Demo') {
            $scope.showcontrols = true;
            $scope.showcontactinfo = true;
            $scope.showpoweredby = true;
            document.getElementsByTagName('body')[0].style["padding-bottom"] = 0;
            document.getElementsByTagName('body')[0].style["margin-bottom"] = 0;
        }

        /**
         * Toggles the accelerometer on the VR player library
         * @return {undefined} [undefined]
         */
        function accelerometerToggle() {
            $scope.toggle = !$scope.toggle;
            wizio.toggleAccelerometer();
            return;
        }

        function menuButtonAction(action) {
            if (action === 'toggleFloorplan') {
                $scope.viewFloorPlan = !$scope.viewFloorPlan;
                if ($scope.selectPhoto && $scope.viewFloorPlan) {
                    $scope.selectPhoto = !$scope.selectPhoto;
                }
            } else {
                $scope.selectPhoto = !$scope.selectPhoto;
                if ($scope.viewFloorPlan && $scope.selectPhoto) {
                    $scope.viewFloorPlan = !$scope.viewFloorPlan
                }
            }
        }

        $scope.buttonAction = menuButtonAction;
        $scope.accelerometerToggle = accelerometerToggle;

        // Allow the user to change photos
        $scope.changePhoto = function(photoIndex) {
            var state = $state.current.name;
            var SubscriptionApartmentPubId = AWSFct.utilities.modifyKeyForEnvironment($scope.media.vrphoto[0].SubscriptionApartmentPubId);

            var photoUrl = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" + $scope.media.vrphoto[photoIndex].title + '.JPG';

            LoadingSpinnerFct.show('vrPlayerLoader');
            $scope.photoIndex = photoIndex;
            $scope.photoUrl = photoUrl;
            wizio.changeImage(photoUrl);
            $scope.selectPhoto = false;
            $scope.viewFloorPlan = false;
            LoadingSpinnerFct.hide('vrPlayerLoader');
        };

    }
])
