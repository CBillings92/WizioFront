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

      function initTourMgmtMainApp() {
        return $q(function(resolve, reject){

          /* Get data used to initialize TourManagementApp */
          var data = getInitializationData();

          /* If there is no data in sessionStorage or state params, rerout to dashboard */
          if(data === false) {
            reject({status: 'err', message: 'Cannot access data. Please try again later.', payload: null})
          }

          /* If the apartment has a floorplan associated with it */
          if (data.Apartment.Floor_Plan) {
            data.Apartment.Floor_Plan = buildFloorPlanUrl(data.Apartment, data.SubscriptionApartment.pubid)
          }

          if(data.dataStatus === 'Formatted'){
            console.dir('FORMATTED DATA ALREADY DONT CALL API');
            return resolve({status: 'success', message:'Data retrieved from session', payload: $sessionStorage.TourMgmtApp.data});
          } else {

            /* Get photos associated with the tour */
            API.subscriptionApartment.media.get({
              SubscriptionPubId: TokenSvc.decode().Subscriptions[0].pubid,
              SubscriptionApartmentPubId: data.SubscriptionApartment.pubid
            }, function(response){
              /* If response was successful, format data and return promise */
              if (response.status === 'success') {
                data.TourMedia = response.payload;
                var formattedData = formatData(data);
                console.dir(formattedData);
                if (formattedData.dataStatus === 'Formatted') {
                  $sessionStorage.TourMgmtApp.data = formattedData;
                  return resolve({status: 'success', message: 'success', payload: formattedData})
                } else {
                  return reject({status: 'err', message: 'Could not format data at this time. Data may be missing', payload: null})
                }
              } else {
                return reject({status: 'err', message: 'Could not retrieve data at this time. Please try again later.', payload: null});
              }
            })
          }

        })
      }


      function buildFloorPlanUrl(apartment, subscriptionApartmentPubId) {
        var key = subscriptionApartmentPubId + '/floorplan.png';
        var modifiedKey = AWSFct.utilities.modifyKeyForEnvironment(key);
        var floorPlanUrl = WizioConfig.CLOUDFRONT_DISTRO + modifiedKey;
        return floorPlanUrl;
      }

      function getInitializationData() {
        console.dir($sessionStorage.TourMgmtApp.data);
        console.dir($sessionStorage.TourMgmtApp.action);
        if ($stateParams.data) {
          $stateParams.data.newTour = $stateParams.action === 'ModifyTour' ? 0 : 1;
          $sessionStorage.TourMgmtApp = {
            data: $stateParams.data,
            action: $stateParams.action
          };
          return data = $stateParams.data;
        } else if ($sessionStorage.TourMgmtApp.data && $sessionStorage.TourMgmtApp.action === 'ModifyTour') {
          console.dir('RETURN SESSION DATA');
          return data = $sessionStorage.TourMgmtApp.data;
        } else {
          return false;
        }
      }

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
              currentPhotos: data.TourMedia,
              newPhotos: []
            },
            dataStatus: 'Formatted',
            newTour: data.newTour
          }
          console.dir(formattedData);
          return formattedData
        } else {
          data.dataStatus = 'Unformatted'
          return
        }
      }


      // builds the modal and handles the logic for renaming media objects
      // returns a promise from the $q library
      function renamePhoto(photoObj) {
          return $q(function(resolve, reject) {
              ModalBuilderFct.buildComplexModal('md', WizioConfig.uploadViews.modals.renameMedia, 'RenameMediaCtrl', photoObj).then(function(response) {
                  resolve(response);
              });
          })
      }

      return {
        init: {
          mainApp: initTourMgmtMainApp
        },
        photo: {
          rename: renamePhoto
        }
      }
    }
  ])
