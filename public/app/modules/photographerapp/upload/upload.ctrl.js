angular.module('UploadPageApp').controller('UploadPageCtrl', [
    '$scope',
    '$resource',
    'WizioConfig',
    'ModalBuilderFct',
    function($scope, $resource, WizioConfig, ModalBuilderFct) {
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

        //for removing pins placed already.
        function removePin(e){
            console.dir(e.srcElement.id);
            var onlyNumbersPattern = /\d+/g
            var index = e.srcElement.id.match(onlyNumbersPattern);
            ModalBuilderFct.buildComplexModal(
                    'md',
                    'public/app/modules/photographerapp/upload/remove-pin.modal.view.html',
                    'RemovePinModalCtrl',
                    $scope.pins
                )
                .then(function(result) {
                    if(result === 'ok'){
                        var pinIndex = $scope.pins.splice(index,1);
                        // $scope.$apply()
                        return result;
                    }
                });
        }

        function createPin(e){
            var x = (((e.offsetX - 17)/e.srcElement.clientWidth)*100).toFixed(2);
            var y = (((e.offsetY - 35)/e.srcElement.clientHeight)*100).toFixed(2);
            var pin = {
                x: x,
                y: y
            }
            $scope.pins.push(pin);
            $scope.$apply();
            ModalBuilderFct.buildComplexModal(
                    'md',
                    'public/app/modules/photographerapp/upload/uploadphoto.modal.view.html',
                    'UploadPhotoModalCtrl'
                )
                .then(function(result) {
                    var pinIndex = $scope.pins.length - 1;
                    document.getElementById('pin_' + pinIndex).addEventListener('click', removePin);
                    return result;
                });
        }
        console.dir("why");
        document.getElementById('floorplan').addEventListener('click',createPin);

    }
]);
