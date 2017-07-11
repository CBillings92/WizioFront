angular.module('TourApp')
    .factory('TourFct', [
        '$resource',
        '$q',
        '$state',
        'AWSFct',
        'LoadingSpinnerFct',
        'WizioConfig',
        function ($resource, $q, $state, AWSFct, LoadingSpinnerFct, WizioConfig) {

            function getContent(currentState) {
                return $q(function (resolve, reject) {
                    // LoadingSpinnerFct.show('vrPlayerLoader');
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
                            requestPassword()
                            .then(function (response) {
                                return requestTourPasswordModal(response);
                            })
                            .then(function (response) {
                                LoadingSpinnerFct.hide('vrPlayerLoader');
                                return resolve(results);
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
                    //hardcoded
                    photoIndex = 3;
                } else if (state === 'Demo') {
                    photoIndex = 0;
                } else if (state === 'DemoOneBackBay') {
                    photoIndex = 9;
                } else {
                    photoIndex = 0;
                }

                if (state === 'LandingPage') {
                    photoUrl = 'https://cdn.wizio.co/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Kitchen%20Bar.JPG';
                } else {
                    photoUrl = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" +media.vrphoto[photoIndex].title + '.JPG';
                }

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
                getContent: getContent,
                setTourDefaults: setTourDefaults
            }
        }
    ])
