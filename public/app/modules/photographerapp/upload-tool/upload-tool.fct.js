angular.module('PhotographerApp')
    .factory('UploadToolFct', [
        '$q',
        '$resource',
        'lodash',
        'WizioConfig',
        'ModalBuilderFct',
        'TokenSvc',
        'MediaFct',
        'AWSFct',
        function($q, $resource, lodash, WizioConfig, ModalBuilderFct, TokenSvc, MediaFct, AWSFct){
            var API = {
                subscriptionApartment: {
                    media: $resource(WizioConfig.baseAPIURL + 'subscriptionapartment/:SubscriptionPubId/:SubscriptionApartmentPubId', {
                            SubscriptionPubId: '@SubscriptionPubId',
                            SubscriptionApartmentPubId: '@SubscriptionApartmentPubId',
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
                return $q(function(resolve, reject){
                  ModalBuilderFct.buildComplexModal(
                    'md',
                    WizioConfig.uploadViews.modals.renameMedia,
                    'RenameMediaCtrl',
                    mediaObj
                  )
                  .then(function(response){
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
                return $q(function(resolve, reject){
                    API.apartment.chooseParams.query({
                        param1: 'id',
                        param2: 'pubid',
                        param3: 'concatAddr',
                        param4: 'unitNum',
                        param5: "Floor_Plan",
                        param6: TokenSvc.decode().Subscriptions[0].id
                    }, function(response){
                        // For each unit, add SubscriptionApartment object as key onto it
                        for(var i = 0; i < response.length; i++){
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
                return $q(function(resolve, reject){
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
                    }, function(media){
                        return resolve(media);
                    })
                })
            }

            // Save one media object to the Wizio DB. Must be a properly formed
            // Media object
            function savePhotoToWizioAPI(mediaObject) {
                return $q(function(resolve, reject){
                    // set the useremail on the object to create a new token
                    mediaObject.useremail = TokenSvc.decode().email;
                    // send the object to the API
                    API.media.save(mediaObject, function (response) {
                        return resolve(response);
                    })
                })
            }

            function autoNameNewPhoto(listOfNewPhotos, listOfCurrentAndNewPhotos) {
                var photoNumsTaken = [];
                var newPhotoName = 'Photo';
                for(var i = 0; i < listOfCurrentAndNewPhotos.length; i++) {
                    if(listOfCurrentAndNewPhotos[i].title.substr(0,5) === 'Photo') {
                        photoNumsTaken.push(Number(listOfCurrentAndNewPhotos[i].title.substr(6,7)));
                    }
                }
                for(var i = 0; i < listOfNewPhotos.length; i++) {
                    if(listOfNewPhotos[i].title.substr(0,5) === 'Photo') {
                        photoNumsTaken.push(Number(listOfNewPhotos[i].title.substr(6,7)));
                    }
                }
                photoNumsTaken = photoNumsTaken.sort();
                photoNumsTaken.push("");
                for (var i = 0; i <= photoNumsTaken.length; i++) {
                    if(photoNumsTaken[i] === i){
                        continue;
                    } else {
                        newPhotoName = newPhotoName + ' ' + i;
                        break;
                    }
                }
                return newPhotoName;
            }

            function bulkUploadPhotos(filesArray, apartment, subscriptionApartmentPubId) {
                return $q(function (resolve, reject) {
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
                        $q.all(s3Promises)
                        .then(function(response){
                            for (var i = 0; i < newMedia.length; i++) {
                                newMedia[i].useremail = TokenSvc.decode().email;
                                wizioAPIPromises.push(savePhotoToWizioAPI(newMedia[i]))
                            }
                            for (var i = 0; i < apartment.sortedMedia.photos.length; i++) {
                                apartment.sortedMedia.photos[i].useremail = TokenSvc.decode().email;
                                wizioAPIPromises.push(savePhotoToWizioAPI(apartment.sortedMedia.photos[i]));
                            }
                            $q.all(wizioAPIPromises)
                            .then(function(response){
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
                        $q.all(wizioAPIPromises)
                        .then(function(response){
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
                autoNameNewPhoto: autoNameNewPhoto,
                renameMedia: renameMedia,
                saveOnePhotoToWizioAPI: savePhotoToWizioAPI
            }
        }
    ])
