angular.module('Directives')
    .directive('uploadPhotoDirv', [
        '$resource',
        'WizioConfig',
        function($resource,WizioConfig){
            return {
                restrict: 'E',
                templateUrl: 'public/app/modules/photographerapp/upload/uploadphoto.directive.view.html',
                link: function(scope, elem, attrs){
                    AWS.config.update({
                        accessKeyId: 'AKIAIPGWV5OFR73P3VLQ',
                        secretAccessKey: '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'
                    });
                    var bucket = new AWS.S3({
                        endpoint: 'cdn.wizio.co',
                        s3BucketEndpoint: true,
                        region: 'us-east-1',
                        // params: {
                        //     Bucket: 'equirect-photos'
                        // }
                    });

                    var fileChooser = document.getElementById('file-chooser');
                    var button = document.getElementById('upload-button');
                    var results = document.getElementById('results');
                    button.addEventListener('click', function() {
                        var file = fileChooser.files[0];
                        if(scope.photoTitle === null){
                            results.innerHTML = "Please enter a title for the photo";
                            return;
                        }
                        scope.pin.title = scope.photoTitle;
                        scope.pin.awsurl += scope.photoTitle;
                        if (file) {
                            results.innerHTML = '';

                            var params = {
                                Bucket: 'equirect-photos',
                                Key: scope.pin.apartmentpubid + '/' + scope.photoTitle,
                                ContentType: file.type,
                                Body: file
                            };
                            bucket.putObject(params, function(err, data) {
                                if(err){
                                    results.innerHTML = "ERROR";
                                } else {
                                    $resource(WizioConfig.baseAPIURL + 'media')
                                        .save(scope.pin, function(response){
                                            alert('finished');
                                            alert(response);
                                            results.innerHTML = 'UPLOADED, PLEASE PROCEED AT BEING AWESOME';
                                        });

                                    // scope.$emit('doneUploadingPhoto', 'OK')
                                }
                                results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
                            });
                        } else {
                            results.innerHTML = 'Nothing to upload.';
                            return;
                        }
                    }, false);
                }
            };
        }
    ]);
