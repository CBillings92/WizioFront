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
            /*floor plan animation*/
            var panelContainer;
            $scope.selectPhoto = false;
            var panelOpened = false;
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
            /*end floorplan animation*/
            // var apitoken = 2;
            // var apartmentid = 1;
            // $rootScope.$state = Externalapi
            $scope.trust = $sce;
            // $scope.photoUrl = 'public/assets/equirect-5376x2688-bf11b3a4-c73a-45f6-a080-493a79340ffc.jpg';
            // console.dir("PL:");
            var state = $state.current.name;
            var apartmentpubid, apitoken;

            if(state === 'Demo'){
                apitoken = WizioConfig.static_vr.apikey;
                apartmentpubid = WizioConfig.static_vr.demo.apartmentpubid;
            } else if (state === 'LandingPage') {
                apitoken = WizioConfig.static_vr.apikey;
                apartmentpubid = WizioConfig.static_vr.landingpage.apartmentpubid;
            } else if(state === 'DemoOneBackBay'){
                apartmentpubid = WizioConfig.static_vr.demoOneBackBay.apartmentpubid;
                apitoken = WizioConfig.static_vr.apikey;
            } else if(state === 'DemoGreenStreet'){
                apartmentpubid = WizioConfig.static_vr.demoGreenStreet.apartmentpubid;
                apitoken = WizioConfig.static_vr.apikey;
            } else {
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
    ]);
