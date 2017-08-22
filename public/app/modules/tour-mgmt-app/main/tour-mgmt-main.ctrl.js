angular.module('TourMgmtApp')
  .controller('TourMgmtMainCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    'AWSFct',
    'LoadingSpinnerFct',
    'TourMgmtFct',
    'WizioConfig',
    'ModalBuilderFct',
    function($scope, $state, $stateParams, AWSFct, LoadingSpinnerFct, TourMgmtFct, WizioConfig, ModalBuilderFct) {
      $scope.addFloorPlanFlag = false;
      $scope.changesMade = false;
      $scope.appInitialized = false;
      $scope.data;
      $scope.cdnEndPoint = WizioConfig.CLOUDFRONT_DISTRO;
      $scope.currentPinAction = 'dropPinChoosePhoto' //or dropPinForSpecificPhoto or movePin

      /* Kick off loading spinner for initialization */
      LoadingSpinnerFct.show('TourManagementMainLoad');

      /* Initialize Tour Mgmt App */
      TourMgmtFct.init.mainApp()
      .then(function(response){
        $scope.appInitialized = true;
        /* Assign formatted data to scope */
        $scope.data = response.payload;
        $scope.selectPhotoForModification($scope.data.TourMedia.photos[0]);
        /* Hide loading spinner */
        LoadingSpinnerFct.hide('TourManagementMainLoad');

      })
      .catch(function(err){
        console.dir(err);
        alert('Could not load data for tour management at this time. Please try again later.')
        LoadingSpinnerFct.hide('TourManagementMainLoad');
        $state.go('Account.Dashboard');
      })

      $scope.selectPhotoForModification = function(photo) {
        if ($scope.photoForModification) {
          $scope.photoForModification.isSelected = false;
        }
        if(photo.isNew) {
          var elem = document.getElementById('photoForModification');
          TourMgmtFct.newPhotos.preview([photo], elem)
          $scope.photoForModification = photo;

        } else {
          photo.src = buildPhotoSrc(photo);
          $scope.photoForModification = photo;
        }
        $scope.photoForModification.isSelected = true;
      }

      // Rename media
      function renamePhoto() {
          $scope.photoForModification.SubscriptionApartmentPubId = $scope.data.SubscriptionApartment.pubid;
          TourMgmtFct.photo.rename($scope.photoForModification).then(function(response) {
              if (response === 'exit') {
                  return;
              } else {
                  $scope.photoForModification = response.Photo;
                  $scope.changesMade = true;
                  ModalBuilderFct.buildSimpleModal("", "OK", "Success", 'Photo renamed successfully.').then(function(result) {
                      return;
                  });
              }
          });
      }

      $scope.addPhotosForUpload = function() {
        document.getElementById('uploadMultiplePhotosInputButton').onchange = function() {
          $scope.files = [];

          var elementId = 'imgPreview';
          var previewElement;
          var fileName;

          $scope.data.TourMedia.photos = TourMgmtFct.newPhotos.add(this.files, $scope.data)
          // Need this because we're running angular inside javascript function.
          // Creates the HTML elements for the new photos in ng-repeat
          $scope.$apply();
          TourMgmtFct.newPhotos.preview($scope.data.TourMedia.photos, false);
          $scope.changesMade = true;
          $scope.$apply();
        }
        $('#uploadMultiplePhotosInputButton').trigger('click');
      }

      $scope.renamePhoto = renamePhoto;
      /* Abstracts away ugly code to build photo src strings */
      function buildPhotoSrc(photo) {
        var photoSrc = WizioConfig.CLOUDFRONT_DISTRO + $scope.formatKeyForEnv($scope.data.SubscriptionApartment.pubid) + '/' + photo.title + '.JPG'
        return photoSrc;
      }

      $scope.addFloorPlan = function() {
      }

      $scope.addFloorPlan = function() {
        document.getElementById('uploadFloorPlanInputButton').onchange = function(){
          $scope.data.TourMedia.floorplan = TourMgmtFct.floorplan.buildFloorPlanObj(this.files[0]);
          $scope.$apply();
          var elem = document.getElementById('floorplanImage');
          console.dir(elem);
          TourMgmtFct.newPhotos.preview([$scope.data.TourMedia.floorplan], elem);
          $scope.changesMade = true;
          $scope.$apply();
        }
        $('#uploadFloorPlanInputButton').trigger('click');
      }

      /**
       * On order change fired when angular sortable view is modified.
       * @param  {[type]} item      [description]
       * @param  {[type]} partFrom  [description]
       * @param  {[type]} partTo    [description]
       * @param  {[type]} indexFrom [description]
       * @param  {[type]} indexTo   [description]
       * @return {[type]}           [description]
       */
      $scope.onOrderChange = function(item, partFrom, partTo, indexFrom, indexTo) {
          $scope.$apply();
          TourMgmtFct.newPhotos.preview($scope.data.TourMedia.photos, false)
          $scope.changesMade = true;
      }

      $scope.dropPinForSelectedPhoto = function() {
        $scope.currentPinAction = 'dropPinForSelectedPhoto';
      }

      $scope.deletePinForSelectedPhoto = function(photo) {

      }

      $scope.movePinForSelectedPhoto = function(photo) {

      }

      $scope.makePinAction = function(ev){
        console.dir(ev);
        console.dir($scope.currentPinAction);
        if ($scope.currentPinAction === 'dropPinForSelectedPhoto') {
            var pinCoords = TourMgmtFct.calculatePinXandY(ev);
            $scope.photoForModification.x = pinCoords.x;
            $scope.photoForModification.y = pinCoords.y
            $scope.changesMade = true;
        }
      }
      // used for formatting the subscriptionapartment pubid for the environment
      $scope.formatKeyForEnv = function(pubid) {
          return AWSFct.utilities.modifyKeyForEnvironment(pubid);
      }
    }
  ])
