angular.module('ApplicationApp')
    .controller('ContactRepFormCtrl', [
        '$scope',
        '$modalInstance',
        '$resource',
        'modalData',
        'WizioConfig',
        function($scope, $modalInstance, $resource, modalData, WizioConfig) {
            $scope.lead = {};
            $scope.closeModal = function() {
                $modalInstance.dismiss();
            };
            $scope.submit = function() {
                $scope.lead.PropertyManagerId = modalData.PropertyManagerId;
                $scope.lead.LeaseId = modalData.id;
                $scope.lead.BrokerageId = modalData.BrokerageId;
                $scope.lead.ApartmentId = modalData.ApartmentId;
                $scope.lead.ApartmentAddress = modalData.Apartment.concatAddr;
                $scope.lead.unitNum = modalData.Apartment.unitNum;
                $resource(WizioConfig.baseAPIURL + 'lead').save($scope.lead, function(result){
                    console.dir(result);
                    $modalInstance.close('submit');
                });
            };
        }
    ]);
