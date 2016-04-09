angular.module('UnitApp')
    .controller('UpdateInfoModalCtrl', [
        '$scope',
        '$resource',
        'modalData',
        '$uibModalInstance',
        'WizioConfig',
        'SmartSearchSvc',
        'ApartmentModel',
        'UnitCreateSvc',
        function($scope, $resource, modalData, $uibModalInstance, WizioConfig, SmartSearchSvc, ApartmentModel, UnitCreateSvc) {
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val, 'Staging-ApartmentClaims');
            };
            $scope.modalData = modalData;
            $scope.newData = {};

            function submitAddressChanges() {
                var newApartmentWithGeocode = {};
                $scope.newData.ApartmentId = modalData.ApartmentId;
                var newInstance = ApartmentModel.build($scope.newData);
                UnitCreateSvc.getGeocodeData(newInstance.apartmentData.concatAddr, function(err, success) {
                    newApartmentWithGeocode = UnitCreateSvc.lodashParseAPIData(success, null);
                    newApartmentWithGeocode.ApartmentId = $scope.newData.ApartmentId;
                    $resource(WizioConfig.baseAPIURL + 'apartment', null, {
                        update: {
                            method: 'PUT'
                        }
                    }).update(newApartmentWithGeocode, function(response) {
                        newApartmentWithGeocode.id = newApartmentWithGeocode.ApartmentId;
                        return $uibModalInstance.close(newApartmentWithGeocode);
                    });
                    return;
                });
            }
            function submitUnitNumChanges(){
                $scope.newData.ApartmentId = modalData.ApartmentId;
                $resource(WizioConfig.baseAPIURL + 'apartment', null, {
                    update: {
                        method: 'PUT'
                    }
                }).update($scope.newData, function(response) {
                    return $uibModalInstance.close($scope.newData.unitNum);
                });
            }
            $scope.submitAddressChanges = submitAddressChanges;
            $scope.submitUnitNumChanges = submitUnitNumChanges;
        }
    ]);
