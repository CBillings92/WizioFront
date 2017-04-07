angular.module('PhotographerApp')
    .controller('RemovePinModalCtrl', [
        '$scope',
        'modalData',
        '$uibModalInstance',
        function ($scope, modalData, $uibModalInstance) {
            $scope.buttonClick = function(action){
                return $uibModalInstance.close(action);
            };
            console.dir(modalData);
            $scope.previewPhoto = previewPhoto;

            function previewPhoto() {
                return $q(function(resolve, reject) {
                    var file = modalData;
                    var reader = new FileReader();

                    reader.addEventListener("load", function() {
                        document.getElementById('imgPreview').src = reader.result;
                    }, false);

                    if (file) {
                        reader.readAsDataURL(file);
                    }
                })
            }
        }
    ]);
