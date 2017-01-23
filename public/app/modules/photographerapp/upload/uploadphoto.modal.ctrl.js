angular.module('PhotographerApp')
    .controller('UploadPhotoModalCtrl', [
        '$scope',
        'ModalSvc',
        '$uibModalInstance',
        'modalData',
        function($scope, ModalSvc, $uibModalInstance, modalData) {
            $scope.disabled = false;
            $scope.photoTitle = null;
            $scope.pin = modalData;
            $scope.previewPhotoImage = false;
            $scope.photo = "";
            $scope.uploaded=false;
            // $scope.test;

            $scope.previewPhoto = function(photo) {
              var preview = document.getElementById('imgPreview');
              var file    = document.querySelector('input[type=file]').files[0];
              var reader  = new FileReader();

              reader.addEventListener("load", function () {
                preview.src = reader.result;
              }, false);

              if (file) {
                reader.readAsDataURL(file);
              }
            }

            $scope.ok = function (result) {
              data = {
                message: 'cancel'
              };
              return $uibModalInstance.close(data);
            }

            $scope.$on('Upload-Finished', function(event, data){

              data = {
                photoTitle: $scope.photoTitle,
                message: 'success'
              };

              return $uibModalInstance.close(data);
            });

        }


    ]);
