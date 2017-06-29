angular.module('TourApp').controller('TourCtrl', [
    '$scope',
    '$state',
    '$resource',
    'lodash',
    'WizioConfig',
    'AWSFct',
    'VrPlayerFct',
    'LoadingSpinnerFct',
    '$sce',
    function($scope, $state, $resource, lodash, WizioConfig, AWSFct, VrPlayerFct, LoadingSpinnerFct, $sce) {
        $scope.viewFloorPlan;
        $scope.selectPhoto;
        $scope.state = $state.current.name;
        var activelistingid;
        if ($scope.state === 'Tour') {
            $scope.showcontrols = true;
            $scope.showcontactinfo = true;
            $scope.showpoweredby = true;
            document.getElementsByTagName('body')[0].style["padding-bottom"] = 0;
            document.getElementsByTagName('body')[0].style["margin-bottom"] = 0;
        }

        if($scope.state === 'LandingPage') {
            activelistingid = 'b19e3352-d9fd-11e6-85e0-0a8adbb20c4d';
            initForLandingOrDemoPage();
        } else if ($scope.state === 'Demo') {
            activelistingid = 'ddef35a3-0afb-4e8c-97b5-60e057004034';
            initForLandingOrDemoPage();
        }

        function initForLandingOrDemoPage() {
            var apiResource = $resource(WizioConfig.baseAPIURL + 'activelisting/:activelistingid', {activelistingid: '@activelistingid'});
            query = {
                activelistingid: activelistingid
            };

            apiResource.query(query, function(result) {
                console.dir(result);
                if (result[0].pinRequired) {
                    result.activelistingid = activelistingid;
                    ModalBuilderFct.buildComplexModal('md', 'public/app/modules/unitapp/viewtemplates/pinrequired.modal.html', 'PinRequiredModalCtrl', result).then(function(result) {
                        LoadingSpinnerFct.hide('vrPlayerLoader');
                        $scope.media = lodash.groupBy(result, 'type');
                        initialize()
                    });
                } else {
                    LoadingSpinnerFct.hide('vrPlayerLoader');
                    $scope.media = lodash.groupBy(result, 'type');
                    initialize();
                };
            });
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
                photoIndex = 3;
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
