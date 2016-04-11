angular.module('UnitApp')
    .controller('NationalCtrl', [
        '$scope',
        '$state',
        '$modal',
        '$location',
        '$sessionStorage',
        '$sce',
        '$resource',
        function(
            $scope,
            $state,
            $modal,
            $location,
            $sessionStorage,
            $sce,
            $resource
        ) {
            $scope.media = {};
            //PLURAL
            var vrphotos = [];
            var whichUnit = 1;
            //PLURAL


            function updateUnitPics() {
                console.log("fuck you");
                if (whichUnit == 1) {
                    vrphotos = [];
                    vrphotos.push({
                        title: "Place 2",
                        link: "https://www.bubl.io/experiences/156ea094-059c-401f-b9c7-a8fe5f5d5678"
                    });

                    vrphotos.push({
                        title: "Cam is Sexy",
                        link: "https://www.bubl.io/experiences/68c7bc43-faae-4708-b581-075dca0b0733"
                    });
                    handleMedia();
                    return;
                } else if (whichUnit == 2) {
                    console.log("fuck you more");

                    vrphotos = [];

                    vrphotos.push({
                        title: "Cam is Sexy",
                        link: "https://www.bubl.io/experiences/68c7bc43-faae-4708-b581-075dca0b0733"
                    });
                    handleMedia();
                    return;
                }
                return;
            }

            updateUnitPics();
            handleMedia();
            function handleMedia() {
                //PLURAL
                $scope.media.vrphotos = vrphotos;
                var photoIndex = 0;
                //NON-PLURAL
                $scope.photoUrl = $scope.media.vrphotos[photoIndex].link;
                $scope.changePhoto = function(photoIndex) {
                    //NON-PLURAL
                    $scope.photoUrl = $scope.media.vrphotos[photoIndex].link;
                };
            }

            $scope.trust = $sce;
            //FIXME
            $scope.mediaTab = 'unitPhotos';

            $scope.updateUnit1 = function() {
                whichUnit = 1;
                updateUnitPics();
            };
            $scope.updateUnit2 = function() {
                whichUnit = 2;
                updateUnitPics();
            };

        }
    ]);
