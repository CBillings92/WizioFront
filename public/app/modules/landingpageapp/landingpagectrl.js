angular.module('LandingPageApp')
    .controller('LandingPageCtrl', [
        '$scope',
        '$http',
        '$state',
        'UserRegistrationSvc',
        'ApartmentSearchSvc',
        function($scope, $http, $state, UserRegistrationSvc, ApartmentSearchSvc) {
            $scope.radioModel = {
                realtor: false,
                tenant: true,
                broker: false
            };
            $scope.search = function() {
                ApartmentSearchSvc.search($scope.searchString);
                $state.go('AptDisplay');
            };
            $scope.getLocation = function(val) {
                return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
                    headers: {
                        searchCheck: true
                    },
                    params: {
                        address: val,
                        sensor: false,
                        components: "state:MA"
                    }
                }).then(function(response) {
                    console.dir(response);
                    return response.data.results.map(function(item) {
                        return item.formatted_address;
                    });
                });
            };
            $scope.registerUser = function() {

                var user = {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    password: $scope.password
                };
                console.dir($scope.radioModel);
                if ($scope.radioModel === "tenant") {
                    user.userType = 1;
                } else if ($scope.radioModel === "realtor") {
                    user.userType = 2;
                } else if ($scope.radioModel === "broker") {
                    user.userType = 3;
                }

                UserRegistrationSvc.saveUser(user);
            };
            $scope.sizeLimit = 5368709120; // 5GB in Bytes
            $scope.uploadProgress = 0;
            $scope.creds = {};
            $scope.upload = function() {
                console.log("The upload function gets hit");
                AWS.config.update({
                    accessKeyId: 'AKIAIPGWV5OFR73P3VLQ',
                    secretAccessKey: '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'
                });
                console.log("Still running 1a");
                AWS.config.region = 'us-east-1';
                var bucket = new AWS.S3({
                    params: {
                        Bucket: "wiziouservideos"
                    }
                });
                console.log("Still running 1b");
                console.dir(bucket);

                console.log("scope.file:");
                console.log($scope.file);
                console.dir($scope.file);

                if ($scope.file) {
                    // Perform File Size Check First
                    var fileSize = Math.round(parseInt($scope.file.size));
                    console.log("Still running 2");
                    if (fileSize > $scope.sizeLimit) {
                        toastr.error('Sorry, your attachment is too big. <br/> Maximum ' + $scope.fileSizeLabel() + ' file attachment allowed', 'File Too Large');
                        return false;
                    }
                    // Prepend Unique String To Prevent Overwrites
                    var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;
                    console.log("Still running 3");
                    console.log(uniqueFileName);

                    var params = {
                        Key: uniqueFileName,
                        ContentType: $scope.file.type,
                        Body: $scope.file,
                        ServerSideEncryption: 'AES256'
                    };
                    console.log("Still running 4 Here are params:");
                    console.dir(params);

                    bucket.putObject(params, function(err, data) {
                        console.log("Inside put objects function");
                            if (err) {
                                toastr.error(err.message, err.code);
                                return false;
                            } else {
                                // Upload Successfully Finished
                                toastr.success('File Uploaded Successfully', 'Done');

                                // Reset The Progress Bar
                                setTimeout(function() {
                                    $scope.uploadProgress = 0;
                                    $scope.$digest();
                                }, 10000);
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
            };

            $scope.fileSizeLabel = function() {
                // Convert Bytes To MB
                return Math.round($scope.sizeLimit / (1024 * 1024 * 1024)) + 'GB';
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
