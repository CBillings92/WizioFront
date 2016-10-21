angular.module('PhotographerApp')
    .controller('UploadPhotoModalCtrl', [
        '$scope',
        'ModalSvc',
        '$uibModalInstance',
        function($scope, ModalSvc, $uibModalInstance) {
            $scope.disabled = true;
            $scope.ok = function(){
                return $uibModalInstance.close('ok');
            }

            // $scope.$on('doneUploadingPhoto', function(event, data){
            //     $scope.disabled = false;
            // })
            // AWS.config.region = 'us-east-1';
            // var bucket = new AWS.S3({
            //     endpoint: 'http://cdn.wizio.co',
            //     s3BucketEndpoint: true,
            //     region: 'us-east-1',
            //     // params: {
            //     //     Bucket: 'equirect-photos'
            //     // }
            // });
            // var fileChooser = document.getElementById('file-chooser');
            // var button = document.getElementById('upload-button');
            // var results = document.getElementById('results');
            // console.dir(document);
            // button.addEventListener('click', function() {
            //     var file = fileChooser.files[0];
            //     if (file) {
            //         results.innerHTML = '';
            //
            //         var params = {
            //             Bucket: 'equirect-photos',
            //             Key: file.name,
            //             ContentType: file.type,
            //             Body: file
            //         };
            //         bucket.putObject(params, function(err, data) {
            //             results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
            //         });
            //     } else {
            //         results.innerHTML = 'Nothing to upload.';
            //     }
            // }, false);
        }
    ])
