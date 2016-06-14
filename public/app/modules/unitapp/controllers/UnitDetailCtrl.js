angular.module('UnitApp')
    .controller('UnitDetailCtrl', [
        '$scope',
        '$state',
        '$uibModal',
        '$sce',
        '$q',
        'lodash',
        'ApartmentGetSetSvc',
        'MapFct',
        'TokenSvc',
        'FlexGetSetSvc',
        'MediaModel',
        'ModalSvc',
        'WizioConfig',
        'SearchFct',
        'moment',
        'UnitFct',
        'LeaseModel',
        'ModalBuilderFct',
        'UnitDetailsFct',
        function(
            $scope,
            $state,
            $uibModal,
            $sce,
            $q,
            lodash,
            ApartmentGetSetSvc,
            MapFct,
            TokenSvc,
            FlexGetSetSvc,
            MediaModel,
            ModalSvc,
            WizioConfig,
            SearchFct,
            moment,
            UnitFct,
            LeaseModel,
            ModalBuilderFct,
            UnitDetailsFct
        ) {
            var user = TokenSvc.decode();
            $scope.listing = {};

            function setDataForPage(data) {
                var dataForPage = UnitDetailsFct.setDataForPage(data);
                $scope.apartment = dataForPage.apartment;
                $scope.listing = dataForPage.listing;
                $scope.features = dataForPage.features;
                return;
            }

            function setHardCodedFloorplans() {

            }

            function setVideoAndPhotos(data) {
                var photoIndex = 0;
                var setPhotosObj = UnitDetailsFct.setPhotos(data);
                console.dir(setPhotosObj);
                var media = setPhotosObj.media;
                $scope.media = setPhotosObj.media;
                $scope.photoUrl = setPhotosObj.initialPhotoUrl;
                if (media.vrphoto[0].awsurl) {
                    // $scope.media.vrphoto = vrphotos;
                    $scope.$broadcast('IMGLOAD', {
                        media: media
                    });
                    // $scope.media.vrphoto = vrphotos;
                    $scope.changePhoto = function(photoIndex) {
                        $scope.photoUrl = media.vrphoto[photoIndex].awsurl;
                        console.dir($scope.photoUrl);
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
                //FIXME
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
            }
            //
            LeaseModel.api('get', $state.params.id)
                .then(function(result) {
                    var street = result.Apartment.street;
                    var unitnum = result.Apartment.unitNum;
                    setDataForPage(result);
                    $scope.floorplan = UnitDetailsFct.setFloorPlan(street, unitnum);
                    setVideoAndPhotos(result);
                    return;
                });
            //create the google maps
            setTimeout(function() {
                var mapOptions = MapFct.makeMap();
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                //create the markers for the map
                // var markers = MapFct.makeMarkers($scope.map);
            }, 3000);

            var modalDefaults = function(templateUrl, controller, accountType, apartmentData) {
                return {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: templateUrl,
                    controller: controller,
                    resolve: {
                        modalData: function() {
                            return apartmentData;
                        }
                    }
                };
            };
            var authViews = WizioConfig.AccountAuthViewsURL;
            // ModalBuilderFct.buildModalWithController(authViews + 'Login.html', 'AuthLoginModalCtrl')
            // .then(function(result){
            //
            // });
            var modalDefaultsLogin = modalDefaults(authViews + 'Login.html', 'AuthLoginModalCtrl');
            //APPLY to the apartment
            $scope.applyToApartment = function() {
                var modalDefaultsApplication = modalDefaults(WizioConfig.ApplicationFormViewsURL + 'contactRepForm.html', 'ContactRepFormCtrl', 'md', $scope.listing);
                //check if token is expired, if so route to login
                ModalSvc.showModal(modalDefaultsApplication, {}).then(function(result) {
                    if (result === 'submit') {

                    }
                    // $state.go('Account.Dashboard.Main');
                });
                // if (TokenSvc.checkExp()) {
                //     TokenSvc.deleteToken();
                //
                //     ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result) {
                //         //store the current apartment in sessionStorage with the
                //         //appropriate session storage variable
                //         if (result) {
                //             FlexGetSetSvc.set($scope.apartment, "ApartmentApplyingTo");
                //             ModalSvc.showModal(modalDefaultsApplication, {}).then(function(result) {
                //                 $state.go('Account.Dashboard.Main');
                //             });
                //
                //         }
                //
                //     });
                // } else {
                //     //store the current apartment in sessionStorage with the
                //     //appropriate session storage variable
                //     FlexGetSetSvc.set($scope.apartment, "ApartmentApplyingTo");
                //
                // }
            };
            $scope.submitVideo = function() {
                var newVideo = new MediaModel($scope.media.video.link, 'vrvideo');
                newVideo.getAssociationData();
                newVideo.saveMedia(function(res) {
                    return;
                });
                return;

            };
            $scope.submitPhoto = function() {
                var newPhoto = new MediaModel($scope.media.photo.link, 'vrphoto', $scope.media.photo.title);
                newPhoto.getAssociationData();
                newPhoto.saveMedia(function(res) {
                    return;
                });
                return;
            };
            //LOAD APARTMENT DATA end
        }
    ]);
