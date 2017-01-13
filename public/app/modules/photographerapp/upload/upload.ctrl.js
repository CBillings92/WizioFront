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
    '$uibModalInstance',
    'TokenSvc',
    function($scope, $resource, WizioConfig, ModalBuilderFct, lodash, $uibModalInstance, TokenSvc) {
        var units;
        var movePinFlag = false;
        var selectedPinIndex;
        var apartmentAPIResource;
        var pinAPIResource;
        var buildModal = ModalBuilderFct.buildComplexModal;
        $scope.displayNoFloorplanMessage = false;
        $scope.selectedUnit = false;
        $scope.pins = [];
        $scope.showAmenityButton = false;
        console.dir($scope.selectedUnit);

        $scope.closeModal= function(){
            $uibModalInstance.close();
        }

        // just store the angular resource for later use
        apartmentAPIResource = $resource(WizioConfig.baseAPIURL + 'apartment/chooseparams/:param1/:param2/:param3/:param4/:param5/:param6', {
            param1: '@id',
            param2: '@pubid',
            param3: '@concatAddr',
            param4: '@unitNum',
            param5: '@Floor_Plan',
            param6: '@subscriptionPubId'
        });

        // just store the angular resource for later use
        pinAPIResource = $resource(WizioConfig.baseAPIURL + 'media');

        // get the id, pubid, concatAddr, unitnum, and Floor_Plan for all apartments with Floor_Plans
        apartmentAPIResource.query({
            param1: 'id',
            param2: 'pubid',
            param3: 'concatAddr',
            param4: 'unitNum',
            param5: "Floor_Plan",
            param6: TokenSvc.decode().Subscriptions[0].id
        }, function(response) {
            units = [];
            for(var i = 0; i < response.length; i++){
                response[i].Apartment["SubscriptionApartmentPubId"] = "";
                console.dir(response[i].Apartment);

                response[i].Apartment["SubscriptionApartmentPubId"] = response[i].pubid;
                units.push(response[i].Apartment);
            }
            // console.dir(units);
            // $scope.units = lodash.groupBy(units, 'Floor_Plan');
            $scope.units = units;
        });

        // On selecting a unit, load the floorplan image and pins/photos
        $scope.loadFloorplan = loadFloorplan;
        // On clicking on either a pin or the floorplan, remove, move or create a pin
        $scope.makePinAction = makePinAction;

        /*  SUMMARY - called when an address is selected from the menu - loads the floorplan
            and the photos for the unit - subScope is `this` from the element
            click in the HTML
        */
        function loadFloorplan(subScope) {
            console.dir(subScope);
            // get the Floor_Plan URL from the selected unit
            $scope.selectedFloorplan = subScope.unit.Floor_Plan;
            $scope.displayNoFloorplanMessage = $scope.selectedFloorplan ? false : true;
            $scope.selectedUnit = subScope.unit;
            $scope.showAmenityButton = true;
            var SubscriptionPubId = TokenSvc.decode().Subscriptions[0].pubid;
            var SubscriptionApartmentPubId = subScope.unit.SubscriptionApartmentPubId;

            $resource(WizioConfig.baseAPIURL + 'subscriptionapartment/:SubscriptionPubId/:SubscriptionApartmentPubId', {
                SubscriptionPubId: '@SubscriptionPubId',
                SubscriptionApartmentPubId: '@SubscriptionApartmentPubId',
            })
            .query({
                SubscriptionPubId: SubscriptionPubId,
                SubscriptionApartmentPubId: SubscriptionApartmentPubId
            }, function(response){
                var media = response;
                handleExistingPhotos(media);
            });

            // // get the photos associated with the unit selected - response is
            // // array of two arrays. First array is the array of photo OBJECTS
            // // second array is object with the unit Floor_Plan URL
            // $resource(WizioConfig.baseAPIURL + 'vr/listing/:apitoken/:pubid', {
            //     apitoken: '@apitoken',
            //     pubid: '@pubid'
            // }).query({
            //     apitoken: WizioConfig.static_vr.apikey,
            //     pubid: subScope.unit.pubid
            // }, function(response) {
            //     var media = response[0];
            //     // Handle whether there are or are not photos
            //     handleExistingPhotos(media);
            //
            //     return;
            // });
        }

        function handleExistingPhotos(unsortedMedia) {
            var sortedMedia;
            // Media is an object that contains media objects as keys.
            // If there are no keys, then there are no photos so create empty arrays
            // If there are photos, break the photos up into unit and non-unit photos
            if(Object.keys(unsortedMedia).length === 0){
                $scope.amenities = [];
                $scope.pins = [];
                return;
            } else {
                // Break up the photos by unit and non-unit
                // false means it's not a unit photo, true means it is a unit photo
                sortedMedia = lodash.groupBy(unsortedMedia, "isUnit");
                // If there are non-unit photos,
                if(sortedMedia.false){
                    $scope.amenities = sortedMedia.false;
                } else {
                    $scope.amenities = [];
                }
                // Some photos in the database will have a NULL isUnit - makes it an ammenity
                $scope.amenities.concat(sortedMedia.null);

                // Check to see if there are any unit photos, if there are...
                if(sortedMedia.true){
                    $scope.pins = sortedMedia.true;
                    return;
                } else {
                    $scope.pins = [];
                    return;
                }
            }
        }

        /*  SUMMARY - makePinAction(mouseEvent, subScope, clickOnFloorplan)
            mouseEvent provides us with the necessary coordinates for placing and
            moving pins. It also provides us with the ID of the pin that has been
            clicked on. We use REGEX to get the index number fouind within the ID
            of the pin ID to locate it in the pins array if it needs to be moved
            or removed
            poopie pooop poop poop
        */
        function makePinAction(mouseEvent, subScope, clickOnFloorplan) {
            // Only get the pin index (from the pin html id) when a pin was selected
            if (clickOnFloorplan === false) {
                var onlyNumbersPattern = /\d+/g;
                selectedPinIndex = Number(mouseEvent.target.id.match(onlyNumbersPattern)[0]);
            }

            // If statement handles logic for dictating what action to take
            // Either removal of a pin, moving a pin, or creating a new pin
            if (clickOnFloorplan === true && movePinFlag === false) {
                createPin(mouseEvent);
            } else if (clickOnFloorplan === true && movePinFlag === true) {
                movePin(mouseEvent);
            } else {
                choosePinActionModal();
            }
        }

        // Used to calculate the pin X and Y based on the mouse click
        function calculatePinXandY(mouseEvent) {
            // hardcoded values account for the size of the rectangle pin image
            // so that the bottom of the pin is where the user clicks (not the
            // top left of the box the pin is in)
            var x = (((mouseEvent.offsetX - 17) / mouseEvent.target.clientWidth) * 100).toFixed(2);
            var y = (((mouseEvent.offsetY - 35) / mouseEvent.target.clientHeight) * 100).toFixed(2);

            return {x: x, y: y};
        }

        function movePin(mouseEvent){
            var pinXY = calculatePinXandY(mouseEvent);
            var pinToMove = $scope.pins[selectedPinIndex];

            pinToMove.x = pinXY.x;
            pinToMove.y = pinXY.y;

            movePinFlag = false;
            pinAPIResource.save(pinToMove, function(response){
                alert('saved');
                return;
            });
        }
        function deletePin(pin, callback){
            $resource(WizioConfig.baseAPIURL + 'unit/delete/pin')
            .save({pin: pin}, function(response){
                callback(response);
            });

        }
        function choosePinActionModal() {
            buildModal('md', 'public/app/modules/photographerapp/upload/remove-pin.modal.view.html', 'RemovePinModalCtrl', $scope.pins).then(function(result) {
                switch (result) {
                    case 'removePin':
                    deletePin($scope.pins[selectedPinIndex], function(response){
                        selectedPinIndex = $scope.pins.splice(selectedPinIndex, 1);
                    })
                    break;
                    case 'movePin':
                    movePinFlag = true;
                    break;
                    case 'cancel':
                    break;
                    default:
                }
            });
        }
        // function for dropping a pin on the floorplan. e is the click event
        function createPin(e) {
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
                awsurl: 'https://cdn.wizio.co/' + $scope.selectedUnit.pubid + '/',
                ApartmentId: $scope.selectedUnit.id,
                SubscriptionApartmentPubId: $scope.selectedUnit.SubscriptionApartmentPubId
            };

            // push this pin to the $scope.pins array - will display on the
            // floorplan at this point
            $scope.pins.push(pin);
            // call $scope.$apply to manually refresh scope - needed because of
            // disconnect between angular and vanilla JS
            // $scope.$apply();

            // build and display a modal with the templateUrl and controller,
            // pass the current pin as 'modalData' into the called modal controller
            buildModal('md', 'public/app/modules/photographerapp/upload/uploadphoto.modal.view.html', 'UploadPhotoModalCtrl', pin).then(function(response) {
                // result is what's passed back from modal button selection
                console.dir(response.result);
                if(response.result === 'cancel'){
                    $scope.pins.pop();
                }
                return response.photoTitle;
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
                awsurl: 'https://cdn.wizio.co/' + $scope.selectedUnit.pubid + '/',
                ApartmentId: $scope.selectedUnit.id,
                SubscriptionApartmentPubId: $scope.selectedUnit.SubscriptionApartmentPubId
            };
            buildModal('md', 'public/app/modules/photographerapp/upload/uploadphoto.modal.view.html', 'UploadPhotoModalCtrl', amenity).then(function(response) {
                // result is what's passed back from modal button selection
                if(response.result === 'cancel'){
                    return;
                } else if (response.result === 'ok'){
                    amenity.title = response.photoTitle;
                    $scope.amenities.push(amenity);
                    return result;
                }
                return;
            });

        };

    }
]);
