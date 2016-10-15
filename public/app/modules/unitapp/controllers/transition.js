angular.module('UnitApp')
.controller('TransitionUnitMediaCtrl', [
    '$scope',
    '$rootScope',
    '$state',
    '$resource',
    'WizioConfig',
    '$sce',
    'lodash',
    'ModalSvc',
    function($scope, $rootScope, $state, $resource, WizioConfig, $sce, lodash, ModalSvc) {
        // floor plan animation
        console.dir('in controller"');
        var panelContainer;
        $scope.selectPhoto = false;
        var panelOpened = false;
        var state = $state.current.name;
        if(state !== 'DemoGreenStreet'){
            panelContainer = document.getElementById('panel-container');
            panelContainer.addEventListener('click', togglePanel, false);
        }
        //
        function togglePanel() {
            panelOpened = !panelOpened;
            if (panelOpened) {
                this.classList.add('open');
                this.classList.remove('close');
            } else {
                this.classList.add('close');
                this.classList.remove('open');
            }
        }
        // end floorplan animation and controls
        //
        // for loading CORS images....UGH
        $scope.trust = $sce;
        //
        //establish variables
        var apartmentpubid;
        var apitoken;
        //
        //get parameters from URL
        switch (state) {
            case 'LandingPage':
                apitoken = WizioConfig.static_vr.apikey;
                apartmentpubid = WizioConfig.static_vr.landingpage.apartmentpubid;
                break;
            case 'Demo':
                apitoken = WizioConfig.static_vr.apikey;
                apartmentpubid = WizioConfig.static_vr.demo.apartmentpubid;
            default:
                apitoken = $state.params.apitoken;
                apartmentpubid = $state.params.apartmentpubid;
        }
        $resource(WizioConfig.baseAPIURL + 'vr/listing/:apitoken/:apartmentid', {
            apitoken: '@apitoken',
            apartmentid: '@apartmentid',
        }).query({
            apitoken: apitoken,
            apartmentid: apartmentpubid
        }, function(result) {
            console.dir(result);
            console.dir(lodash.groupBy);
            var media = lodash.groupBy(result, 'type');
            console.dir(media);
            $scope.media = media;
            var photoIndex;
            if(state === 'LandingPage'){
                //hardcoded
                photoIndex = 3;
            } else if(state === 'Demo') {
                photoIndex = 0;
            } else if(state === 'DemoOneBackBay') {
                photoIndex = 9;
            } else {
                photoIndex = 0;
            }
            if (media.vrphoto[0].awsurl) {
                // $scope.media.vrphoto = vrphotos;
                $scope.photoIndex = photoIndex;
                $scope.photoUrl = media.vrphoto[photoIndex].awsurl;
                $scope.$broadcast('IMGLOAD', {
                    media: media
                });
                // $scope.media.vrphoto = vrphotos;
                $scope.changePhoto = function(photoIndex) {
                    $scope.photoIndex = photoIndex;
                    $scope.photoUrl = media.vrphoto[photoIndex].awsurl;
                    $scope.$broadcast('CHANGE', {});
                };
            } else {
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
