angular.module('UnitApp')
    .controller('UnitMediaCtrl', [
        '$scope',
        '$resource',
        'WizioConfig',
        '$sce',
        'lodash',
        'ModalSvc',
        function($scope, $resource, WizioConfig, $sce, lodash, ModalSvc) {
            //mason was here 3,2.] j
            console.dir($scope);
            var apitoken = 2;
            var apartmentid = 1;
            $scope.trust = $sce;
            $scope.photoUrl = 'public/assets/equirect-5376x2688-bf11b3a4-c73a-45f6-a080-493a79340ffc.jpg';
            $resource(WizioConfig.baseAPIURL + 'apartment/vr/:apitoken/:apartmentid', {
                apitoken: '@apitoken',
                apartmentid: '@apartmentid',
            }).query({
                apitoken: apitoken,
                apartmentid: apartmentid
            }, function(result) {
                var media = lodash.groupBy(result, 'type');
                $scope.media = media;
                $scope.$broadcast('IMGLOAD', {media: media})
                // $scope.media.vrphoto = vrphotos;
                console.dir($scope.media);
                var photoIndex = 0;
                $scope.photoUrl = $scope.media.vrphoto[photoIndex].awsurl;
                $scope.changePhoto = function(photoIndex) {
                    $scope.photoUrl = $scope.media.vrphoto[photoIndex].awsurl;
                    console.dir($scope.photoUrl);
                    $scope.$broadcast('CHANGE', {});
                };
                $scope.mediaTab = 'unitPhotos';
                $scope.selectMediaTab = function(tab) {
                    if (tab === 'unitVideos') {
                        console.dir("HI");
                        if (vrvideos.length !== 1) {
                            var signUpErrorModalOptions = {
                                closeButtonText: "Close",
                                actionButtonText: "OK",
                                headerText: "No 360 Video",
                                bodyText: 'Sorry! This unit does not have a 360 video tour just yet.'
                            };
                            ModalSvc.showModal({}, signUpErrorModalOptions)
                                .then(function(result) {
                                    return;
                                });

                        } else {
                            $scope.mediaTab = tab;
                        }
                    } else {

                        $scope.mediaTab = tab;
                    }
                };
            });

        }
    ]);
