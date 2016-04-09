angular.module('UnitApp')
    .controller('ShareListingsCtrl', [
        '$scope',
        '$uibModalInstance',
        'TokenSvc',
        'modalData',
        'lodash',
        'BrokerageModel',
        function($scope, $uibModalInstance, TokenSvc, modalData, lodash, BrokerageModel){
            $scope.brokerages = modalData;
            $scope.selectBrokerage = function(index){
                $scope.brokerages[index].selected = !$scope.brokerages[index].selected;
                return;
            };
            $scope.submit = function submit() {
                var user = TokenSvc.decode();
                var PropertyManagerId = user.PropertyManager[0].id;
                var finalArray = [];
                lodash.forEach($scope.brokerages, function(brokerage){
                    if(brokerage.selected){
                        finalArray.push({
                            PropertyManagerId: PropertyManagerId,
                            BrokerageId: brokerage.id
                        });
                    }
                });
                BrokerageModel.savePartners(finalArray)
                    .then(function(response){

                    });
                return;
            };
        }
    ]);
