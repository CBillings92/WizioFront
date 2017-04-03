/* FILE SUMMARY
    for uploading new photos to floor plans. Floor plans need to have been uploaded
    prior (ususally by Devon) at /photographer/upload/floorplan. This app displays
    all units with non null Floor_Plan attributes in our database along with
    their photos. Allows for uploading of photos to S3 and associating pins
    and Wizio API.
*/
angular.module('UploadPageApp').controller('UploadPageNewCtrl', [
    '$scope',
    '$resource',
    '$q',
    'filterFilter',
    'WizioConfig',
    'ModalBuilderFct',
    'lodash',
    '$uibModalInstance',
    'TokenSvc',
    'modalData',
    'LoadingSpinnerFct',
    'AWSFct',
    'MediaFct',
    'UploadToolFct',
    function($scope, $resource, $q, filterFilter, WizioConfig, ModalBuilderFct, lodash, $uibModalInstance, TokenSvc, modalData, LoadingSpinnerFct, AWSFct, MediaFct, UploadToolFct) {
        var movePinFlag = false;
        var selectedPinIndex;
        var apartmentAPIResource;
        var pinAPIResource;
        var buildModal = ModalBuilderFct.buildComplexModal;
        var apartment = modalData.Apartment;
        var subscriptionApartment = modalData.SubscriptionApartment;
        var dropPinFlag = false;
        var photoForPinDropIndex;
        var newOrCurrentPhotoForPinDrop;
        $scope.temporaryPins = [];
        $scope.choosePhotoForPinFlag = false;
        $scope.subscriptionApartment = subscriptionApartment;
        $scope.photos = [];
        $scope.files = [];
        $scope.uploaded = false;

        $scope.closeModal = function() {
            $uibModalInstance.close();
        }

        // Laod the data for the CreateTourModal
        UploadToolFct.workflow.init(apartment, subscriptionApartment.pubid)
        .then(function(media) {
            var sortedMedia = UploadToolFct.sortMedia(media);
            apartment.sortedMedia = sortedMedia;
            $scope.apartment = apartment;
            return;
        }).catch(function(error) {
            console.dir(error);
        })

        // On clicking on either a pin or the floorplan, remove, move or create a pin
        $scope.makePinAction = makePinAction;
        $scope.selectedSubscriptionApartmentPubId = null;

        function bulkUploadPhotos() {
            UploadToolFct.bulkUploadPhotos($scope.files, apartment, subscriptionApartment.pubid).then(function(response) {
                alert('Finished!')
                $uibModalInstance.close();
            }).catch(function(error) {
                if (error === 'No Files To Upload') {
                    alert('No new photos uploaded');
                    $uibModalInstance.close();
                    return;
                }
            });
        }
        $scope.bulkUploadPhotos = bulkUploadPhotos;

        /*  SUMMARY - makePinAction(mouseEvent, subScope, clickOnFloorplan)
            mouseEvent provides us with the necessary coordinates for placing and
            moving pins. It also provides us with the ID of the pin that has been
            clicked on. We use REGEX to get the index number fouind within the ID
            of the pin ID to locate it in the pins array if it needs to be moved
            or removed
            poopie pooop poop poop
        */
        function makePinAction(mouseEvent, photo, clickOnFloorplan, index, newMediaOrPhoto) {

            // If statement handles logic for dictating what action to take
            // Either removal of a pin, movi|ng a pin, or creating a new pin
            if (clickOnFloorplan === true && movePinFlag === false) {
                createPin(mouseEvent);
            } else if (clickOnFloorplan === true && movePinFlag === true) {
                movePin(mouseEvent);
            } else {
                choosePinActionModal(index, newMediaOrPhoto);
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

        // For moving pins after they have been placed
        function movePin(mouseEvent) {
            movePinFlag = false;

            // Calculate the new pin X and Y
            var newPinPosition = calculatePinXandY(mouseEvent);

            // Get the pin that will be moved
            var pinToMove = apartment.sortedMedia.pins[selectedPinIndex];

            pinToMove.x = newPinPosition.x;
            pinToMove.y = newPinPosition.y;

            // send the new pin data to the API to be saved
            pinAPIResource.save(pinToMove, function(response) {
                alert('saved');
                return;
            });
        }

        // For deleting a pin that has been placed already
        function deletePin(pin, callback) {
            // Send the request to the API to have the media record deleted
            $resource(WizioConfig.baseAPIURL + 'unit/delete/pin').save({
                pin: pin
            }, function(response) {
                callback(response);
            });

        }
// Trent and Devon Smell like beef and cheese Luv Kyle lol Dix
        // When a pin is clicked provide the user a modal with possible options
        // for the already placed pins
        function choosePinActionModal(selectedPinIndex, newMediaOrPhoto) {
            buildModal('md', 'public/app/modules/photographerapp/upload/remove-pin.modal.view.html', 'RemovePinModalCtrl', apartment.sortedMedia[newMediaOrPhoto][selectedPinIndex]).then(function(result) {
                switch (result) {
                    case 'removePin':
                        deletePin(apartment.sortedMedia[newMediaOrPhoto][selectedPinIndex], function(response) {
                            selectedPinIndex = apartment.sortedMedia[newMediaOrPhoto].splice(selectedPinIndex, 1);
                        });
                        break;
                    case 'movePin':
                        movePinFlag = true;
                        break;
                    case 'renamePhoto':
                        var selectedMedia = apartment.sortedMedia[newMediaOrPhoto][selectedPinIndex];
                        selectedMedia.SubscriptionApartmentPubId = $scope.apartment.SubscriptionApartmentPubId;
                        renameMedia(apartment.sortedMedia[newMediaOrPhoto][selectedPinIndex]);
                        break;
                    case 'cancel':
                        break;
                    default:
                }
            });
        }
        // Rename media
        function renameMedia(media, index, newMediaOrPhoto) {
            media.SubscriptionApartmentPubId = subscriptionApartment.pubid;
            UploadToolFct.renameMedia(media).then(function(response) {
                alert('hi');
                    console.dir('_____');
                    console.dir(response);
                    console.dir('_____');
                    $scope.apartment.sortedMedia[newMediaOrPhoto][index] = response.Media;
                if (response === 'exit') {
                    return;
                } else {
                    alert('Photo Renamed Successfully');
                }
            });
        }
        $scope.renameMedia = renameMedia;

        $scope.cancelPinSelection = function () {
            $scope.choosePhotoForPinFlag = false;
            dropPinFlag = false;
        }
        // function for dropping a pin on the floorplan. e is the click event
        function createPin(e) {
            // hardcoded values account for the size of the rectangle pin image
            // so that the bottom of the pin is where the user clicks (not the
            // top left of the box the pin is in)
            var x = (((e.offsetX - 17) / e.target.clientWidth) * 100).toFixed(2);
            var y = (((e.offsetY - 35) / e.target.clientHeight) * 100).toFixed(2);
            var newPin;

            // create the pin object to be saved to the database eventually (a
            // media object)
            if (dropPinFlag) {
                var pin = $scope.apartment.sortedMedia[newOrCurrentPhotoForPinDrop][photoForPinDropIndex];
                pin.x = x;
                pin.y = y;
                pin.isUnit = 1;
                console.dir('droppin');
                dropPinFlag = false;
            } else {
                alert('Choose a photo below to associate with this pin!');
                $scope.choosePhotoForPinFlag = true;
                $scope.temporaryPins.push({
                    x: x,
                    y: y
                });
            }
            return;
        }

        $scope.choosePhotoForPin = function (photo, index, typeOfPhoto) {
            var apartment = $scope.apartment.sortedMedia[typeOfPhoto][index];
            var temporaryPin = $scope.temporaryPins[0];
            apartment.x = $scope.temporaryPins[0].x
            apartment.y = $scope.temporaryPins[0].y
            apartment.isUnit = true;
            alert('Photo assigned to pin!');
            $scope.choosePhotoForPinFlag = false;
            dropPinFlag = false;
        }

        // used for formatting the subscriptionapartment pubid for the environment
        $scope.formatKeyForEnv = function(pubid) {
            return AWSFct.utilities.modifyKeyForEnvironment(pubid);
        }

        $scope.previewPhoto = previewPhoto;

        function previewPhoto(photo, htmltag) {
            return $q(function(resolve, reject) {
                var file = photo;
                var reader = new FileReader();

                reader.addEventListener("load", function() {
                    htmltag.src = reader.result;
                }, false);

                if (file) {
                    reader.readAsDataURL(file);
                }
            })
        }

        function uploadPhotos() {
            for (var i = 0; i < $scope.photos.length; i++) {
                $scope.photos[i]
            }
        }

        function removeNewMedia(index) {
            apartment.sortedMedia.newMedia.splice(index, 1);
            return;
        }
        $scope.removeNewMedia = removeNewMedia;
        $scope.addPhotosForUpload = function addAmenity() {
            document.getElementById('uploadMultiplePhotosInputButton').onchange = function() {
                var elementId = 'imgPreview';
                var preview;
                var filename;
                // LoadingSpinnerFct.show('upload-tool-photo-preview-spinner');
                var i = 0;
                while (i < this.files.length) {
                    if($scope.apartment.sortedMedia.photos.length === 0) {
                        filename = 'Photo ' + i;
                    } else {
                        filename = UploadToolFct.autoNameNewPhoto($scope.apartment.sortedMedia.newMedia, $scope.apartment.sortedMedia.photos);
                    }
                    this.files[i].name = filename;
                    console.dir(filename);
                    console.dir(this.files[i].name);
                    $scope.files.push(this.files[i]);
                    $scope.apartment.sortedMedia.newMedia.push({
                        x: null,
                        y: null,
                        apartmentpubid: apartment.pubid,
                        isUnit: 0,
                        type: 'vrphoto',
                        title: filename,
                        awsurl: 'https://cdn.wizio.co/' + subscriptionApartment.pubid + '/',
                        ApartmentId: modalData.id,
                        SubscriptionApartmentPubId: subscriptionApartment.pubid,
                        useremail: TokenSvc.decode().email,
                        token: TokenSvc.getToken()
                    })

                    $scope.$apply();
                    preview = document.getElementById(elementId + i);
                    previewPhoto(this.files[i], preview);
                    i++;
                }
                // LoadingSpinnerFct.hide('upload-tool-photo-preview-spinner');
            }
            $('#uploadMultiplePhotosInputButton').trigger('click');

        };
        $scope.createPinForPhoto = function(photo, index, newOrCurrentPhoto) {
            dropPinFlag = true;
            newOrCurrentPhotoForPinDrop = newOrCurrentPhoto;
            photoForPinDropIndex = index;
        }

    }
]);
