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
        $scope.media = modalData;
        $scope.formData = {};

        $scope.closeModal = function() {
            $uibModalInstance.close('exit');
        };

        // On submit button press in modal,
        $scope.saveNewMediaName = function saveNewMediaName() {
            if ($scope.media.id) {
                AWSFct.s3.equirectPhotos.renameFile($scope.formData.newMediaName, $scope.media.title, $scope.media.SubscriptionApartmentPubId).then(function(response) {
                  return MediaFct.update.one.title($scope.media, $scope.formData.newMediaName)
                }).then(function(response) {
                  $uibModalInstance.close(response);
                }).catch(function(response) {})
            } else {
              $scope.media.title = $scope.formData.newMediaName;
              var returnObj = {
                message: 'New Media',
                Media: $scope.media
              };
              $uibModalInstance.close(returnObj);
              return;
            }
        }

    }
])
