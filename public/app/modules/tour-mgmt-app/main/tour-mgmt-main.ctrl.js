angular.module('TourMgmtApp')
  .controller('TourMgmtMainCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'AWSFct',
    'LoadingSpinnerFct',
    'TourMgmtFct',
    'WizioConfig',
    function($scope, $state, $stateParams, AWSFct, LoadingSpinnerFct, TourMgmtFct, WizioConfig) {
      $scope.appInitialized = false;
      $scope.data;
      $scope.cdnEndPoint = WizioConfig.CLOUDFRONT_DISTRO;

      /* Kick off loading spinner for initialization */
      LoadingSpinnerFct.show('TourManagementMainLoad');

      /* Initialize Tour Mgmt App */
      TourMgmtFct.init.mainApp()
      .then(function(response){
        console.dir(response);
        $scope.appInitialized = true;
        /* Assign formatted data to scope */
        $scope.data = response.payload;
        $scope.selectPhotoForModification($scope.data.TourMedia.currentPhotos[0]);
        /* Hide loading spinner */
        LoadingSpinnerFct.hide('TourManagementMainLoad');

      })
      .catch(function(err){
        alert('Could not load data for tour management at this time. Please try again later.')
        LoadingSpinnerFct.hide('TourManagementMainLoad');
        $state.go('Account.Dashboard');
      })

      $scope.selectPhotoForModification = function(photo) {
        console.dir('hello');
        photo.src = buildPhotoSrc(photo);
        $scope.photoForModification = photo;
      }

      // Rename media
      function renamePhoto() {
          $scope.photoForModification.SubscriptionApartmentPubId = $scope.data.SubscriptionApartment.pubid;
          TourMgmtFct.photo.rename($scope.photoForModification).then(function(response) {
              if (response === 'exit') {
                  return;
              } else {
                  $scope.photoForModification = response.Photo;
                  ModalBuilderFct.buildSimpleModal("", "OK", "Success", 'Photo renamed successfully.').then(function(result) {
                      return;
                  });
              }
          });
      }
      $scope.renamePhoto = renamePhoto;
      /* Abstracts away ugly code to build photo src strings */
      function buildPhotoSrc(photo) {
        var photoSrc = WizioConfig.CLOUDFRONT_DISTRO + $scope.formatKeyForEnv($scope.data.SubscriptionApartment.pubid) + '/' + photo.title + '.JPG'
        return photoSrc;
      }

      // used for formatting the subscriptionapartment pubid for the environment
      $scope.formatKeyForEnv = function(pubid) {
          return AWSFct.utilities.modifyKeyForEnvironment(pubid);
      }
    }
  ])
