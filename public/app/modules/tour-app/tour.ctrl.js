angular.module('TourApp').controller('TourCtrl', [
    '$scope',
    '$state',
    'WizioConfig',
    'AWSFct',
    'VrPlayerFct',
    'LoadingSpinnerFct',
    '$sce',
    function($scope, $state, WizioConfig, AWSFct, VrPlayerFct, LoadingSpinnerFct, $sce) {
        $scope.viewFloorPlan;
        $scope.selectPhoto;
        $scope.state = $state.current.name;
        if ($scope.state === 'Tour') {
            $scope.showcontrols = true;
            $scope.showcontactinfo = true;
            $scope.showpoweredby = true;
            document.getElementsByTagName('body')[0].style["padding-bottom"] = 0;
            document.getElementsByTagName('body')[0].style["margin-bottom"] = 0;
        }

        $scope.$on('MediaLoad', function(ev, data) {
            $scope.media = data;
            initialize();
        })

        function initialize() {
            var state = $state.current.name;
            var SubscriptionApartmentPubId = AWSFct.utilities.modifyKeyForEnvironment($scope.media.vrphoto[0].SubscriptionApartmentPubId);
            if ($scope.media.vrphoto[0].Floor_Plan !== null) {
                $scope.floorplan = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + '/floorplan.png';
                $scope.hideFloorPlanButton = false;
            } else {
                $scope.floorplan = false;
                $scope.hideFloorPlanButton = true;
            }
            var photoIndex;

            if (state === 'LandingPage') {
                //hardcoded
                photoIndex = 2;
            } else if (state === 'Demo') {
                photoIndex = 0;
            } else if (state === 'DemoOneBackBay') {
                photoIndex = 9;
            } else {
                photoIndex = 0;
            }

            var photoUrl = "";
            // If the photo is stored in AWS
            if ($scope.media.vrphoto[0].awsurl) {
                // Set the photo index to the selected photo index
                $scope.photoIndex = photoIndex;
                // Get the photourl and set it on scope
                if (state === 'LandingPage') {
                    photoUrl = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" + $scope.media.vrphoto[photoIndex].title + '.jpg';
                } else {
                    photoUrl = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" + $scope.media.vrphoto[photoIndex].title + '.JPG';
                }
                console.dir(wizio);
                wizio.init('pano', photoUrl);

            } else {
                $scope.photoUrl = $scope.media.vrphoto[photoIndex].link;
                $scope.changePhoto = function(photoIndex) {
                    $scope.photoUrl = $scope.media.vrphoto[photoIndex].link;
                };
                $scope.trust = $sce;
            }

            $scope.trust = $sce;
            $scope.mediaTab = 'unitPhotos';
        }

        // Allow the user to change photos
        $scope.changePhoto = function(photoIndex) {
            var state = $state.current.name;
            var SubscriptionApartmentPubId = AWSFct.utilities.modifyKeyForEnvironment($scope.media.vrphoto[0].SubscriptionApartmentPubId);
            var photoUrl = "";
            if (state === 'LandingPage') {
                photoUrl = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" + $scope.media.vrphoto[photoIndex].title + 'jpg';
            } else {
                photoUrl = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" + $scope.media.vrphoto[photoIndex].title + '.JPG';
            }
            LoadingSpinnerFct.show('vrPlayerLoader');
            $scope.photoIndex = photoIndex;
            $scope.photoUrl = photoUrl;
            wizio.addImage(photoUrl);
            // VrPlayerFct.initPlayer(false, photoUrl, {});
            $scope.selectPhoto = false;
            $scope.viewFloorPlan = false;
            LoadingSpinnerFct.hide('vrPlayerLoader');
            // $scope.$broadcast('CHANGE', {});
        };

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
