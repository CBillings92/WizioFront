angular.module('UnitApp')
    .controller('NationalCtrl', [
        '$scope',
        '$state',
        '$location',
        '$sessionStorage',
        '$sce',
        '$resource',
        function(
            $scope,
            $state,
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
                if (whichUnit == 1) {
                    vrphotos = [];
                    vrphotos.push({
                        title: "Gym 1",
                        link: "https://www.bubl.io/experiences/68c7bc43-faae-4708-b581-075dca0b0733"
                    });
                    vrphotos.push({
                        title: "Gym 2",
                        link: "https://www.bubl.io/experiences/156ea094-059c-401f-b9c7-a8fe5f5d5678"
                    });
                    vrphotos.push({
                        title: "Studio",
                        link: "https://www.bubl.io/experiences/394c6433-d833-4189-819a-8b9251e48649"
                    });
                    vrphotos.push({
                        title: "Think Tank",
                        link: "https://www.bubl.io/experiences/b3d067b3-9ad9-4e91-b0ab-52898d29484e"
                    });
                    vrphotos.push({
                        title: "Think Tank",
                        link: "https://www.bubl.io/experiences/b3d067b3-9ad9-4e91-b0ab-52898d29484e"
                    });
                    vrphotos.push({
                        title: "Lobby",
                        link: "https://www.bubl.io/experiences/a7759d17-1980-4362-9d19-7c7116c7270b"
                    });
                    vrphotos.push({
                        title: "Lobby 2",
                        link: "https://www.bubl.io/experiences/653b9a56-f413-4d08-9d49-0946dc93d1bf"
                    });
                    vrphotos.push({
                        title: "Lobby 3",
                        link: "https://www.bubl.io/experiences/3334f769-c67b-41c9-a6ee-4c07b8ee7ddc"
                    });
                    handleMedia();
                    return;
                } else if (whichUnit == 2) {

                    vrphotos = [];
                    vrphotos.push({
                        title: "Bed",
                        link: "https://www.bubl.io/experiences/3f6199ec-df05-4140-8d2b-af4f8389743a"
                    });
                    vrphotos.push({
                        title: "Bathroom",
                        link: "https://www.bubl.io/experiences/059c9654-18fd-42ea-a5d7-a141cb8ceca9"
                    });
                    vrphotos.push({
                        title: "Living",
                        link: "https://www.bubl.io/experiences/319a6470-3658-40ae-a25f-c9d18d8f9a7e"
                    });
                    vrphotos.push({
                        title: "Kitchen",
                        link: "https://www.bubl.io/experiences/f4a18d53-70b3-4591-8e65-9d53498fa2a9"
                    });

                    handleMedia();
                    return;
                } else if (whichUnit == 3) {

                    vrphotos = [];
                    vrphotos.push({
                        title: "Studio",
                        link: "https://www.bubl.io/experiences/50dc5135-cd21-45f9-b7a8-1987b0b1ba13"
                    });
                    vrphotos.push({
                        title: "Living",
                        link: "https://www.bubl.io/experiences/a688a6ff-f3fd-4941-a414-d41988c45e6c"
                    });
                    vrphotos.push({
                        title: "Kitchen",
                        link: "https://www.bubl.io/experiences/51654448-d804-4103-a703-5d4281ea034f"
                    });
                    vrphotos.push({
                        title: "Bathroom",
                        link: "https://www.bubl.io/experiences/006fbf82-79a8-41a6-8bd9-2969e5fdd4d5"
                    });
                    vrphotos.push({
                        title: "Amenity Room",
                        link: "https://www.bubl.io/experiences/6b984b03-4da9-4649-be73-3f5ac2dc77c3"
                    });
                    handleMedia();
                    return;
                } else if (whichUnit == 4) {

                    vrphotos = [];
                    vrphotos.push({
                        title: "Entry",
                        link: "https://www.bubl.io/experiences/f5d7806b-bb6d-48b1-b502-99cd87010745"
                    });
                    vrphotos.push({
                        title: "Bedroom 1",
                        link: "http://bubl.io/experiences/aabc60c4-d199-4719-8fbf-14dc0e76dfbe"
                    });
                    vrphotos.push({
                        title: "Bedroom 2",
                        link: "http://bubl.io/experiences/293bc0da-c7d6-41c6-ba03-05541de9b8d4"
                    });
                    vrphotos.push({
                        title: "Living",
                        link: "https://www.bubl.io/experiences/f8412b57-5921-4253-b938-b408938afc75"
                    });
                    vrphotos.push({
                        title: "Kitchen",
                        link: "https://www.bubl.io/experiences/7ba60833-749b-4574-8790-f61ea338c37c"
                    });
                    vrphotos.push({
                        title: "Bathroom",
                        link: "http://bubl.io/experiences/8fb2a8c1-6167-4c52-897c-fd32431278c7"
                    });
                    vrphotos.push({
                        title: "Dining",
                        link: "https://www.bubl.io/experiences/aa4083de-3d97-409e-84ab-fc57c319d69d"
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
            $scope.updateUnit3 = function() {
                whichUnit = 3;
                updateUnitPics();
            };
            $scope.updateUnit4 = function() {
                whichUnit = 4;
                updateUnitPics();
            };

        }
    ]);
