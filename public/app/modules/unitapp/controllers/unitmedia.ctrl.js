angular.module('UnitApp')
    .controller('UnitMediaCtrl', [
        '$scope',
        '$resource',
        'WizioConfig',
        '$sce',
        'lodash',
        function($scope, $resource, WizioConfig, $sce, lodash) {
            //mason was here 3,2.] j
            var apitoken = 2;
            var apartmentid = 1;
            $scope.trust = $sce;

            $resource(WizioConfig.baseAPIURL + 'apartment/vr/:apitoken/:apartmentid', {
                apitoken: '@apitoken',
                apartmentid: '@apartmentid',
            }).query({
                apitoken: apitoken,
                apartmentid: apartmentid
            }, function(result) {
                var media = lodash.groupBy(result, 'type');
                $scope.media = media;
                // $scope.media.vrphoto = vrphotos;
                console.dir($scope.media);
                var photoIndex = 0;
                $scope.photoUrl = $scope.media.vrphoto[photoIndex].link;
                $scope.changePhoto = function(photoIndex) {
                    $scope.photoUrl = $scope.media.vrphoto[photoIndex].link;
                };
                $scope.mediaTab = 'unitPhotos';
                $scope.selectMediaTab = function(tab) {
                    if (tab === 'unitVideos') {
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
