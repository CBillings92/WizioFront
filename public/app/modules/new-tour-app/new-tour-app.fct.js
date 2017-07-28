angular.module('NewTourApp')
    .factory('NewTourFct', [
        'WizioConfig',
        'LoadingSpinnerFct',
        'AWSFct',
        '$resource',
        '$q',
        '$state',
        'ModalBuilderFct',
        function(
            WizioConfig,
            LoadingSpinnerFct,
            AWSFct,
            $resource,
            $q,
            $state,
            ModalBuilderFct
        ) {

            function getContent(currentState) {
                return $q(function (resolve, reject) {
                    var activeListingId;
                    var apartmentPubId;
                    var currentState = $state.current.name;
                    var apiResource = $resource(
                        WizioConfig.baseAPIURL + 'activelisting/:activelistingid',
                        {
                            'activelistingid': '@activelistingid'
                        }
                    )

                    if (currentState === 'LandingPage') {
                        activeListingId = WizioConfig.LandingPage.activeListingId();
                    } else if (currentState === 'Demo') {
                        activeListingId = WizioConfig.DemoPage.activeListingId();
                    } else {
                        activeListingId = $state.params.apitoken || $state.params.activelistingid;
                        apartmentpubid = $state.params.apartmentpubid;
                    }

                    var query = {
                        activelistingid: activeListingId
                    }

                    apiResource.query(query, function (results) {

                        if (results[0].pinRequired) {
                            requestTourPasswordModal({activelistingid: activeListingId})
                            .then(function (response) {
                                LoadingSpinnerFct.hide('vrPlayerLoader');
                                return resolve(response);
                            })
                        } else {
                            LoadingSpinnerFct.hide('vrPlayerLoader');
                            return resolve(results);
                        }
                    })
                })
            }
            /**
             * Build the initial photo URL, set the inital photo index,
             * Build the floorplan URL if necessary
             * @param {Object} media   Object of photos organized by type
             * @param {[type]} SubscriptionApartmentPubId CHAR(36) - Public ID for SubscriptionApartment
             */
            function setTourDefaults(media) {
                var photoIndex;
                var floorplan = false;
                var state = $state.current.name;
                var SubscriptionApartmentPubId = buildSubscriptionApartmentPubId(media)

                if (media.vrphoto[0].Floor_Plan !== null) {
                    floorplan = buildFloorPlanUrl(SubscriptionApartmentPubId);
                }

                if (state === 'LandingPage') {
                    photoIndex = 2;
                } else if (state === 'Demo') {
                    photoIndex = 0;
                } else if (state === 'DemoOneBackBay') {
                    photoIndex = 9;
                } else {
                    photoIndex = 0;
                }

                photoUrl = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" +media.vrphoto[photoIndex].title + '.JPG';

                return {
                    Floor_Plan: floorplan,
                    photoIndex: photoIndex,
                    photoUrl: photoUrl
                }
            }

            function requestTourPasswordModal(data) {
                return $q(function (resolve, reject) {
                    ModalBuilderFct.buildComplexModal(
                        'md',
                        'public/app/modules/unitapp/viewtemplates/pinrequired.modal.html',
                        'PinRequiredModalCtrl',
                        data
                    )
                    .then(function (response) {
                        return resolve(response);
                    })
                })
            }

            function buildSubscriptionApartmentPubId(media) {
                var SubscriptionApartmentPubId = AWSFct.utilities.modifyKeyForEnvironment(media.vrphoto[0].SubscriptionApartmentPubId);
                return SubscriptionApartmentPubId;
            }
            function buildFloorPlanUrl(SubscriptionApartmentPubId) {
                var floorplan = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + '/floorplan.png';
                return floorplan;
            }
        return {
            setTourDefaults: setTourDefaults,
            getContent: getContent

        }
    }])
