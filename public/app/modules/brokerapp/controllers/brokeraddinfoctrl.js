angular.module('BrokerApp')
.controller('BrokerAddInfoCtrl', [
    '$scope',
    'brokerResource',
    function($scope, brokerResource){
        $scope.createBrokerInfo = function(){
            var brokerInfo = {
                businessName: $scope.businessName,
                licenseID: $scope.licenseID
            };

            brokerResource.save({action: 'additionalinfo'}, brokerInfo, function(data){
                console.dir(data);
            });

        };
    }
]);
