angular.module('AdminPanelApp')
    .controller('AdminPanelApiAccessCtrl', [
        '$scope',
        '$resource',
        'WizioConfig',
        function adminpanelapiaccessctrl($scope, $resource, WizioConfig) {
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
            $scope.devonRocks = devonRocksArray[devonRocksIndex];
                vrapi.query(function(result) {
                    $scope.brokerages = result[1];
                    $scope.PropertyManagers = result[0];
                });

            function updateApiAccess(data, index, arrayChanged) {
                if(data.Apiaccess){
                    console.dir(data);
                        vrapiUpdate.update(data.Apiaccess, function(res){
                            console.dir(res);
                        });
                } else {
                    console.dir(data);
                    vrapi.save(data, function updateApiAccessCB(response) {
                        if(response.BrokerageId){
                            $scope.brokerages[index].Apiaccess = response;
                        } else {
                            $scope.PropertyManagers[index].Apiaccess = response;
                        }
                        console.dir($scope.brokerages);
                        console.dir($scope.PropertyManagers);
                    });
                }
            }
            $scope.updateApiAccess = updateApiAccess;
        }
    ]);
