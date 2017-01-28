angular.module('UnitApp').controller('TransitionUnitMediaCtrl', ['$scope',
    '$rootScope',
    '$state',
    '$resource',
    'WizioConfig',
    '$sce',
    'lodash',
    'ModalSvc',
    'LoadingSpinnerFct',
    function($scope, $rootScope, $state, $resource, WizioConfig, $sce, lodash, ModalSvc, LoadingSpinnerFct) {
        LoadingSpinnerFct.show('vrPlayerLoader');
        var bodyTag = document.getElementsByTagName("BODY")[0];
        // var panelContainer;
        var apartmentpubid;
        var apitoken;
        var state = $state.current.name;
        $scope.state = state;
        var heightContainerElem = document.getElementById('height-container');
        var floorplanImgElem = document.getElementById('floorplan');
        var maxFloorPlanHeight = $(window).height() * 0.75;
        $scope.toggle = false;

        floorplanImgElem.style['max-height'] = maxFloorPlanHeight + 'px';

        // Set the margin bottom on the body to be 0 in the VR view - there is no footer
        heightContainerElem.style['padding-bottom'] = '0';

        heightContainerElem.style.height = $(window).height() + 'px';

        if (state === 'NewExternalApi' || state === 'Demo' || state === 'Tour') {
            bodyTag.style["margin-bottom"] = "0";
            $(window).resize(function() {
                heightContainerElem.style['padding-bottom'] = '0';
                heightContainerElem.style.height = $(window).height() + 'px';
                floorplanImgElem.style['max-height'] = $(window).height()*0.75 + 'px';
            });
        } else {
            heightContainerElem.style.height = "100%";
        }
        $scope.accelerometerToggle = function(){
          $scope.toggle = !$scope.toggle;
          $scope.$broadcast('accelerometer-toggle', {flag: $scope.toggle});
        }
        // For photo and floorplan selection
        $scope.selectPhoto = false;
        $scope.viewFloorPlan = false;

        $scope.buttonAction = function(toggle){
            if(toggle === 'toggleFloorplan'){
                $scope.viewFloorPlan = !$scope.viewFloorPlan
                if($scope.selectPhoto && $scope.viewFloorPlan) {
                    $scope.selectPhoto = !$scope.selectPhoto;
                }
            } else {
                $scope.selectPhoto = !$scope.selectPhoto
                if($scope.viewFloorPlan && $scope.selectPhoto) {
                    $scope.viewFloorPlan = !$scope.viewFloorPlan;
                }

            }
        }

        // For styling VR player floorplan programatically
        $scope.style = 'margin: 0 auto; width:325px';

        // for loading CORS images....UGH
        $scope.trust = $sce;
        var apiResource;
        var query;
        // If the state is the Demo page or Landing page, get the apitoken and
        // apartmentpubid from the config file, else get it from the state params
        console.dir('state');
        switch (state) {
            case 'LandingPage':
                // apitoken = WizioConfig.static_vr.apikey;
                // apartmentpubid = WizioConfig.static_vr.landingpage.apartmentpubid;
                activelistingid = WizioConfig.LandingPage.activeListingId();
                $scope.style = "margin: 0 auto;";
                apiResource = $resource(WizioConfig.baseAPIURL + 'activelisting/:activelistingid', {
                    activelistingid: '@activelistingid'
                });
                query = {
                    activelistingid: activelistingid
                };
                break;
            case 'Demo':
                activelistingid = WizioConfig.DemoPage.activeListingId();
                $scope.style = "margin: 0 auto;";
                apiResource = $resource(WizioConfig.baseAPIURL + 'activelisting/:activelistingid', {
                    activelistingid: '@activelistingid'
                });
                query = {
                    activelistingid: activelistingid
                };
                break;
            default:
                console.dir('default');
                activelistingid = $state.params.apitoken || $state.params.activelistingid;
                apartmentpubid = $state.params.apartmentpubid;
                apiResource = $resource(WizioConfig.baseAPIURL + 'activelisting/:activelistingid', {
                    activelistingid: '@activelistingid'
                });
                query = {
                    activelistingid: activelistingid
                };
        }

        apiResource.query(query, function(result) {
            var media = result;
            // if (state === 'LandingPage' || state === 'Demo') {
            //     media = result[0];
            // }
            if(result[0].Floor_Plan){
                $scope.floorplan = 'https://cdn.wizio.co/' + result[0].SubscriptionApartmentPubId + '/floorplan.png';
            } else {
                $scope.floorplan = false;
            }
            $scope.media = lodash.groupBy(media, 'type');
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

            // broadcasts a change photo event to our VR player directive
            $scope.$broadcast('CHANGE', {});
            var photoUrl = "";
            // If the photo is stored in AWS
            if ($scope.media.vrphoto[0].awsurl) {
                // Set the photo index to the selected photo index
                $scope.photoIndex = photoIndex;
                // Get the photourl and set it on scope
                if(state === 'LandingPage' || state === "Demo"){
                    photoUrl = "https://cdn.wizio.co/" + $scope.media.vrphoto[photoIndex].SubscriptionApartmentPubId + "/" + $scope.media.vrphoto[photoIndex].title;
                } else {
                    photoUrl = "https://cdn.wizio.co/" + $scope.media.vrphoto[photoIndex].SubscriptionApartmentPubId + "/" + $scope.media.vrphoto[photoIndex].title + '.JPG' ;
                }
                $scope.photoUrl = photoUrl;
                // Broadcast to our VR player directive to load the new image
                $scope.$broadcast('IMGLOAD', {
                    media: media
                });

                // Allow the user to change photos
                $scope.changePhoto = function(photoIndex) {
                    var photoUrl = "";
                    if(state === 'LandingPage' || state === "Demo"){
                        photoUrl = "https://cdn.wizio.co/" + $scope.media.vrphoto[photoIndex].SubscriptionApartmentPubId + "/" + $scope.media.vrphoto[photoIndex].title;
                    } else {
                        photoUrl = "https://cdn.wizio.co/" + $scope.media.vrphoto[photoIndex].SubscriptionApartmentPubId + "/" + $scope.media.vrphoto[photoIndex].title + '.JPG' ;
                    }
                    LoadingSpinnerFct.show('vrPlayerLoader');
                    $scope.photoIndex = photoIndex;
                    $scope.photoUrl =photoUrl;
                    $scope.$broadcast('CHANGE', {});
                };
            } else {
                console.dir(photoIndex + ' in bubl');
                $scope.photoUrl = $scope.media.vrphoto[photoIndex].link;
                $scope.changePhoto = function(photoIndex) {
                    $scope.photoUrl = $scope.media.vrphoto[photoIndex].link;
                };
                $scope.trust = $sce;
            }

            $scope.trust = $sce;
            $scope.mediaTab = 'unitPhotos';
        });
    }
]);
