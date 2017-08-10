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
    function($scope, $state, $resource, lodash, WizioConfig, AWSFct, LoadingSpinnerFct, $sce) {
        $scope.isCollapsed = false;
        $scope.isRotating = false;


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

        //FIXME don't use JQuery..
        var moveSlider = function(direction) {  // direction is 1 for forward / -1 for backward
            width =  $("#scrollthis").width();
            el = $("#scrollthis");
            currentPosition = el.scrollLeft();
            moveWidth = width * 0.5 * direction;
            // el.scrollLeft(currentPosition + moveWidth);
            el.animate({
                scrollLeft: currentPosition + moveWidth
            }, 500, function () {
                $scope.sliderCanGoForward = $scope.canSliderForward();
                $scope.sliderCanGoBackward = $scope.canSliderBackward();
            });
        };

        $scope.sliderCanGoForward = true;
        $scope.sliderCanGoBackward = false;

        $scope.canSliderBackward = function() {
            return $("#scrollthis").scrollLeft() > 0;
        };

        $scope.canSliderForward = function() {
            el = $("#scrollthis");
            width =  el.outerWidth();
            currentPosition = el.scrollLeft();
            viewportWidth = el.width();
            return currentPosition + viewportWidth < width;
        };

        $scope.moveSliderBackward = function() {
            moveSlider(-1);
        };

        $scope.moveSliderForward = function() {
            moveSlider(1);
        };


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

        $scope.thumbnailURL = function(photoIndex) {
            var SubscriptionApartmentPubId = AWSFct.utilities.modifyKeyForEnvironment($scope.media.vrphoto[0].SubscriptionApartmentPubId);
            return WizioConfig.CLOUDFRONT_DISTRO + "180x90/" + SubscriptionApartmentPubId + "/" + $scope.media.vrphoto[photoIndex].title + '.JPG';
        }



        var hideFloorPlanButton = false;
        $scope.viewFloorPlanFunc = function() {
            $scope.$emit('ToggleFloorPlan', {});
        }
        function enableAccelerometer() {
            $scope.isRotating = !$scope.isRotating;
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
    }
])
