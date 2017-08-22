angular.module('TourMgmtApp')
  .factory('TourMgmtFct', [
    '$q',
    '$resource',
    '$stateParams',
    '$sessionStorage',
    'AWSFct',
    'TokenSvc',
    'WizioConfig',
    'ModalBuilderFct',
    function($q, $resource, $stateParams, $sessionStorage, AWSFct, TokenSvc, WizioConfig, ModalBuilderFct) {

      var API = {
        subscriptionApartment: {
          media: $resource(WizioConfig.baseAPIURL + 'subscriptionapartment/:SubscriptionPubId/:SubscriptionApartmentPubId', {
            SubscriptionPubId: '@SubscriptionPubId',
            SubscriptionApartmentPubId: '@SubscriptionApartmentPubId'
          })
        }
      }

      /** initTourMgmtMainApp() description
       * initialize the tour management application.
       * -First- get data from either
       *  $stateParams or sessionStorage. if neither of these have data kick user
       *  back to Dashboard.
       * -Second- build floor plan URL if the tour has a floor plans
       * -Third- check if the data is already formatted (from session), if it is
       *  don't request data from the API again
       * -Fourth- If data is not formatted, request data from API
       * -Fifth- IF data is properly returned from API, format data
       * -Sixth- Once data is formatted, save to sessionStorage
       * @return {promise} [Object of formatted data for TourMgmtApp]
       */
      function initTourMgmtMainApp() {
        return $q(function(resolve, reject) {

          /* Get data used to initialize TourManagementApp */
          var data = getInitializationData();

          /* If there is no data in sessionStorage or state params, rerout to dashboard */
          if (data === false) {
            reject({
              status: 'err',
              message: 'Cannot access data. Please try again later.',
              payload: null
            })
          }

          /* If the apartment has a floorplan associated with it */
          if (data.Apartment.Floor_Plan) {
            data.Apartment.Floor_Plan = buildFloorPlanUrl(data.Apartment, data.SubscriptionApartment.pubid)
          }

          if (data.dataStatus === 'Formatted') {
            /* On page refresh purge any non uploaded data */
            data.TourMedia = purgeDataOnPageRefresh(data);
            return resolve({
              status: 'success',
              message: 'Data retrieved from session',
              payload: $sessionStorage.TourMgmtApp.data
            });
          } else {

            /* Get photos associated with the tour */
            API.subscriptionApartment.media.get({
              SubscriptionPubId: TokenSvc.decode().Subscriptions[0].pubid,
              SubscriptionApartmentPubId: data.SubscriptionApartment.pubid
            }, function(response) {
              /* If response was successful, format data and return promise */
              if (response.status === 'success') {
                data.TourMedia = response.payload;
                var formattedData = formatData(data);
                if (formattedData.dataStatus === 'Formatted') {
                  $sessionStorage.TourMgmtApp.data = formattedData;
                  return resolve({
                    status: 'success',
                    message: 'success',
                    payload: formattedData
                  })
                } else {
                  return reject({
                    status: 'err',
                    message: 'Could not format data at this time. Data may be missing',
                    payload: null
                  })
                }
              } else {
                return reject({
                  status: 'err',
                  message: 'Could not retrieve data at this time. Please try again later.',
                  payload: null
                });
              }
            })
          }

        })
      }

      /** buildFloorPlanUrl() descripition
       * [buildFloorPlanUrl, modify key based on env code is running in]
       * @param  {string} subscriptionApartmentPubId [36 char pubid of SubscriptionApartment]
       * @return {string}                            [URL for floorplan]
       */
      function buildFloorPlanUrl(subscriptionApartmentPubId) {
        var key = subscriptionApartmentPubId + '/floorplan.png';
        var modifiedKey = AWSFct.utilities.modifyKeyForEnvironment(key);
        var floorPlanUrl = WizioConfig.CLOUDFRONT_DISTRO + modifiedKey;
        return floorPlanUrl;
      }

      /** getInitializationData() description
       * Check if $stateParams came with data. If it didn't page was navigated to
       * directly or was reloaded. Check $sessionStorage for data. If sessionStorage
       * doesn't have data, return false to kick user back to dashboard
       * @return {[type]} [description]
       */
      function getInitializationData() {
        if ($stateParams.data) {
          $stateParams.data.newTour = $stateParams.action === 'ModifyTour' ? 0 : 1;
          $sessionStorage.TourMgmtApp = {
            data: $stateParams.data,
            action: $stateParams.action
          };
          return data = $stateParams.data;
        } else if ($sessionStorage.TourMgmtApp.data && $sessionStorage.TourMgmtApp.action === 'ModifyTour') {
          return data = $sessionStorage.TourMgmtApp.data;
        } else {
          return false;
        }
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

      /** formatData() description
       * Foramt data for TourMgmtApp.
       * @param  {Object} data [unformatted object of data for TourMgmtApp]
       * @return {Object}      [Object of data either unformatted or formatted]
       */
      function formatData(data) {
        if (data.Apartment && data.SubscriptionApartment.pubid && data.TourMedia) {
          var formattedData = {
            Apartment: data.Apartment,
            SubscriptionApartment: {
              pubid: data.pubid,
              id: data.id
            },
            TourMedia: {
              pins: [],
              photos: data.TourMedia,
              floorplan: data.Apartment.Floor_Plan ? data.Apartment.Floor_Plan : null
            },
            dataStatus: 'Formatted',
            newTour: data.newTour
          }
          for (var i = 0; i < formattedData.TourMedia.photos.length; i++) {
            formattedData.TourMedia.photos[i].isNew = 0;
          }
          return formattedData;
        } else {
          data.dataStatus = 'Unformatted'
          return data;
        }
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

      function previewNewPhotos(TourMediaPhotos, elem) {
        for (var i = 0; i < TourMediaPhotos.length; i++) {
          if (TourMediaPhotos[i].isNew) {
            var previewElement = elem ? elem : document.getElementById('imgPreview' + i);
            previewPhoto(TourMediaPhotos[i].file, previewElement);
          }
        }
        return;
      }

      function buildFloorPlanObj(file) {
        var photo = {
          apartmentpubid: data.SubscriptionApartment.pubid,
          title: 'floorplan',
          awsurl: 'https://cdn.wizio.co/' + data.SubscriptionApartment.pubid + '/floorplan.png',
          ApartmentId: data.Apartment.id,
          SubscriptionApartmentPubId: data.SubscriptionApartment.pubid,
          useremail: TokenSvc.decode().email,
          file: file,
          isNew: true,
          isFloorPlan: true
        }
        return photo;
      }

      // Used to calculate the pin X and Y based on the mouse click
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

      return {
        init: {
          mainApp: initTourMgmtMainApp
        },
        photo: {
          rename: renamePhoto
        },
        newPhotos: {
          add: buildNewPhotosArr,
          preview: previewNewPhotos
        },
        floorplan: {
          buildFloorPlanObj: buildFloorPlanObj
        },
        calculatePinXandY: calculatePinXandY
      }
    }
  ])
