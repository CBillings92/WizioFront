/*
  Controller for modal for renaming media. Utilizes AWSFct to interact with S3
*/
angular.module('PhotographerApp').controller('RenameMediaCtrl', [
    '$scope',
    'modalData',
    'AWSFct',
    'MediaFct',
    '$uibModalInstance',
    function($scope, modalData, AWSFct, MediaFct, $uibModalInstance) {
        $scope.media = modalData.photoToBeRenamed;
        $scope.allPhotos = modalData.allPhotos;
        $scope.formData = {};

        $scope.closeModal = function() {
            $uibModalInstance.close('exit');
        };

        /**
         * Iterate over all photos and check their titles to see if there is any Naming
         * collission with the new photo title
         * @param  {String} newName   [new photo title]
         * @param  {Array} allPhotos [array of all photos associated with tour]
         * @return {Boolean}           boolean
         */
        function checkNameCollisions(newName, allPhotos) {
          for (var i = 0; i < allPhotos.length; i++) {
            if (allPhotos[i].title === newName) {
              return true;
            }
          }
          return false;
        }

        // On submit button press in modal,
        $scope.saveNewMediaName = function saveNewMediaName() {
          var nameCollision = checkNameCollisions($scope.formData.newMediaName, $scope.allPhotos);

          if (nameCollision) {
            alert('This name is already being used by another photo. Please do not name multiple photo with the same name.')
            $scope.formData.newMediaName = ''
            return;
          } else {
            if (!$scope.media.id) {
              $scope.media.title = $scope.formData.newMediaName;
              var returnObj = {
                message: 'New Media',
                Media: $scope.media
              };
              $uibModalInstance.close(returnObj);
              return;
            }
            AWSFct.s3.equirectPhotos.renameFile($scope.formData.newMediaName, $scope.media.title, $scope.media.SubscriptionApartmentPubId).then(function(response) {
              return MediaFct.update.one.title($scope.media, $scope.formData.newMediaName)
            }).then(function(response) {
              $uibModalInstance.close(response);
            }).catch(function(response) {})
          }
        }

    }
])
