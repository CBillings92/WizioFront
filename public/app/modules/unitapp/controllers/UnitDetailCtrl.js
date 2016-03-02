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
                console.dir(result);
                ApartmentGetSetSvc.set(result, "apartmentSelected");

                $scope.listing = result;
                $scope.listing.dateStart = moment($scope.listing.dateStart).format('YYYY-MM-DD');
                $scope.apartment = result.Apartment;
                //create the google maps
                var mapOptions = MapFct.makeMap();
                $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
                //create the markers for the map
                var markers = MapFct.makeMarkers($scope.map);
                $scope.media = result.Media;
                var photoIndex = 0;
                $scope.photoUrl = $scope.media.vrphoto[photoIndex].link;
                $scope.changePhoto = function(photoIndex) {
                    $scope.photoUrl = $scope.media.vrphoto[photoIndex].link;
                };
                $scope.trust = $sce;
                //FIXME
                $scope.mediaTab = 'unitPhotos';
                $scope.selectMediaTab = function(tab) {
                    $scope.mediaTab = tab;
                };
            });
            // $scope.apartment = ApartmentGetSetSvc.get('apartmentSelected');
            // console.dir($scope.apartment);
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
                var modalDefaultsApplication = modalDefaults(WizioConfig.ApplicationFormViewsURL + 'contactRepForm.html', 'ApplicationCreateModalCtrl', 'md');
                //check if token is expired, if so route to login
                ModalSvc.showModal(modalDefaultsApplication, {}).then(function(result) {
                    // $state.go('Account.Dashboard.Main');
                });
                // if (TokenSvc.checkExp()) {
                //     TokenSvc.deleteToken();
                //
                //     ModalSvc.showModal(modalDefaultsLogin, {}).then(function(result) {
                //         //store the current apartment in sessionStorage with the
                //         //appropriate session storage variable
                //         console.dir(result);
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
                    console.dir(res);
                });

            };
            $scope.submitPhoto = function() {
                var newPhoto = new MediaModel($scope.media.photo.link, 'vrphoto', $scope.media.photo.title);
                newPhoto.getAssociationData();
                newPhoto.saveMedia(function(res) {
                    console.dir(res);
                });
            };
            //LOAD APARTMENT DATA end
        }
    ]);
