angular.module('PhotographerApp')
    .factory('UploadToolFct', [
        '$q',
        '$resource',
        'lodash',
        'WizioConfig',
        'TokenSvc',
        function($q, $resource, lodash, WizioConfig, TokenSvc){
            var API = {
                subscriptionApartment: {
                    media: $resource(WizioConfig.baseAPIURL + 'subscriptionapartment/:SubscriptionPubId/:SubscriptionApartmentPubId', {
                            SubscriptionPubId: '@SubscriptionPubId',
                            SubscriptionApartmentPubId: '@SubscriptionApartmentPubId',
                        })
                }
            }
            function sortMedia(unsortedMedia) {
                var sortedMedia = {
                    pins: [],
                    amenities: []
                };
                // Check to see if there are any photos for this SubscriptionApartment
                if(Object.keys(unsortedMedia).length === 0) {
                    return sortedMedia;
                } else {
                    sortedMedia = lodash.groupBy(unsortedMedia, "isUnit");

                    // store non-unit photos in 'amenities'
                    if (sortedMedia.false){
                        sortedMedia.amenities = sortedMedia.false;
                    }
                    // some media will have isUnit = nul, make these amenities
                    sortedMedia.amenities.concat(sortedMedia.null);

                    // store the isUnit photos in the pins array
                    if (sortedMedia.true) {
                        sortedMedia.pins = sortedMedia.true;
                    }
                    return sortedMedia;
                }
            }
            function initializeUploadTool(Apartment) {
                return $q(function(resolve, reject){
                    if (Apartment.Floor_Plan) {
                        Apartment.Floor_Plan = "https://cdn.wizio.co/" + modalData.Apartment.SubscriptionApartmentPubId + '/floorplan.png'
                    }
                    API.subscriptionApartment.media.query({
                        SubscriptionPubId: TokenSvc.decode().Subscriptions[0].pubid,
                        SubscriptionApartmentPubId: Apartment.SubscriptionApartmentPubId
                    }, function(media){
                        return resolve(media);
                    })
                })
            }
            return {
                workflow: {
                    init: initializeUploadTool
                },
                sortMedia: sortMedia
            }
        }
    ])
