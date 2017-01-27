/*
  Controller for modal for renaming media. Utilizes AWSFct to interact with S3
*/
angular.module('PhotographerApp')
    .controller('RenameMediaCtrl', [
      '$scope',
      'modalData',
      'AWSFct',
      function($scope, modalData, AWSFct){
          $scope.media = modalData;
          console.dir($scope.media);
          $scope.formData = {};

          // On submit button press in modal,
          $scope.saveNewMediaName = function saveNewMediaName(){
            AWSFct.renameMedia(
              $scope.formData.newMediaName,
              $scope.media.title,
              $scope.media.SubscriptionApartmentPubId
            )
            .then(function(response){
              return MediaFct.update.one.title(
                $scope.media,
                $scope.formData.newMediaName
              )
            })
            .catch(function(response){

            })
            // AWSFct.s3.equirectPhotos.renameFile(
            //   $scope.formData.newMediaName,
            //   $scope.media.title
            // );
          }

    }])
