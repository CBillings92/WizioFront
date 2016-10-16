angular.module('UploadPageApp').controller('UploadPageCtrl', [
    '$scope',
    '$resource',
    'WizioConfig',
    function($scope, $resource, WizioConfig) {
        var units;
        var selectedUnit;
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
        document.getElementById('floorplan').addEventListener('click', function(e){
            console.dir(e);
            var x = e.pageX - this.offsetLeft;
            var y = e.pageY - this.offsetTop;
            console.log("x =" + ((x/e.srcElement.clientWidth)*100).toFixed(2));
            console.log("y =" + ((y/e.srcElement.clientHeight)*100).toFixed(2));
        })

    }
]);
