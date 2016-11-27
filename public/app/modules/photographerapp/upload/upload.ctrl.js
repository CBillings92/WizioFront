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
        var units;
        var movePin = false;
        $scope.selectedUnit = false;
        $scope.pins = [];
        $scope.showAmenityButton = false;

        // get the id, pubid, concatAddr, unitnum, and Floor_Plan for all apartments with Floor_Plans
        $resource(WizioConfig.baseAPIURL + 'apartment/chooseparams/:param1/:param2/:param3/:param4/:param5', {
            param1: '@id',
            param2: '@pubid',
            param3: '@concatAddr',
            param4: '@unitNum',
            param5: '@Floor_Plan',
        }).query({
                param1: 'id',
                param2: 'pubid',
                param3: 'concatAddr',
                param4: 'unitNum',
                param5: "Floor_Plan"
            },
            function(response) {
                $scope.units = response;
            }
        );

        // called when an address is selected from the menu - loads the floorplan
        // and the photos for the unit - subScope is `this` from the element
        // click in the HTML
        $scope.loadFloorplan = function(subScope) {

            // get the Floor_Plan URL from the selected unit
            $scope.selectedFloorplan = subScope.unit.Floor_Plan;
            $scope.selectedUnit = subScope.unit;
            $scope.showAmenityButton = true;

            // get the photos associated with the unit selected - response is
            // array of two arrays. First array is the array of photo OBJECTS
            // second array is object with the unit Floor_Plan URL
            $resource(WizioConfig.baseAPIURL + 'vr/listing/:apitoken/:pubid', {
                apitoken: '@apitoken',
                pubid: '@pubid'
            }).query({
                    apitoken: WizioConfig.static_vr.apikey,
                    pubid: subScope.unit.pubid
                },
                function(response) {
                    var media = response[0];
                    // create an object with keys True, False. False key holds
                    // the ammenitiy photos, True holds the unit photos
                    $scope.media = lodash.groupBy(media, "isUnit");
                    $scope.amenities = $scope.media.false;
                    $scope.pins = $scope.media.true;
                }
            );
        };
        /*  SUMMARY - makePinAction(mouseEvent, subScope, clickOnMap)
            mouseEvent provides us with the necessary coordinates for placing and
            moving pins. It also provides us with the ID of the pin that has been
            clicked on. We use REGEX to get the index number fouind within the ID
            of the pin ID to locate it in the pins array if it needs to be moved
            or removed
        */
        $scope.makePinAction = function makePinAction(mouseEvent, subScope, clickOnMap) {
            console.dir('_-_-_-_-_-');
            console.dir(mouseEvent);
            if (clickOnMap === true && movePin === false) {
                createPin(mouseEvent);
            } else if (clickOnMap === true && movePin === true) {
                movePin(mouseEvent);
                movePin = false;
            } else {
                var onlyNumbersPattern = /\d+/g;
                var pinIndex = Number(mouseEvent.target.id.match(onlyNumbersPattern)[0]);
                ModalBuilderFct.buildComplexModal(
                        'md',
                        'public/app/modules/photographerapp/upload/remove-pin.modal.view.html',
                        'RemovePinModalCtrl',
                        $scope.pins
                    )
                    .then(function(result) {
                        console.dir(mouseEvent);
                        switch (result) {
                            case 'removePin':
                                var pinIndex = $scope.pins.splice(index, 1);
                                break;
                            case 'movePin':
                                movePin(mouseEvent, pinIndex);
                                break;
                            case 'cancel':
                                break;
                            default:
                        }
                    });
            }
        }

        $scope.removePin = function(elem) {
            // regex expression for grabbing numbers from the pin id
            // pin id's are pin_{{indexNumber}} ex: pin_0, pin_1, etc
            var onlyNumbersPattern = /\d+/g;
            var pinIndex = Number(elem.target.id.match(onlyNumbersPattern)[0]);
            ModalBuilderFct.buildComplexModal(
                    'md',
                    'public/app/modules/photographerapp/upload/remove-pin.modal.view.html',
                    'RemovePinModalCtrl',
                    $scope.pins
                )
                .then(function(result) {
                    switch (result) {
                        case 'removePin':
                            var pinIndex = $scope.pins.splice(index, 1);
                            break;
                        case 'movePin':
                            alert(pinIndex);
                            movePin(pinIndex);
                            break;
                        case 'cancel':
                            break;
                        default:
                    }
                });
        }

        function movePin(mouseEvent, pinIndex) {
            floorplanOverlay.addEventListener('click', function(mouseEvent) {
                // hardcoded values account for the size of the rectangle pin image
                // so that the bottom of the pin is where the user clicks (not the
                // top left of the box the pin is in)
                var x = (((mouseEvent.offsetX - 17) / mouseEvent.srcElement.clientWidth) * 100).toFixed(2);
                var y = (((mouseEvent.offsetY - 35) / mouseEvent.srcElement.clientHeight) * 100).toFixed(2);
                console.dir(pinIndex);
                console.dir($scope.unitPhotos[pinIndex])
                console.dir(event);
            })
        }
        //for removing pins placed already.
        function removePin(e) {
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
                    alert(result);
                    switch (result) {
                        case 'removePin':
                            var pinIndex = $scope.pins.splice(index, 1);
                            break;
                        case 'movePin':
                            break;
                        case 'cancel':
                            break;
                        default:
                    }
                });
        }

        // function for dropping a pin on the floorplan. e is the click event
        function createPin(e) {
            console.dir(e);
            // hardcoded values account for the size of the rectangle pin image
            // so that the bottom of the pin is where the user clicks (not the
            // top left of the box the pin is in)
            var x = (((e.offsetX - 17) / e.target.clientWidth) * 100).toFixed(2);
            var y = (((e.offsetY - 35) / e.target.clientHeight) * 100).toFixed(2);

            // create the pin object to be saved to the database eventually (a
            // media object)
            var pin = {
                x: x,
                y: y,
                apartmentpubid: $scope.selectedUnit.pubid,
                isUnit: 1,
                type: 'vrphoto',
                title: null,
                awsurl: 'http://cdn.wizio.co/' + $scope.selectedUnit.pubid + '/',
                ApartmentId: $scope.selectedUnit.id
            };

            // push this pin to the $scope.pins array - will display on the
            // floorplan at this point
            $scope.pins.push(pin);
            // call $scope.$apply to manually refresh scope - needed because of
            // disconnect between angular and vanilla JS
            // $scope.$apply();

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
        }

        $scope.addAmenity = function addAmenity() {

            var amenity = {
                x: null,
                y: null,
                apartmentpubid: $scope.selectedUnit.pubid,
                isUnit: 0,
                type: 'vrphoto',
                title: null,
                awsurl: 'http://cdn.wizio.co/' + $scope.selectedUnit.pubid + '/',
                ApartmentId: $scope.selectedUnit.id
            };

            ModalBuilderFct.buildComplexModal(
                'md',
                'public/app/modules/photographerapp/upload/uploadphoto.modal.view.html',
                'UploadPhotoModalCtrl',
                amenity
            ).then(function(result) {
                // result is what's passed back from modal button selection
                return result;
            });


        };


    }
]);
