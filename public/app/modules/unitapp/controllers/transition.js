angular.module('UnitApp').controller('TransitionUnitMediaCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    '$resource',
    'WizioConfig',
    '$sce',
    'lodash',
    'ModalSvc',
    function($scope, $rootScope, $state, $resource, WizioConfig, $sce, lodash, ModalSvc) {
        var bodyTag = document.getElementsByTagName("BODY")[0];
        // var panelContainer;
        var apartmentpubid;
        var apitoken;
        var state = $state.current.name;
        var heightContainerElem = document.getElementById('height-container');

        // Set the margin bottom on the body to be 0 in the VR view - there is no footer
        if($state.current.name === 'NewExternalApi' || $state.current.name === 'Demo'){
            bodyTag.style["margin-bottom"] = "0" ;
            $(window).resize(function(){
                heightContainerElem.style = "padding-bottom: 0; height:" + $(window).height() + 'px';
            });
        }
        // Containing html element of the VR player
        heightContainerElem.style = state === 'LandingPage' ? "padding-bottom: 0; height: 100%" : "padding-bottom: 0; height:" + $(window).height() + 'px';

        // For photo and floorplan selection
        $scope.selectPhoto = false;
        $scope.viewFloorPlan = false;

        // For styling VR player floorplan programatically
        $scope.style = 'margin: 0 auto; width:325px';

        // Get the containing element of the VR player floorplan panel
        // panelContainer = document.getElementById('panel-container');
        // panelContainer.addEventListener('click', togglePanel, false);
        // floor plan animation
        // var panelOpened = false;
        //
        // function togglePanel() {
        //     panelOpened = !panelOpened;
        //     if (panelOpened) {
        //         this.classList.add('open');
        //         this.classList.remove('close');
        //     } else {
        //         this.classList.add('close');
        //         this.classList.remove('open');
        //     }
        // }
        // end floorplan animation and controls

        // for loading CORS images....UGH
        $scope.trust = $sce;

        //get parameters from URL
        switch (state) {
            case 'LandingPage':
                apitoken = WizioConfig.static_vr.apikey;
                apartmentpubid = WizioConfig.static_vr.landingpage.apartmentpubid;
                $scope.style = "margin: 0 auto;";
                break;
            case 'Demo':
                apitoken = WizioConfig.static_vr.apikey;
                apartmentpubid = WizioConfig.static_vr.demo.apartmentpubid;
                break;
            default:
                apitoken = $state.params.apitoken;
                apartmentpubid = $state.params.apartmentpubid;
        }
        $resource(WizioConfig.baseAPIURL + 'vr/listing/:apitoken/:apartmentid', {
            apitoken: '@apitoken',
            apartmentid: '@apartmentid'
        }).query({
            apitoken: apitoken,
            apartmentid: apartmentpubid
        }, function(result) {
            var media = result[0];
            $scope.floorplan = result[1].Floor_Plan;
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
            $scope.$broadcast('CHANGE', {});


            if ($scope.media.vrphoto[0].awsurl) {
                // $scope.media.vrphoto = vrphotos;
                $scope.photoIndex = photoIndex;
                $scope.photoUrl = $scope.media.vrphoto[photoIndex].awsurl;
                $scope.$broadcast('IMGLOAD', {media: media});
                // $scope.media.vrphoto = vrphotos;
                $scope.changePhoto = function(photoIndex) {
                    $scope.photoIndex = photoIndex;
                    $scope.photoUrl = $scope.media.vrphoto[photoIndex].awsurl;
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

            function handleStyle() {
                switch (apartmentpubid) {
                    case 'c87a0162-27f1-4862-ae4e-32c4f74f1c0d':
                        $scope.style = 'margin: 0 auto';
                        // $scope.floorPlanStyle =
                        break;
                    default:

                }
            }

            $scope.trust = $sce;
            $scope.mediaTab = 'unitPhotos';

        });
    }
]);
