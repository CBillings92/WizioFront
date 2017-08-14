angular.module('TourApp').controller('TourCtrl', [
    '$scope',
    '$state',
    '$resource',
    'lodash',
    'WizioConfig',
    'AWSFct',
    'LoadingSpinnerFct',
    '$sce',
    'TourFct',
    function($scope, $state, $resource, lodash, WizioConfig, AWSFct, LoadingSpinnerFct, $sce, TourFct) {
        $scope.state = $state.current.name;

        // For photo and floorplan selection
        $scope.selectPhoto = false;
        $scope.viewFloorPlan = false;

        /* If the state calls for a full screen VR Player, remove body styling and show controls */
        if ($scope.state === 'Tour' || $scope.state === 'Demo') {
            $scope.showcontrols = true;
            $scope.showcontactinfo = true;
            $scope.showpoweredby = true;
            document.getElementById('site-container').style.height = "100%";
            document.geteElementById('site-container').setAttribute("style", "height:100%")
            document.getElementById('main-content').style["padding-bottom"] = 0;
            document.getElementById('main-content').style["margin-bottom"] = 0;
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

        initializeTour();

        /**
         * Get Tour data, then sort the tour photos by photo type
         * @type {[type]}
         */
        function initializeTour() {
            TourFct.getContent()
            .then(function (media) {
                $scope.floorplan = false;
                $scope.hideFloorPlanButton = true;
                var orderedMedia = lodash.groupBy(media, 'type');
                $scope.media = orderedMedia;
                var tourDefaults = TourFct.setTourDefaults(orderedMedia);
                $scope.tourDefaults = tourDefaults;

                if (tourDefaults.Floor_Plan) {
                    $scope.floorplan = tourDefaults.Floor_Plan;
                    $scope.hideFloorPlanButton = false;
                }
            })
        }

        // Allow the user to change photos
        $scope.changePhoto = function(photoIndex) {
            var state = $state.current.name;
            var SubscriptionApartmentPubId = AWSFct.utilities.modifyKeyForEnvironment($scope.media.vrphoto[0].SubscriptionApartmentPubId);
            var photoUrl = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" + $scope.media.vrphoto[photoIndex].title + '.JPG';

            LoadingSpinnerFct.show('vrPlayerLoader');
            $scope.photoIndex = photoIndex;
            $scope.photoUrl = photoUrl;
            wizio.changeImage(photoUrl, function(response){
              $scope.selectPhoto = false;
              $scope.viewFloorPlan = false;
              LoadingSpinnerFct.hide('vrPlayerLoader');
            });
        };

    }
])
