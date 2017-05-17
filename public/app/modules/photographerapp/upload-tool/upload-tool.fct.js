angular.module('PhotographerApp').factory('UploadToolFct', [
    '$q',
    '$resource',
    'lodash',
    'WizioConfig',
    'ModalBuilderFct',
    'TokenSvc',
    'MediaFct',
    'AWSFct',
    function($q, $resource, lodash, WizioConfig, ModalBuilderFct, TokenSvc, MediaFct, AWSFct) {
        var API = {
            subscriptionApartment: {
                media: $resource(WizioConfig.baseAPIURL + 'subscriptionapartment/:SubscriptionPubId/:SubscriptionApartmentPubId', {
                    SubscriptionPubId: '@SubscriptionPubId',
                    SubscriptionApartmentPubId: '@SubscriptionApartmentPubId'
                })
            },
            media: $resource(WizioConfig.baseAPIURL + 'media'),
            apartment: {
                chooseParams: $resource(WizioConfig.baseAPIURL + 'apartment/chooseparams/:param1/:param2/:param3/:param4/:param5/:param6', {
                    param1: '@id',
                    param2: '@pubid',
                    param3: '@concatAddr',
                    param4: '@unitNum',
                    param5: '@Floor_Plan',
                    param6: '@subscriptionPubId'
                })
            }
        }

        // builds the modal and handles the logic for renaming media objects
        // returns a promise from the $q library
        function renameMedia(mediaObj) {
            return $q(function(resolve, reject) {
                ModalBuilderFct.buildComplexModal('md', WizioConfig.uploadViews.modals.renameMedia, 'RenameMediaCtrl', mediaObj).then(function(response) {
                    resolve(response);
                });
            })
        }

        function sortMedia(mediaArray) {
            var sortedMedia = {
                pins: [],
                photos: mediaArray,
                newMedia: []
            };
            return sortedMedia;
        }
        // Initialize modal for choosing a unit to upload photos to
        function initializeChooseUnitModal() {
            return $q(function(resolve, reject) {
                API.apartment.chooseParams.query({
                    param1: 'id',
                    param2: 'pubid',
                    param3: 'concatAddr',
                    param4: 'unitNum',
                    param5: "Floor_Plan",
                    param6: TokenSvc.decode().Subscriptions[0].id
                }, function(response) {
                    // For each unit, add SubscriptionApartment object as key onto it
                    for (var i = 0; i < response.length; i++) {
                        response[i].SubscriptionApartment = {
                            pubid: response[i].pubid
                        };
                    }

                    return resolve(response);
                });
            })
        }
        /*
                Get the photo data for the given SubscriptionApartment for the upload tool.
            */
        function initializeUploadTool(apartment, subscriptionApartmentPubId) {
            return $q(function(resolve, reject) {
                // If there is a Floor Plan, create the URL for the floor plan
                if (apartment.Floor_Plan) {
                    var key = subscriptionApartmentPubId + '/floorplan.png';
                    var modifiedKey = AWSFct.utilities.modifyKeyForEnvironment(key);
                    apartment.Floor_Plan = "https://cdn.wizio.co/" + modifiedKey;
                }

                // Query for the photos of the unit
                API.subscriptionApartment.media.query({
                    SubscriptionPubId: TokenSvc.decode().Subscriptions[0].pubid,
                    SubscriptionApartmentPubId: subscriptionApartmentPubId
                }, function(media) {
                    return resolve(media);
                })
            })
        }

        // Save one media object to the Wizio DB. Must be a properly formed
        // Media object
        function savePhotoToWizioAPI(mediaObject) {
            return $q(function(resolve, reject) {
                // set the useremail on the object to create a new token
                mediaObject.useremail = TokenSvc.decode().email;
                // send the object to the API
                API.media.save(mediaObject, function(response) {
                    return resolve(response);
                })
            })
        }

        /*
            Create an array of 1-100, find the numbers that are already taken, remove
            those from the array of 1-100, then loop over the new photos and assign them
            names based on this array of all available numbers
        */
        function autoNameNewPhotos(newPhotos, currentPhotos) {
            var unavailNums = [];
            var availNums = [];
            var getNumRegex = /\d+/;
            var currPhoto;
            // Get all photos with the name of Photo ## and store the ## as unavailable
            for (var i = 0; i < currentPhotos.length; i++) {
                currPhoto= currentPhotos[i];
                if (currPhoto.title.substr(0, 5) === 'Photo') {
                    unavailNums.push(Number(currPhoto.title.match(getNumRegex)));
                }
            };
            // Create arary of all possible numbers 1-100
            for (var i = 0; i <= 100; i++) {
                availNums.push(i);
            }
            // Remove all unavailable numbers from availNums array
            for (var i = 0; i < unavailNums.length; i++) {
                for (var j = 0; j < availNums.length; j++) {
                    console.dir('unavailNum = ' + unavailNums[i] + ' , availNum = ' + availNums[j]);
                    if(unavailNums[i] === availNums[j]){
                        availNums.splice(j,1);
                        break;
                    };
                };
            };
            // Loop over new photos and assign name based on availNums array
            for (var i = 0; i < newPhotos.length; i++) {
                newPhotos[i].title = 'Photo ' + availNums[i];
                newPhotos[i].file.name = 'Photo ' + availNums[i];
            }
            return newPhotos;
        }
        /**
         * Handles the bulk upload of new photos to a Tour
         * @param  {array} filesArray                   Contains all of the files from the file input
         * @param  {object} apartment                  the apartment object associated with the tour
         * @param  {string} subscriptionApartmentPubId The SubscriptionApartmentPubId
         * @return {promise}                           Returns a promise object
         */
        function bulkUploadPhotos(filesArray, apartment, subscriptionApartmentPubId) {
            return $q(function(resolve, reject) {
                var key;
                var s3Promises = [];
                var wizioAPIPromises = [];
                var wizioAPIUpdatePromises = [];
                var newMedia = apartment.sortedMedia.newMedia;
                if (filesArray.length !== 0) {

                    for (var i = 0; i < filesArray.length; i++) {
                        key = subscriptionApartmentPubId + '/' + apartment.sortedMedia.newMedia[i].title + '.JPG';
                        s3Promises.push(AWSFct.s3.equirectPhotos.uploadTourPhoto(filesArray[i].file, key));
                        continue;
                    }
                    $q.all(s3Promises).then(function(response) {
                        for (var i = 0; i < newMedia.length; i++) {
                            newMedia[i].useremail = TokenSvc.decode().email;
                            wizioAPIPromises.push(savePhotoToWizioAPI(newMedia[i]))
                        }
                        for (var i = 0; i < apartment.sortedMedia.photos.length; i++) {
                            apartment.sortedMedia.photos[i].useremail = TokenSvc.decode().email;
                            wizioAPIPromises.push(savePhotoToWizioAPI(apartment.sortedMedia.photos[i]));
                        }
                        $q.all(wizioAPIPromises).then(function(response) {
                            return resolve('Finished');
                        })
                    })
                } else {
                    for (var i = 0; i < newMedia.length; i++) {
                        newMedia[i].useremail = TokenSvc.decode().email;
                        wizioAPIPromises.push(savePhotoToWizioAPI(newMedia[i]))
                    }
                    for (var i = 0; i < apartment.sortedMedia.photos.length; i++) {
                        apartment.sortedMedia.photos[i].useremail = TokenSvc.decode().email;
                        wizioAPIPromises.push(savePhotoToWizioAPI(apartment.sortedMedia.photos[i]));
                    }
                    $q.all(wizioAPIPromises).then(function(response) {
                        return resolve('Finished');
                    })
                }

            })
        }

        return {
            workflow: {
                init: initializeUploadTool
            },
            sortMedia: sortMedia,
            bulkUploadPhotos: bulkUploadPhotos,
            initializeChooseUnitModal: initializeChooseUnitModal,
            autoNameNewPhotos: autoNameNewPhotos,
            renameMedia: renameMedia,
            saveOnePhotoToWizioAPI: savePhotoToWizioAPI
        }
    }
])
