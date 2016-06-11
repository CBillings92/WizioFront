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
            function setDataForPage(data){
                var dataForPage = UnitDetailsFct.setDataForPage(data);
                $scope.apartment = dataForPage.apartment;
                $scope.listing = dataForPage.listing;
                $scope.features = dataForPage.features;
                return;
            }
            function setHardCodedFloorplans() {
                if ($scope.apartment.street === "1040 North Quincy Street") {
                    switch ($scope.apartment.unitNum) {
                        case "406":
                            $scope.floorplan = "https://s3.amazonaws.com/wiziouservideos/LG-1b1d1s2b.png";
                            break;
                        case "209":
                            // $scope.floorplan = false;
                            break;
                        default:
                            // $scope.floorplan = false;
                    }
                } else if ($scope.apartment.street === "1020 North Quincy Street") {
                    switch ($scope.apartment.unitNum) {
                        case "908":
                            $scope.floorplan = "https://s3.amazonaws.com/wiziouservideos/1020-2b2b.png";
                            break;
                        case "1013":
                            $scope.floorplan = "https://s3.amazonaws.com/wiziouservideos/1020-2b1b.png";
                            break;
                        case "616":
                            $scope.floorplan = false;
                            break;
                        case "619":
                            $scope.floorplan = false;
                            break;
                        default:
                            $scope.floorplan = false;
                    }
                } else {
                    $scope.floorplan = false;
                }
            }
            function setVideoAndPhotos(data) {
                {
                    var vrphotos = [];
                    var vrvideos = [];
                    for (var i = 0; i < data.Apartment.Media.length; i++) {
                        if (data.Apartment.Media[i].type === 'vrphoto') {
                            vrphotos.push(data.Apartment.Media[i]);
                            //        console.log(result.Apartment.Media[i]);
                        } else {
                            vrvideos.push(data.Apartment.Media[i]);
                        }
                    }
                    var media = lodash.groupBy(data.Apartment.Media, 'type');
                    $scope.media = media;
                    $scope.media.vrphoto = vrphotos;
                    var photoIndex = 0;
                    $scope.photoUrl = $scope.media.vrphoto[photoIndex].link;
                    $scope.changePhoto = function(photoIndex) {
                        $scope.photoUrl = $scope.media.vrphoto[photoIndex].link;
                    };
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
            }
            //
            LeaseModel.api('get', $state.params.id)
                .then(function(result){
                    setDataForPage(result);
                    setHardCodedFloorplans(result);
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
