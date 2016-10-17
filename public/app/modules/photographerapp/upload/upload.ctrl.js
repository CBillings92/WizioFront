angular.module('UploadPageApp').controller('UploadPageCtrl', [
    '$scope',
    '$resource',
    'WizioConfig',
    function($scope, $resource, WizioConfig) {
        var units;
        var selectedUnit;
        $scope.pins = [];
        //
        // $resource(WizioConfig.baseAPIURL + '/apartment/uploadtool').get(function(response) {
        // });
        var response = [
            {
                id: 1,
                concatAddr: "2 Huntington",
                unitNum: 10,
                pubid: 1234,
                Floor_Plan: "http://placekitten.com/g/600/400"
            }, {
                id: 2,
                concatAddr: "130 Maple Ave",
                unitNum: 2,
                pubid: 12345,
                Floor_Plan: "http://placekitten.com/g/400/600"
            }
        ];
        $scope.units = response;
        $scope.loadFloorplan = function(subScope){
            $scope.selectedFloorplan = subScope.unit.Floor_Plan;
            selectedUnit = subScope.unit
        }
        function createPin(e){
            console.dir(e);
            var x = (((e.offsetX - 17)/e.srcElement.clientWidth)*100).toFixed(2);
            var y = (((e.offsetY - 35)/e.srcElement.clientHeight)*100).toFixed(2);
            var pin = {
                x: x,
                y: y
            }
            console.dir($scope.pins);
            $scope.pins.push(pin);
            $scope.$apply();
            return;
        }
        document.getElementById('floorplan').addEventListener('click',createPin);

    }
]);
