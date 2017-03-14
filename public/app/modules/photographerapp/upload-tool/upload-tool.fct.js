angular.module('PhotographerApp')
    .factory('UploadToolFct', [
        '$q',
        '$resource',
        'lodash',
        'WizioConfig',
        'TokenSvc',
        'MediaFct',
        'AWSFct',
        function($q, $resource, lodash, WizioConfig, TokenSvc, MediaFct, AWSFct){
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
                    sortedMedia.newMedia = [];
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

            function bulkUploadPhotos(filesArray, apartment) {
                return $q(function (resolve, reject) {
                    var key;
                    var promises = [];

                    if (files.length === 0) {
                        return reject('No Files To Upload');
                    }

                    for (var i = 0; i < files.length; i++) {
                        key = apartment.SubscriptionApartmentPubId + '/' + apartment.sortedMedia.newMedia[i].titel + '.JPG';
                        promises.push(AWSFct.s3.equirectPhotos.uploadTourPhoto(files[i], key));
                        continue;
                    }

                    $q.all(promises)
                    .then(function(response){
                        return resolve('Finished');
                    })
                })
            }

            return {
                workflow: {
                    init: initializeUploadTool
                },
                sortMedia: sortMedia,
                bulkUploadPhotos: bulkUploadPhotos
            }
        }
    ])
