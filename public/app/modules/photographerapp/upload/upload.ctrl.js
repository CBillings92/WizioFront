angular.module('UploadPageApp').controller('UploadPageCtrl', [
    '$scope',
    '$resource',
    'WizioConfig',
    'ModalBuilderFct',
    function($scope, $resource, WizioConfig, ModalBuilderFct) {
        var units;
        var selectedUnit;
        $scope.photoTitle;
        $scope.pins = [];

        $resource(WizioConfig.baseAPIURL + 'apartment/chooseparams/:param1/:param2/:param3/:param4/:param5', {
            id: '@id',
            pubid: '@pubid',
            concatAddr: '@concatAddr',
            unitNum: '@unitNum',
            Floor_Plan: '@Floor_Plan',
        }).query({id: 'id', pubid: 'pubid', concatAddr: 'concatAddr', unitNum: 'unitNum', Floor_Plan: "Floor_Plan"}, function(response){
            console.dir(response);
            $scope.units=response;
        })


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
                y: y,
                apartmentpubid: selectedUnit.pubid,
                isUnit: 1,
                type: 'vrphoto',
                title: null,
                awsurl: 'http://cdn.wizio.co/' + selectedUnit.pubid + '/',
                ApartmentId: selectedUnit.id
            }
            $scope.pins.push(pin);
            $scope.$apply();
            ModalBuilderFct.buildComplexModal(
                    'md',
                    'public/app/modules/photographerapp/upload/uploadphoto.modal.view.html',
                    'UploadPhotoModalCtrl',
                    pin
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
