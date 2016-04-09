angular.module('ApplicationApp')
    .controller('ContactRepFormCtrl', [
        '$scope',
        '$uibModalInstance',
        '$resource',
        'modalData',
        'WizioConfig',
        function($scope, $uibModalInstance, $resource, modalData, WizioConfig) {
            $scope.lead = {};
            $scope.closeModal = function() {
                $uibModalInstance.dismiss();
            };
            $scope.submit = function() {
                $scope.lead.PropertyManagerId = modalData.PropertyManagerId;
                $scope.lead.LeaseId = modalData.id;
                $scope.lead.BrokerageId = modalData.BrokerageId;
                $scope.lead.ApartmentId = modalData.ApartmentId;
                $scope.lead.ApartmentAddress = modalData.Apartment.concatAddr;
                $scope.lead.unitNum = modalData.Apartment.unitNum;
                $resource(WizioConfig.baseAPIURL + 'lead').save($scope.lead, function(result){
                    $uibModalInstance.close('submit');
                });
            };
        }
    ]);
