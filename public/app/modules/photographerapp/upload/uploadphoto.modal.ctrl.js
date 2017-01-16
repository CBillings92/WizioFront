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

            $scope.$on('Upload-Finished', function(event, data){
              alert('upload done');

              data = {
                photoTitle: data.photoTitle
              };

              return $uibModalInstance.close(data);
            });

        }


    ]);
