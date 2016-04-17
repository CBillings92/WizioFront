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
                    if(result[0].BrokerageId !== null){
                        $scope.brokerages = result[0];
                        $scope.PropertyManagers = result[1];
                    } else {
                        $scope.brokerages = result[1];
                        $scope.PropertyManagers = result[0];
                    }
                    console.dir($scope.brokerages);
                    console.dir($scope.PropertyManagers);
                    return;
                });

            function updateApiAccess(data, index, arrayChanged) {
                console.dir(data.Apiaccess);
                if(data.Apiaccess !== null){
                    console.dir("{{{{{{{{}}}}}}}}");
                    console.dir(data);
                    console.dir($scope.brokerages);
                        vrapiUpdate.update(data.Apiaccess, function(res){
                            console.dir(res);
                        });
                } else {
                    console.dir("__________________");
                    console.dir(data);
                    vrapi.save(data, function updateApiAccessCB(response) {
                        console.dir(response);
                        console.dir("CHECKCHECKCHECKCHECKCHECKCHECK");
                        console.dir(response.BrokerageId);
                        console.dir(response.PropertyManagerId);

                        console.dir("CHECKCHECKCHECKCHECKCHECKCHECK");
                        if(typeof(response.BrokerageId) === 'number'){
                            console.dir("IN BROKER");
                            $scope.brokerages[index].Apiaccess = response;
                        } else {
                            console.dir("IN ELSE");
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
