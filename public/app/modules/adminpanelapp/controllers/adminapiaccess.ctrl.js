angular.module('AdminPanelApp')
    .controller('AdminPanelApiAccessCtrl', [
        '$scope',
        '$resource',
        'WizioConfig',
        'TokenSvc',
        function adminpanelapiaccessctrl($scope, $resource, WizioConfig, TokenSvc) {
            var vrapi = $resource(WizioConfig.baseAPIURL + 'vrapi');
            var vrapiUpdate = $resource(WizioConfig.baseAPIURL + 'vrapi', null, {
                'update': {
                    method: 'PUT'
                }
            });
            var devonRocksIndex = Math.floor(Math.random() * 10);
            var devonRocksArray = [
                "Devon is the man!",
                "Devon, you are the key to my heart",
                "Keep killing it Devon!",
                "Devon, you are... a star!",
                "Devon moving us along!",
                "Is that an owl behind you?",
                "Hi Devon. You are stellar",
                "Devon, Wizio loves you!",
                "DEVVVVVVOOOOOONNNNNNNNNNN",
                "GET IT DEVON GET IT!"
            ];
            console.dir(TokenSvc.decode());
            $scope.devonRocks = devonRocksArray[devonRocksIndex];
                vrapi.query(function(result) {
                    if(result[0].BrokerageId !== null){
                        $scope.brokerages = result[0];
                        $scope.PropertyManagers = result[1];
                    } else {
                        $scope.brokerages = result[1];
                        $scope.PropertyManagers = result[0];
                    }
                    return;
                });

            function updateApiAccess(data, index, arrayChanged) {
                if(data.Apiaccess !== null){
                        vrapiUpdate.update(data.Apiaccess, function(res){
                        });
                } else {
                    console.dir(data);
                    vrapi.save(data, function updateApiAccessCB(response) {
                        if(typeof(response.BrokerageId) === 'number'){
                            $scope.brokerages[index].Apiaccess = response;
                        } else {
                            $scope.PropertyManagers[index].Apiaccess = response;
                        }
                    });
                }
            }
            $scope.updateApiAccess = updateApiAccess;
        }
    ]);
