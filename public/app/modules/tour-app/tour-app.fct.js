angular.module('TourApp')
  .factory('TourFct', [
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
        return $q(function(resolve, reject) {
          var activeListingId;
          var apartmentPubId;
          var currentState = $state.current.name;
          var apiResource = $resource(
            WizioConfig.baseAPIURL + 'activelisting/:activelistingid', {
              'activelistingid': '@activelistingid'
            }
          )

          if (currentState === 'LandingPage') {
            activeListingId = WizioConfig.LandingPage.activeListingId();
          } else if (currentState === 'Demo' || currentState === 'Product') {
            activeListingId = WizioConfig.DemoPage.activeListingId();
          } else {
            activeListingId = $state.params.apitoken || $state.params.activelistingid;
            apartmentpubid = $state.params.apartmentpubid;
          }

          var query = {
            activelistingid: activeListingId
          }
          apiResource.query(query, function(results) {

            if (results[0].pinRequired) {
              requestTourPasswordModal({
                  activelistingid: activeListingId
                })
                .then(function(response) {
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
        var progressivePhotoUrls;
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

        photoUrl = WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" + media.vrphoto[photoIndex].title + '.JPG';
        progressivePhotoUrls = [
          WizioConfig.CLOUDFRONT_DISTRO + '800x400/' + SubscriptionApartmentPubId + "/" + media.vrphoto[photoIndex].title + '.JPG',
          WizioConfig.CLOUDFRONT_DISTRO + SubscriptionApartmentPubId + "/" + media.vrphoto[photoIndex].title + '.JPG'
        ]
        return {
          Floor_Plan: floorplan,
          photoIndex: photoIndex,
          photoUrl: photoUrl,
          imageUrls: progressivePhotoUrls,
          navpoints: media.vrphoto[photoIndex].navpoints
        }
      }

      function requestTourPasswordModal(data) {
        return $q(function(resolve, reject) {
          ModalBuilderFct.buildComplexModal(
              'md',
              'public/app/modules/unitapp/viewtemplates/pinrequired.modal.html',
              'PinRequiredModalCtrl',
              data
            )
            .then(function(response) {
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
      // {x: -34.174059151117135, y: -57.40047926997227, z: -74.29311145878253}
      var demoNavPointData = {
        entryNavPoints: [{
            name: 'navpoint1',
            targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG'],
            x: -34.174059151117135, y: -51.40047926997227, z: -70.29311145878253,
          },
          {
              name: 'navpoint1',
              targetImageURLs: ['https://d1mze0h82dkhhe.cloudfront.net/800x400/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG','https://d1mze0h82dkhhe.cloudfront.net/e8955821-f7bc-4eef-b3d7-fe9419fb9a1d/Living%20Room.JPG'],
              x: -34.174059151117135, y: -57.40047926997227, z: -74.29311145878253,
          },

          // {
          //   name: 'navpoint2',
          //   targetImageURLs: [],
          //   x:1 , y:1 , z:1
          // },
          // {
          //   name: 'navpoint3',
          //   targetImageURLs: [],
          //   x:1 ,y:1 ,z:1
          // },
          // {
          //   name: 'navpoint4',
          //   targetImageURLs: [],
          //   x: 1 ,y:1 ,z:1
          // }
        ]
      }
      return {
        setTourDefaults: setTourDefaults,
        getContent: getContent,
        demoNavPointData: demoNavPointData

      }
    }
  ])
