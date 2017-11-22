angular.module('TourMgmtApp')
  .controller('TourMgmtMainCtrl', [
    '$scope',
    '$state',
    '$stateParams',
    '$q',
    'AWSFct',
    'LoadingSpinnerFct',
    'TourMgmtFct',
    'WizioConfig',
    'ModalBuilderFct',
    function($scope, $state, $stateParams, $q, AWSFct, LoadingSpinnerFct, TourMgmtFct, WizioConfig, ModalBuilderFct) {
      LoadingSpinnerFct.hide('savingChangesSpinner');
      /**
       * tracks when any changes have been made to the tour. Used to display the
       * Save Changes button on the tour
       * @type {Boolean}
       */
      $scope.changesMade = false;
      /**
       * Used to set specific UI elements once the app is finally initialized with
       * formatted data
       * @type {Boolean}
       */
      $scope.appInitialized = false;
      /**
       * Set a null data object. Will contain app data
       * @type {Object}
       */
      $scope.data = {};
      /**
       * Shorthand for the Wizio CDN Endpoint
       * @type {String}
       */
      $scope.cdnEndPoint = WizioConfig.CLOUDFRONT_DISTRO;
      /**
       * Dictates pin dropping functionality as a flag that's set later in app.
       * @type {String}
       */
      $scope.currentPinAction = 'dropPinChoosePhoto'
      /**
       * Flag for modifying UI when Save Changes is initiated
       * @type {Boolean}
       */
      $scope.saveChangesInitiated = false;

      /**
       * Flag for modifying UI. Tells UI whether address is being modified or not.
       * @type {Boolean}
       */
      $scope.modifyAddressFlag = false;

      /* Kick off loading spinner for initialization */
      LoadingSpinnerFct.show('TourManagementMainLoad');

      /** Initialize
       * Initialize tour management application. Pass in $stateParams. $stateParams
       * needs to be passed in from the Controller instead of accessing it
       * directly on the Factory due to the order in which files are loaded in
       * Angular. $stateParams may not be passed properly to factory files.
       */
      TourMgmtFct.init.mainApp($stateParams)
      .then(function(response){
        $scope.appInitialized = true;
        /* Assign formatted data to scope */
        $scope.data = response.payload;
        /* Set first photo in array as the default selected photo */
        if ($scope.data.TourMedia.photos.length > 0) {
          $scope.selectPhotoForModification($scope.data.TourMedia.photos[0]);
        }
        /* Hide loading spinner */
        LoadingSpinnerFct.hide('TourManagementMainLoad');
      })
      .catch(function(err){
        console.dir(err);
        alert('Could not load data for tour management at this time. Please try again later.')
        LoadingSpinnerFct.hide('TourManagementMainLoad');
        $state.go('Account.Dashboard');
      })

      /**
       * Selection of a photo to be modified.
       * @param  {Object} photo [standard photo object]
       * @return {null}       []
       */
      $scope.selectPhotoForModification = function(photo) {
        var TourMedia = $scope.data.TourMedia;
        var atlasData;
        var photoTitle = photo.title;
        /* Check if there is already a photoForModification (there is none on app init) */
        deselectPhotoForModificiation(photo);

        photo.isSelected = true;
        bulidPhotoURL(photo)
        .then(function(photoURL){
          var atlasData = {
            htmlElemId: 'pano',
            photoData: {
              imageUrls: [photoURL],
              navpoints: {},
              title: photo.title
            }
          }
          atlasData.photoData.navpoints[photo.title] = [];
          $scope.photoForModification = photo;
          wizio.init('pano', atlasData.photoData, {}, function(response){
            LoadingSpinnerFct.hide('vrPlayerLoader');
            return;
          });
        })
      }

      function bulidPhotoURL(photo) {
        return $q(function(resolve, reject){
          if (photo.file) {
            TourMgmtFct.newPhotos.buildImageDataURL(photo.file)
            .then(function(url){
              return resolve(url)
            })
            .catch(function(err){
              return reject(err)
            })
          } else {
            var photoURL = buildPhotoSrc(photo);
            return resolve(photoURL)
          }

        })
      }

      function deselectPhotoForModificiation(photo) {
        var photos = $scope.data.TourMedia.photos
          for (var i = 0; i < photos.length; i++) {
              photos[i].isSelected = false;
          }
        return;
      }

      // Rename media FIXME - Needs new logic. Currently works on old logic
      function renamePhoto() {
          $scope.photoForModification.SubscriptionApartmentPubId = $scope.data.SubscriptionApartment.pubid;
          TourMgmtFct.photo.rename($scope.photoForModification, $scope.data.TourMedia.photos).then(function(response) {
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

      /**
       * Gets files from filelist for photos to upload. previews photos
       * Sets on onchange event on the file input. When the file input receives files
       * function fires
       * $scope.$apply() needed to update scope within JS/Jquery function
       * @return {[type]} [description]
       */
      $scope.addPhotosForUpload = function() {
        var elem = document.getElementById('uploadMultiplePhotosInputButton');
        elem.disabled = false;
        elem.onchange = function() {
          var TourMedia = $scope.data.TourMedia;
          var Apartment = $scope.data.Apartment;
          var SubscriptionApartment = $scope.data.SubscriptionApartment;
          $scope.data.TourMedia.photos = TourMgmtFct.newPhotos.add(this.files, TourMedia, SubscriptionApartment, Apartment)
          // Need this because we're running angular inside javascript function.
          // Creates the HTML elements for the new photos in ng-repeat
          $scope.$apply();
          TourMgmtFct.newPhotos.preview(TourMedia.photos, false);
          $scope.changesMade = true;
          $scope.$apply();
        }

        $('#uploadMultiplePhotosInputButton').trigger('click');
        elem.disabled = true;
      }

      $scope.renamePhoto = renamePhoto;

      /* Abstracts away ugly code to build photo src strings */
      function buildPhotoSrc(photo) {
        var photoSrc = WizioConfig.CLOUDFRONT_DISTRO + $scope.data.SubscriptionApartment.pubid + '/' + photo.title + '.JPG'
        return photoSrc;
      }

      /**
       * Adds a floorplan to the current tour. Triggers a hidden file input and
       * applies an on change function to it. On change function fires that
       * builds photo object around the floorplan file and previews it for user
       * @return {[type]} [description]
       */
      $scope.addFloorPlan = function() {
        var elem = document.getElementById('uploadFloorPlanInputButton');
        elem.disabled = false;
        elem.onchange = function(){
          $scope.data.TourMedia.floorplan = TourMgmtFct.floorplan.buildFloorPlanObj(this.files[0], $scope.data);
          $scope.data.Apartment.Floor_Plan = $scope.data.TourMedia.floorplan.awsurl;
          $scope.$apply();
          var elem = document.getElementById('floorplanImage');
          TourMgmtFct.newPhotos.preview([$scope.data.TourMedia.floorplan], elem);
          $scope.changesMade = true;
          $scope.$apply();
          $scope.data.TourMedia.floorplan.isNew = 1;
        }
        // manually trigger hidden file input
        $('#uploadFloorPlanInputButton').trigger('click');
        elem.disabled = true;
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
          for (var i = 0; i < $scope.data.TourMedia.photos.length; i++) {
              $scope.data.TourMedia.photos[i].order = i;
          }
          $scope.changesMade = true;
      }

      /**
       * Sets the flag for the current type of pin movement
       * @return {undefined} []
       */
      $scope.dropPinForSelectedPhoto = function() {
        $scope.currentPinAction = 'dropPinForSelectedPhoto';
        return;
      }

      /**
       * Deletes a pin by setting its x and y coords to null
       * @return {undefined}       []
       */
      $scope.deletePinForSelectedPhoto = function() {
        $scope.photoForModification.x = null;
        $scope.photoForModification.y = null;
        return;
      }

      /**
       * Sets the flag for the current type of pin movement
       * @return {undefined} []
       */
      $scope.movePinForSelectedPhoto = function(photo) {
        $scope.currentPinAction = 'dropPinForSelectedPhoto'
        return;
      }

      /**
       * Handles creating a pin. Gets X and Y coords from mouse event object
       * @param  {Object} ev [javascript mouse event object]
       * @return {null}    []
       */
      $scope.makePinAction = function(ev){
        if ($scope.currentPinAction === 'dropPinForSelectedPhoto') {
            var pinCoords = TourMgmtFct.calculatePinXandY(ev);
            $scope.photoForModification.x = pinCoords.x;
            $scope.photoForModification.y = pinCoords.y
            $scope.changesMade = true;
            return;
        }
      }

      /**
       * Persist any changes to the database
       * @return {undefined} []
       */
      $scope.saveChanges = function() {
        LoadingSpinnerFct.show('savingChangesSpinner');
        $scope.saveChangesInitiated = true;
        TourMgmtFct.saveChanges($scope.data)
        .then(function(response){
          LoadingSpinnerFct.hide('savingChangesSpinner');
          ModalBuilderFct.buildSimpleModal(
              "",
              "OK",
              "Success",
              'Your tour has been saved.'
          ).then(function(result) {
            TourMgmtFct.rerouteAfterSave();
          });
        })
      }

      /**
       * Delete photo
       * @return {undefined}           [undefine]
       */
      $scope.deletePhoto = function () {
        if ($scope.photoForModification.isNew) {
          for (var i = 0; i < $scope.data.TourMedia.photos.length; i++) {
            if ($scope.data.TourMedia.photos[i].isSelected) {
              $scope.data.TourMedia.photos.splice(i, 1);
              $scope.selectPhotoForModification($scope.data.TourMedia.photos[i]);
            } else {
              return;
            }
          }
          return;
        } else {
          TourMgmtFct.photo.delete($scope.photoForModification)
          .then(function(response){
            for (var i = 0; i < $scope.data.TourMedia.photos.length; i++) {
              if ($scope.data.TourMedia.photos[i].isSelected) {
                $scope.data.TourMedia.photos.splice(i, 1);
                $scope.selectPhotoForModification($scope.data.TourMedia.photos[i]);
              }
            }
            return;
          })
        }
      }

      /**
       * Used for flipping modifyAddressFlag bit from UI
       * @return {Boolean} [description]
       */
      $scope.flipModifyAddressFlag = function(){
        $scope.modifyAddressFlag = !$scope.modifyAddressFlag;
        return $scope.modifyAddressFlag
      }

    }
  ])
