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
            //mason was here 3,2.] j
            // var apitoken = 2;
            // var apartmentid = 1;
            // $rootScope.$state = Externalapi
            $scope.trust = $sce;
            // $scope.photoUrl = 'public/assets/equirect-5376x2688-bf11b3a4-c73a-45f6-a080-493a79340ffc.jpg';
            // console.dir("PL:");
            var state = $state.current.name;
            console.dir(WizioConfig.demo);
            var apitoken = state === 'Demo' ||  state === 'LandingPage' ? WizioConfig.demo.apikey : $state.params.apitoken;
            var apartmentpubid = state === 'Demo' || state === 'LandingPage' ? WizioConfig.demo.apartmentpubid: $state.params.apartmentpubid

            $resource(WizioConfig.baseAPIURL + 'vr/listing/:apitoken/:apartmentid', {
                apitoken: '@apitoken',
                apartmentid: '@apartmentid',
            }).query({
                apitoken: apitoken,
                apartmentid: apartmentpubid
            }, function(result) {
                var media = lodash.groupBy(result, 'type');
                $scope.media = media;
                var photoIndex = 0;
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
