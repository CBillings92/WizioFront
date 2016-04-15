angular.module('AdminPanelApp')
    .controller('AdminPanelApiAccessCtrl', [
        '$scope',
        '$resource',
        'WizioConfig',
        function adminpanelapiaccessctrl($scope, $resource, WizioConfig) {
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
            $resource(WizioConfig.baseAPIURL + 'vrapi')
                .query(function(result) {
                    $scope.brokerages = result[1];
                    $scope.PropertyManagers = result[0];
                });

            function updateApiAccess(data) {
                if(data.Apiaccess){
                    
                }
            }
        }
    ]);
