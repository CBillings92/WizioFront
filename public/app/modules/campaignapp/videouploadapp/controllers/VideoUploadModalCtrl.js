angular.module('CampaignApp')
    .controller('VideoUploadModalCtrl', [
        '$scope',
        '$modalInstance',
        'SmartSearchSvc',
        'UnitResource',
        'UnitCreateSvc',
        'TokenSvc',
        'AssignmentResource',
        function($scope, $modalInstance, SmartSearchSvc, UnitResource, UnitCreateSvc, TokenSvc, AssignmentResource) {
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };


            $scope.toggleMin = function() {
                $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();
            $scope.maxDate = new Date(2020, 5, 22);

            $scope.open = function($event) {
                $scope.status.opened = true;
            };

            $scope.setDate = function(year, month, day) {
                $scope.dt = new Date(year, month, day);
                console.dir(dt);
            };

            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.status = {
                opened: false
            };

            $scope.sizeLimit = 5368709120; // 5GB in Bytes
            $scope.uploadProgress = 0;
            $scope.creds = {};
            $scope.landlord = {};
            $scope.apartment = {};
            $scope.upload = function() {
                console.dir($scope.dt.getMonth() + 1 + "/" + $scope.dt.getDate() + "/" + $scope.dt.getFullYear());
                UnitCreateSvc.parseGeocodeData($scope.apartmentAddress, $scope.apartment, function(err, parsedApartment){
                    parsedApartment.landlordInfo = $scope.landlord;
                    UnitResource.save(parsedApartment, function(data, status) {

                        //store saved apartment data to use in AssignmentResource
                        //call later
                        var finalApartmentData = data;
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
                            console.dir(userinfo);
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
                                        var updateData = {
                                            UserId: userinfo.id,
                                            ApartmentId: finalApartmentData.id,
                                            S3VideoId: uniqueFileName
                                        };
                                        console.dir(updateData);
                                        AssignmentResource.save(updateData, function(data, status){
                                            console.dir(data);
                                        });
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
