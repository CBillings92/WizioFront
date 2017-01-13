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


            $scope.ok = function(result){

                if (document.getElementById("file-chooser").value == "") {
                    alert("Please upload a photo before continuing");
                    return;
                };

                var data = {
                    result: result,
                    photoTitle: $scope.photoTitle
                };


                return $uibModalInstance.close(data);
            };
        }


    ]);
