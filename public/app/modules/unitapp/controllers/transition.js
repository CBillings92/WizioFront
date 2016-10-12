angular.module('UnitApp')
.controller('UnitMediaCtrl', [
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
        var panelContainer;
        $scope.selectPhoto = false;
        var panelOpened = false;
        var state = $state.current.name;
        if(state !== 'DemoGreenStreet'){
            panelContainer = document.getElementById('panel-container');
            panelContainer.addEventListener('click', togglePanel, false);
        }

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

        // for loading CORS images....UGH
        $scope.trust = $sce;

        //establish variables
        var apartmentpubid, apitoken;

        //get parameters from URL
        apitoken = $state.params.apitoken;
        apartmentpubid = $state.params.apartmentpubid;

        //this should be moved into a factory
        $resource(WizioConfig.baseAPIURL + 'vr/listing/:apitoken/:apartmentid', {
            apitoken: '@apitoken',
            apartmentid: '@apartmentid',
        }).query({
            apitoken: apitoken,
            apartmentid: apartmentpubid
        }, function(result) {
            var media = lodash.groupBy(result, 'type');
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
            // $scope.selectMediaTab = function(tab) {
            //     if (tab === 'unitVideos') {
            //         if (vrvideos.length !== 1) {
            //             var signUpErrorModalOptions = {
            //                 closeButtonText: "Close",
            //                 actionButtonText: "OK",
            //                 headerText: "No 360 Video",
            //                 bodyText: 'Sorry! This unit does not have a 360 video tour just yet.'
            //             };
            //             ModalSvc.showModal({}, signUpErrorModalOptions)
            //                 .then(function(result) {
            //                     return;
            //                 });
            //
            //         } else {
            //             $scope.mediaTab = tab;
            //         }
            //     } else {
            //
            //         $scope.mediaTab = tab;
            //     }
            // };
        });
        // $scope.changePhotoBubl = function(photoIndex){
        //     console.dir(photoIndex);
        //     $scope.photoUrl = $scope.media.vrphoto[photoIndex].link;
        // };

    }
])
