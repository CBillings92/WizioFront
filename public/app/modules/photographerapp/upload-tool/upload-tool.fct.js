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
                    if (sortedMedia.null) {
                        sortedMedia.amenities.concat(sortedMedia.null);
                    }

                    // store the isUnit photos in the pins array
                    if (sortedMedia.true) {
                        sortedMedia.pins = sortedMedia.true;
                    } else {
                        sortedMedia.pins = [];
                    }
                    sortedMedia.newMedia = [];
                    return sortedMedia;
                }
            }
            function initializeUploadTool(Apartment) {
                return $q(function(resolve, reject){
                    if (Apartment.Floor_Plan) {
                        var key = Apartment.SubscriptionApartmentPubId + '/floorplan.png';
                        var modifiedKey = AWSFct.utilities.modifyKeyForEnvironment(key);
                        Apartment.Floor_Plan = "https://cdn.wizio.co/" + modifiedKey;
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

                    if (filesArray.length === 0) {
                        return reject('No Files To Upload');
                    }

                    for (var i = 0; i < filesArray.length; i++) {
                        key = apartment.SubscriptionApartmentPubId + '/' + apartment.sortedMedia.newMedia[i].title + '.JPG';
                        promises.push(AWSFct.s3.equirectPhotos.uploadTourPhoto(filesArray[i], key));
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
