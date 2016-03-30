angular.module('UnitApp')
    .controller('UnitDetailCtrl', [
        '$scope',
        '$state',
        '$modal',
        '$location',
        '$sessionStorage',
        '$sce',
        '$resource',
        'lodash',
        'ApartmentGetSetSvc',
        'UnitResource',
        'MapFct',
        'TokenSvc',
        'FlexGetSetSvc',
        'RerouteGetSetSvc',
        'FavoriteModel',
        'MediaModel',
        'ModalSvc',
        'WizioConfig',
        'SearchFct',
        'moment',
        function(
            $scope,
            $state,
            $modal,
            $location,
            $sessionStorage,
            $sce,
            $resource,
            lodash,
            ApartmentGetSetSvc,
            UnitResource,
            MapFct,
            TokenSvc,
            FlexGetSetSvc,
            RerouteGetSetSvc,
            FavoriteModel,
            MediaModel,
            ModalSvc,
            WizioConfig,
            SearchFct,
            moment
        ) {
            $scope.listing = {};
            var user = TokenSvc.decode();
            $resource(WizioConfig.baseAPIURL + 'lease/:id', {
                id: '@id'
            }).get({
                id: $state.params.id
            }, function(result) {
                //hotfix for map
                result.Apartment.monthlyRent = result.monthlyRent;
                ApartmentGetSetSvc.set(result.Apartment, "apartmentSelected");

                $scope.listing = result;
                $scope.listing.dateStart = moment($scope.listing.dateStart).format('YYYY-MM-DD');
                $scope.apartment = result.Apartment;
                if ($scope.apartment.street === "1040 North Quincy Street") {
                    switch (apartment.unitNum) {
                        case 406:
                            $scope.floorplan = "https://s3.amazonaws.com/wiziouservideos/LG-1b1d1s2b.png";
                            break;
                        case 209:
                            $scope.floorplan = false;
                            break;
                        default:
                            $scope.floorplan = false;
                    }
                } else if ($scope.apartment.street === "1020 North Quincy Street") {
                    switch ($scope.apartment.unitNum) {
                        case 908:
                            $scope.floorplan = "https://s3.amazonaws.com/wiziouservideos/1020-2b2b.png";
                            break;
                        case 1013:
                            $scope.floorplan = "https://s3.amazonaws.com/wiziouservideos/1020-2b1b.png";
                            break;
                        case 616:
                            $scope.floorplan = false;
                            break;
                        case 619:
                            $scope.floorplan = false;
                            break;
                        default:
                            $scope.floorplan = false;
                    }
                } else {
                    $scope.floorplan = false;
                }
                var vrphotos = [];
                var vrvideos = [];
                for (var i = 0; i < result.Apartment.Media.length; i++) {
                    if (result.Apartment.Media[i].type === 'vrphoto') {
                        vrphotos.push(result.Apartment.Media[i]);
                    } else {
                        vrvideos.push(result.Apartment.Media[i]);
                    }
                }
                var media = lodash.groupBy(result.Apartment.Media, 'type');
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
            });
            //create the google maps
            setTimeout(function() {
                var mapOptions = MapFct.makeMap();
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                //create the markers for the map
                // var markers = MapFct.makeMarkers($scope.map);
            }, 3000);
            // $scope.apartment = ApartmentGetSetSvc.get('apartmentSelected');
            // $scope.apartment = $scope.apartment.apartmentData || null;
            //check that the correct apartment is getting pulled


            // $scope.apartment.youtubeLink = 'http://www.youtube.com/embed/' + $scope.apartment.Assignments[0].youtubeId + '?autoplay=0';


            // MediaTabs
            //map does not load b/c it's stupid. Must be default.

            //HELPER FUNCTION -- modal creation function
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
