angular.module('UnitApp')
    .controller('ShareListingsCtrl', [
        '$scope',
        '$modalInstance',
        'TokenSvc',
        'modalData',
        'lodash',
        'BrokerageModel',
        function($scope, $modalInstance, TokenSvc, modalData, lodash, BrokerageModel){
            $scope.brokerages = modalData;
            $scope.selectBrokerage = function(index){
                $scope.brokerages[index].selected = !$scope.brokerages[index].selected;
                console.dir($scope.brokerages);
                return;
            };
            $scope.submit = function submit() {
                var user = TokenSvc.decode();
                var PropertyManagerId = user.PropertyManager[0].id;
                var finalArray = [];
                lodash.forEach($scope.brokerages, function(brokerage){
                    console.dir(brokerage);
                    if(brokerage.selected){
                        finalArray.push({
                            PropertyManagerId: PropertyManagerId,
                            BrokerageId: brokerage.id
                        });
                    }
                });
                console.dir(finalArray);
                BrokerageModel.savePartners(finalArray)
                    .then(function(response){

                    });
                return;
            };
        }
    ]);
