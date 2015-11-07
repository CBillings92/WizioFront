angular.module('AdminPanelApp')
    .controller('AdminCreateAssignmentCtrl', [
        '$scope',
        'SmartSearchSvc',
        'UnitResource',
        'UnitCreateSvc',
        'TokenSvc',
        'AssignmentResource',
        function($scope, SmartSearchSvc, UnitResource, UnitCreateSvc, TokenSvc, AssignmentResource) {
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
            $scope.assignment = {};
            $scope.upload = function() {
                //console.dir($scope.dt.getMonth() + 1 + "/" + $scope.dt.getDate() + "/" + $scope.dt.getFullYear());
                UnitCreateSvc.parseGeocodeData($scope.apartmentAddress, $scope.apartment, function(err, parsedApartment) {
                    parsedApartment.landlordInfo = $scope.landlord;
                    UnitResource.save(parsedApartment, function(data, status) {
                        var userinfo = TokenSvc.decode();
                        var updateData = {
                            UserId: userinfo.id,
                            ApartmentId: data.id,
                            S3VideoId: $scope.assignment.youtubeId,
                            youtubeId: $scope.assignment.youtubeId
                        };
                        console.dir(updateData);
                        AssignmentResource.save(updateData, function(data, status) {
                            console.dir(data);
                        });

                    });
                });
            };
        }
    ]);
