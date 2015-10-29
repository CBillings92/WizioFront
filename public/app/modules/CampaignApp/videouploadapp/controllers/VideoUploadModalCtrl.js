angular.module('CampaignApp')
.controller('VideoUploadModalCtrl', [
    '$scope',
    '$modalInstance',
    'SmartSearchSvc',
    'UnitResource',
    'UnitCreateSvc',
    'UserResource',
    'TokenSvc',
    function($scope, $modalInstance, SmartSearchSvc, UnitResource, UnitCreateSvc, UserResource, TokenSvc){
        $scope.getLocation = function(val){
            return SmartSearchSvc.smartSearch(val);
        };
        var apartmentAddress = $scope.apartmentAddress;
        $scope.sizeLimit = 5368709120; // 5GB in Bytes
        $scope.uploadProgress = 0;
        $scope.creds = {};
        $scope.upload = function() {
            UnitCreateSvc.parseGeocodeData(apartmentAddress, null, function(err, parsedApartment){
                UnitResource.save(parsedApartment, function(data, status) {
                    AWS.config.update({
                        accessKeyId: 'AKIAIPGWV5OFR73P3VLQ',
                        secretAccessKey: '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'
                    });
                    AWS.config.region = 'us-east-1';
                    var bucket = new AWS.S3({
                        params: {
                            Bucket:"wiziouservideos"
                        }
                    });

                    if ($scope.file) {
                        // Perform File Size Check First

                        var fileSize = Math.round(parseInt($scope.file.size));
                        if (fileSize > $scope.sizeLimit) {
                            toastr.error('Sorry, your attachment is too big. <br/> Maximum ' + $scope.fileSizeLabel() + ' file attachment allowed', 'File Too Large');
                            return false;
                        }
                        // Prepend Unique String To Prevent Overwrites
                        var userinfo = TokenSvc.decode();
                        var apartment = $scope.apartmentAddress;
                        apartment = apartment.replace(/[^0-9a-zA-Z]/g, '');
                        var uniqueFileName = userinfo.email + '-' + apartment;

                        console.dir(apartment);
                        var params = {
                            Key: uniqueFileName,
                            ContentType: $scope.file.type,
                            Body: $scope.file,
                            ServerSideEncryption: 'AES256'
                        };
                        bucket.putObject(params, function(err, data) {
                                if (err) {
                                    toastr.error(err.message, err.code);
                                    $modalInstance.dismiss();
                                    return false;
                                } else {
                                    // Upload Successfully Finished
                                    toastr.success('File Uploaded Successfully', 'Done');

                                    // Reset The Progress Bar
                                    setTimeout(function() {
                                        $scope.uploadProgress = 0;
                                        $scope.$digest();
                                    }, 10000);
                                    $modalInstance.close('ok');
                                }
                            })
                            .on('httpUploadProgress', function(progress) {
                                $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
                                $scope.$digest();
                            });
                    } else {
                        // No File Selected
                        toastr.error('Please select a file to upload');
                    }
                });
            });
        };

        $scope.fileSizeLabel = function() {
            // Convert Bytes To MB
            return Math.round($scope.sizeLimit / (1073741824)) + 'GB';
        };

        $scope.uniqueString = function() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 8; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };
    }
]);
