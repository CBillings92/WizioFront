angular.module('TourMgmtApp')
  .factory('TourMgmtFct', [
    '$q',
    '$resource',
    '$state',
    '$stateParams',
    '$sessionStorage',
    'AWSFct',
    'TokenSvc',
    'WizioConfig',
    'ModalBuilderFct',
    function($q, $resource, $state, $stateParams, $sessionStorage, AWSFct, TokenSvc, WizioConfig, ModalBuilderFct) {

      var API = {
        subscriptionApartment: {
          media: $resource(WizioConfig.baseAPIURL + 'subscriptionapartment/:SubscriptionPubId/:SubscriptionApartmentPubId', {
            SubscriptionPubId: '@SubscriptionPubId',
            SubscriptionApartmentPubId: '@SubscriptionApartmentPubId'
          })
        },
        media: $resource(WizioConfig.baseAPIURL + 'media'),
        subscriptionAptMedia: $resource(WizioConfig.baseAPIURL + 'subscriptionaptmedia'),
        apartment: {
          chooseParams: $resource(WizioConfig.baseAPIURL + 'apartment/chooseparams/:param1/:param2/:param3/:param4/:param5/:param6', {
            param1: '@id',
            param2: '@pubid',
            param3: '@concatAddr',
            param4: '@unitNum',
            param5: '@Floor_Plan',
            param6: '@subscriptionPubId'
          }),
          updateFloorPlan: $resource(WizioConfig.baseAPIURL + 'apartment/update/floorplan', {
            SubscriptionPubId: '@SubscriptionApartmentPubId',
            ApartmentId: '@ApartmentId'
          })
        }
      }

      /**
       * Initializes the TourMgmt App.
       * 1) Check if base data for tour mgmt application is in either stateParams or sessionStorage
       * 2) If the data exists, get the data
       * 3) Check the integrity of the data
       * 4) If the data is formatted, it's from sessionStorage and we don't need to make an API calls
       * 5) if the data is formatted, purge the data that hasn't been saved from the app
       * 6) If data is not formatted, make API call for TourMediaArray
       * 7) Add TourMediaArray to data object.
       * 8) Finish data object config and save it to sessionStorage.
       * @param  {[type]} stateParams [description]
       * @return {[type]}             [description]
       */
      function init(stateParams) {
        return $q(function (resolve, reject) {

          if (!$sessionStorage.TourMgmtApp) {
            $sessionStorage.TourMgmtApp = {};
          }

          // Check to make sure we have base data for app initialization
          if (!stateParams.data && !$sessionStorage.TourMgmtApp.data) {
            return reject({
              status: 'err',
              message: 'Could not get base tour data for app.',
              payload: {}
            });
          }

          // If we have initalization data, get it
          var data = getBaseDataForState(stateParams);

          // Check if all data needed from app exists in data
          if (!dataExistsForApp(data)) {
            return reject({
              status: 'err',
              message: 'Data is missing from base data',
              payload: {}
            });
          }

          // If the data is already formatted (from session storage)
          // purge any data that wasn't saved (this is from page refresh)
          if (data.formatted) {
            purgeDataOnPageRefresh(data)
            return resolve({status: 'success', message: 'Formatted data retrieved from Session. Unsaved data purged on page refresh.', payload: data})
          } else {
            // Save base data to local storage
            $sessionStorage.TourMgmtApp.data = data
            fetchTourMediaDataFromApi(data.SubscriptionApartment)
            .then(function(TourMediaArr){
              data.TourMedia = {
                photos: TourMediaArr
              };

              if (data.Apartment.Floor_Plan) {
                data.Apartment.Floor_Plan = buildFloorPlanUrl(data.SubscriptionApartment.pubid)
              }
              data.formatted = 1;
              data.newTour = data.stateAction === 'ModifyTour' ? 0 : 1;
              $sessionStorage.TourMgmtApp.data = data;
              return resolve({status: 'success', message: 'Tour Management App Initialized.', payload: data})
            })
            .catch(function(err){
              return reject({status: 'err', message: 'Could not retrieve data at this time.', payload: {}})
            })
          }

        })
      }

      /**
       * Check to make sure data object contains all data that the app needs
       * @param  {object} data object with at least Apartment and SubscriptionApartment
       * @return {[type]}      [description]
       */
      function dataExistsForApp(data) {
        if (data.Apartment && data.SubscriptionApartment) {
          return true;
        } else {
          return false;
        }
      }

      function saveDataToSessionStorage(data) {
        $sessionStorage.TourMgmtApp.data = data
        fetchTourMediaDataFromApi(data)
        .then(function(TourMediaArr){
          data = formatDataForApp(data, TourMediaArr)
          data.TourMedia = {
            photos: TourMediaArr
          };
          if (data.Apartment.Floor_Plan) {
          }
        })
        .catch(function(err){

        })
      }

      /**
       * Get Tour Photo data from API for SubscriptionApartment
       * @param  {Array} SubscriptionApartment array of standard photo objects
       * @return {object}                       object of data or response object
       */
      function fetchTourMediaDataFromApi(SubscriptionApartment) {
        return $q(function(resolve, reject){
          API.subscriptionApartment.media.get({
            SubscriptionPubId: TokenSvc.decode().Subscriptions[0].pubid,
            SubscriptionApartmentPubId: SubscriptionApartment.pubid
          }, function(apiResponse) {
            if (apiResponse.status === 'success') {
              return resolve(apiResponse.payload)
            } else {
              return reject({status: 'err', message: 'Could not retrieve data at this time', payload: {}});
            }
          })
        })
      }

      /**
       * Return formatted data for application from either SessionStorage or
       * stateParams. stateParams takes precedence because it's safer.
       * @param  {object} stateParams stateParams that comes from state transition.
       * @return {object}             data from stateParams or sessionStorage
       */
      function getBaseDataForState(stateParams) {
        var data;
        if (stateParams.data) {
          data = stateParams.data;
          data.formatted = false;
          data.stateAction = stateParams.action;
        } else {
          data = $sessionStorage.TourMgmtApp.data
        }
        return data
      }

      /** buildFloorPlanUrl() descripition
       * [buildFloorPlanUrl, modify key based on env code is running in]
       * @param  {string} subscriptionApartmentPubId [36 char pubid of SubscriptionApartment]
       * @return {string}                            [URL for floorplan]
       */
      function buildFloorPlanUrl(subscriptionApartmentPubId) {
        var key = subscriptionApartmentPubId + '/floorplan.png';
        var floorPlanUrl = WizioConfig.CLOUDFRONT_DISTRO + key;
        return floorPlanUrl;
      }

      function purgeDataOnPageRefresh(data) {
        for (var i = data.TourMedia.photos.length - 1; i >= 0; i--) {
          if (data.TourMedia.photos[i].isNew) {
            data.TourMedia.photos.splice(i, 1);
          }
        }
        data.TourMedia.floorplan = null;
        data.TourMedia.pins = [];
        return data.TourMedia;
      }


      /** renamePhoto() description
       * For renaming photos. Builds rename photo modal
       * @param  {Object} photoObj [standard Photo object (media object)]
       * @return {promise}          [object promise response]
       */
      function renamePhoto(photoObj) {
        return $q(function(resolve, reject) {
          ModalBuilderFct.buildComplexModal('md', WizioConfig.uploadViews.modals.renameMedia, 'RenameMediaCtrl', photoObj).then(function(response) {
            resolve(response);
          });
        })
      }

      function buildNewPhotosArr(filelist, data) {
        var newMediaArr = [];
        for (var i = 0; i < filelist.length; i++) {
          var photo = {
            x: null,
            y: null,
            apartmentpubid: data.SubscriptionApartment.pubid,
            isUnit: 0,
            type: 'vrphoto',
            title: filelist[i].name,
            awsurl: 'https://cdn.wizio.co/' + data.SubscriptionApartment.pubid + '/',
            ApartmentId: data.Apartment.id,
            SubscriptionApartmentPubId: data.SubscriptionApartment.pubid,
            useremail: TokenSvc.decode().email,
            file: filelist[i],
            isNew: true
          }
          data.TourMedia.photos.unshift(photo);
        }
        return data.TourMedia.photos;
      }

      /**
       * Previews a single photo by setting blob or URL to htmltag src
       * @param  {Object}     photo   [standard photo object]
       * @param  {DOMElement} htmltag [DOMElement object of the elemnt you want to preview photo in]
       * @return {undefined}         []
       */
      function previewPhoto(photo, htmltag) {
        if (photo) {
          var reader = new FileReader();
          reader.addEventListener('load', function() {
            htmltag.src = reader.result
          })
          reader.readAsDataURL(photo);
          return;
        } else {
          return;
        }

      }

      /**
       * persist changes made to tour. Upload any new photos to S3 and send all
       * photos to Wizio backend to run an update or create to update all photos.
       * @param  {Object} data [Tour app data object]
       * @return {promise}      [promise]
       */
      function saveChanges(data) {
        return $q(function(resolve, reject) {
          /* Shorthand variables */
          var photosArr = data.TourMedia.photos;
          var floorplan = data.TourMedia.floorplan;
          var subscriptionAptPubId = data.SubscriptionApartment.pubid;


          for (var i = 0; i < photosArr.length; i++) {
            photosArr[i].order = i;
          }
          bulkUploadPhotosToS3(photosArr, subscriptionAptPubId, floorplan)
          .then(function(response){
            return bulkSavePhotosToWizioAPI(photosArr)
          })
          .then(function(response){
            return updateFloorPlanData(data.Apartment.id, subscriptionAptPubId)
          })
          .then(function(response){
            return resolve('finished');
          })
        })
      }

      function bulkUploadPhotosToS3(photosArr, subscriptionAptPubId, floorplan) {
        return $q(function(resolve, reject) {
          var s3PhotoKey = null;
          var s3UploadPromises = [];
          for (var i = 0; i < photosArr.length; i++) {
            if (photosArr[i].isNew) {
              s3PhotoKey = subscriptionAptPubId + '/' + photosArr[i].title + '.JPG'
              s3UploadPromises.push(AWSFct.s3.equirectPhotos.uploadTourPhoto(photosArr[i].file, s3PhotoKey))
            }
          }
          if (floorplan && floorplan.isNew) {
            s3UploadPromises.push(floorplan);
          }
          if (s3UploadPromises.length > 0) {
            $q.all(s3UploadPromises)
            .then(function(response){
              return resolve()
            })
          } else {
            return resolve()
          }
        })
      }

      /**
       * Bulk save photos to the wizio api. Iterate over list of photos and add promises to
       * an array of saving individual photos
       * @param  {array} photosArr array of standard photo objects
       * @return {promises}           returs a promise
       */
      function bulkSavePhotosToWizioAPI(photosArr) {
        return $q(function(resolve, reject) {
          var promisesArr = []
          for (var i = 0; i < photosArr.length; i++) {
            promisesArr.push(savePhotoToWizioAPI(photosArr[i]))
          }
          if (photosArr.length > 0) {
            $q.all(promisesArr)
            .then(function(response){
              return resolve()
            })
          } else {
            return resolve();
          }
        })
      }

      function updateFloorPlanData(floorplan, subscriptionAptPubId) {
        return $q(function(resolve, reject) {
          if (floorplan && floorplan.isNew) {
            API.apartment.updateFloorPlan.save({
              SubscriptionApartmentPubId: subscriptionAptPubId,
              ApartmentId: apartmentId
            }, function(response) {
              return resolve('Finished');
            })
          } else {
            return resolve();
          }
        })
      }

      /**
       * Iterates over array of photos and calls the previewPhoto function
       * with each individual photo and elem. If the elem isn't provided or is
       * false, default is to assign previews to the list of tour images.
       * IF you want to preview one photo, send one photo in an array
       * @param  {Array} TourMediaPhotos [array of photos to be previewed. Even one photo should be in array]
       * @param  {HTMLElement} elem            [HTMLElement to preview photo in - optional]
       * @return {undefined}                 []
       */
      function previewNewPhotos(TourMediaPhotos, elem) {
        for (var i = 0; i < TourMediaPhotos.length; i++) {
          if (TourMediaPhotos[i].isNew) {
            var previewElement = elem ? elem : document.getElementById('imgPreview' + i);
            previewPhoto(TourMediaPhotos[i].file, previewElement);
          }
        }
        return;
      }

      /**
       * Build wrapper standard photo object around floor plan file.
       * @param  {File} file [file comes from file input. An actual file.]
       * @return {Object}      [standard photo object]
       */
      function buildFloorPlanObj(file, stateData) {
        var photo = {
          apartmentpubid: stateData.SubscriptionApartment.pubid,
          title: 'floorplan',
          awsurl: 'https://cdn.wizio.co/' + stateData.SubscriptionApartment.pubid + '/floorplan.png',
          ApartmentId: stateData.Apartment.id,
          SubscriptionApartmentPubId: stateData.SubscriptionApartment.pubid,
          useremail: TokenSvc.decode().email,
          file: file,
          isNew: true,
          isFloorPlan: true
        }
        return photo;
      }

      /**
       * Used to calculate pin X and Y coords on pin drop or movement
       * @param  {Object} mouseEvent [mouse event from JS mouse click event]
       * @return {Object}            [object of pin coords]
       */
      function calculatePinXandY(mouseEvent) {
        // hardcoded values account for the size of the rectangle pin image
        // so that the bottom of the pin is where the user clicks (not the
        // top left of the box the pin is in)
        var x = (((mouseEvent.offsetX - 17) / mouseEvent.target.clientWidth) * 100).toFixed(2);
        var y = (((mouseEvent.offsetY - 35) / mouseEvent.target.clientHeight) * 100).toFixed(2);

        return {
          x: x,
          y: y
        };
      }

      /**
       * Save photo to WizioDB. Could be floorplan or tour photo
       * @param  {Object} photo [standard photo object]
       * @return {promise}       [returns API request response]
       */
      function savePhotoToWizioAPI(photo) {
        return $q(function(resolve, reject) {
          // send the object to the API
          API.media.save(photo, function(response) {
            return resolve(response);
          })
        })
      }

      /**
       * Old logic FIXME update
       * @param  {Object} photo [standard photo object]
       * @return {[type]}       [description]
       */
      function deletePhoto(photo) {
        return $q(function(resolve, reject) {
          var data = {
            MediaObject: {
              'id': photo.id
            },
            UpdatedData: {
              IsDeleted: 1
            }
          };
          API.media.delete(data, function(response) {
            return resolve(response);
          })
        })
      }

      function rerouteAfterSave() {
        $sessionStorage.TourMgmtApp.data = null;
        $state.go('Account.Dashboard');
        return;
      }


      return {
        init: {
          mainApp: init
        },
        photo: {
          rename: renamePhoto,
          delete: deletePhoto
        },
        newPhotos: {
          add: buildNewPhotosArr,
          preview: previewNewPhotos
        },
        floorplan: {
          buildFloorPlanObj: buildFloorPlanObj
        },
        calculatePinXandY: calculatePinXandY,
        saveChanges: saveChanges
      }
    }
  ])
