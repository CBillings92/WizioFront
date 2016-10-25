/*
    for uploading new photos to floor plans. Floor plans need to have been uploaded
    prior (ususally by Devon) at /photographer/upload/floorplan. This app displays
    all units with non null Floor_Plan attributes in our database along with
    their photos. Allows for uploading of photos to S3 and associating pins
    and Wizio API.
*/
angular.module('UploadPageApp').controller('UploadPageCtrl', [
    '$scope',
    '$resource',
    'WizioConfig',
    'ModalBuilderFct',
    'lodash',
    function($scope, $resource, WizioConfig, ModalBuilderFct, lodash) {
        var units, selectedUnit;
        $scope.pins = [];
        $scope.showAmenityButton = false;

        // get the id, pubid, concatAddr, unitnum, and Floor_Plan for all apartments with Floor_Plans
        $resource(WizioConfig.baseAPIURL + 'apartment/chooseparams/:param1/:param2/:param3/:param4/:param5', {
            id: '@id',
            pubid: '@pubid',
            concatAddr: '@concatAddr',
            unitNum: '@unitNum',
            Floor_Plan: '@Floor_Plan',
        }).query(
            {
                id: 'id',
                pubid: 'pubid',
                concatAddr: 'concatAddr',
                unitNum: 'unitNum',
                Floor_Plan: "Floor_Plan"
            },
            function(response){
                $scope.units=response;
            }
        );

        document.getElementById('floorplan').addEventListener('click',createPin);
        // called when an address is selected from the menu - loads the floorplan
        // and the photos for the unit - subScope is `this` from the element
        // click in the HTML
        $scope.loadFloorplan = function(subScope){

            // get the Floor_Plan URL from the selected unit
            $scope.selectedFloorplan = subScope.unit.Floor_Plan;
            selectedUnit = subScope.unit;
            $scope.showAmenityButton = true;

            // get the photos associated with the unit selected - response is
            // array of two arrays. First array is the array of photo OBJECTS
            // second array is object with the unit Floor_Plan URL
            $resource(WizioConfig.baseAPIURL + 'vr/listing/:apitoken/:pubid', {
                apitoken: '@apitoken',
                pubid: '@pubid'
            }).query(
                {
                    apitoken: WizioConfig.static_vr.apikey,
                    pubid: subScope.unit.pubid
                },
                function(response){
                    var media = response[0];
                    // create an object with keys True, False. False key holds
                    // the ammenitiy photos, True holds the unit photos
                    $scope.media = lodash.groupBy(media, "isUnit");
                    $scope.amenities=$scope.media.false;
                    $scope.unitPhotos = $scope.media.true;
                }
            );
        };


        //for removing pins placed already.
        function removePin(e){
            // regex expression for grabbing numbers from the pin id
            // pin id's are pin_{{indexNumber}} ex: pin_0, pin_1, etc
            var onlyNumbersPattern = /\d+/g;
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
                    } else {
                        return;
                    }
                });
        }

        // function for dropping a pin on the floorplan. e is the click event
        function createPin(e){

            // hardcoded values account for the size of the rectangle pin image
            // so that the bottom of the pin is where the user clicks (not the
            // top left of the box the pin is in)
            var x = (((e.offsetX - 17)/e.srcElement.clientWidth)*100).toFixed(2);
            var y = (((e.offsetY - 35)/e.srcElement.clientHeight)*100).toFixed(2);

            // create the pin object to be saved to the database eventually (a
            // media object)
            var pin = {
                x: x,
                y: y,
                apartmentpubid: selectedUnit.pubid,
                isUnit: 1,
                type: 'vrphoto',
                title: null,
                awsurl: 'http://cdn.wizio.co/' + selectedUnit.pubid + '/',
                ApartmentId: selectedUnit.id
            };

            // push this pin to the $scope.pins array - will display on the
            // floorplan at this point
            $scope.pins.push(pin);
            // call $scope.$apply to manually refresh scope - needed because of
            // disconnect between angular and vanilla JS
            $scope.$apply();

            // build and display a modal with the templateUrl and controller,
            // pass the current pin as 'modalData' into the called modal controller
            ModalBuilderFct.buildComplexModal(
                    'md',
                    'public/app/modules/photographerapp/upload/uploadphoto.modal.view.html',
                    'UploadPhotoModalCtrl',
                    pin
                )
                .then(function(result) {
                    // result is what's passed back from modal button selection
                    return result;
                });
                // get the current index of the newly added pin in $scope.pins
                // this will allow us to create a unique id for the pin based on
                // its index in the array
                var pinIndex = $scope.pins.length - 1;

                // add the remove pin functionality
                document.getElementById('pin_' + pinIndex).addEventListener('click', removePin);
        }


    }
]);
