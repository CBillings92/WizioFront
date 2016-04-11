angular.module('UnitApp')
    .controller('NationalCtrl', [
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
        'UnitFct',
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
            moment,
            UnitFct
        ) {
                var vrphotos = [];
                // var whichUnit = 1;
                vrphotos.push({label:"Cam is Sexy", link:"https://www.bubl.io/experiences/68c7bc43-faae-4708-b581-075dca0b0733"});

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

            //LOAD APARTMENT DATA end
        }
    ]);
