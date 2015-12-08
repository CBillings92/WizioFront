angular.module('LandingPageApp')
    .controller('LandingPageCtrl', [
        '$scope',
        '$http',
        '$state',
        'UserRegistrationSvc',
        'ApartmentSearchSvc',
        'SmartSearchSvc',
        'UnitCreateSvc',
        function($scope, $http, $state, UserRegistrationSvc, ApartmentSearchSvc, SmartSearchSvc, UnitCreateSvc) {

            $scope.radioModel = {
                realtor: false,
                tenant: true,
                broker: false
            };
            $scope.filters = {
                beds: null,
                baths: null,
                minPrice: null,
                maxPrice: null
            }
            $scope.neighborhoods = [
                'Boston',
                'Allston',
                'Brighton',
                'Jamaica Plain',
                'Back Bay',
                'Beacon Hill',
            ];

            $scope.localeButtonClick = function(neighborhood){
                //SECOND ARG IS UNIT NUM
                ApartmentSearchSvc.searchApartment(neighborhood, null, function(err, data){
                    return $state.go('Unit.Display');
                });
            };

            //smart search functionality
            $scope.goToUploadPage = function() {
                $state.go('Campaign.VideoUpload.Main');
            };

            $scope.search = function() {
                //service in shared/services
                //pass in search string
                //SECOND ARG UNIT NUM
                //THIRD ARG FILTERS
                ApartmentSearchSvc.searchApartment($scope.searchString, null, $scope.filters, function(err, data){
                    return $state.go('Unit.Display');
                });

            };
            //smart search/typeahead functionality
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };
            $scope.registerUser = function() {
                var user = {
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    password: $scope.password,
                    accountType: "local",
                    userType: 1
                };
                UserRegistrationSvc.saveUser(user, function(data) {
                    $state.go('Account.Dashboard.Main');
                });
            };

            //All of chris' stuff....
            $scope.sizeLimit = 5368709120; // 5GB in Bytes
            $scope.uploadProgress = 0;
            $scope.creds = {};
            $scope.upload = function() {
                AWS.config.update({
                    accessKeyId: 'AKIAIPGWV5OFR73P3VLQ',
                    secretAccessKey: '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'
                });
                AWS.config.region = 'us-east-1';
                var bucket = new AWS.S3({
                    params: {
                        Bucket: "wiziouservideos"
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
                    var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;

                    var params = {
                        Key: uniqueFileName,
                        ContentType: $scope.file.type,
                        Body: $scope.file,
                        ServerSideEncryption: 'AES256'
                    };

                    bucket.putObject(params, function(err, data) {
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
