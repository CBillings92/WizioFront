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
        $scope.bulkUploadInitiated = false;
        $scope.cdnEndPoint = WizioConfig.CLOUDFRONT_DISTRO;
        $scope.uploadPhotoBtnText = 'Finish and Upload';

        $scope.closeModal = function() {
            $uibModalInstance.close();
        }

        // Laod the data for the CreateTourModal
        UploadToolFct.workflow.init(apartment, subscriptionApartment.pubid).then(function(media) {
            var sortedMedia = UploadToolFct.sortMedia(media);
            apartment.sortedMedia = sortedMedia;
            $scope.apartment = apartment;
            apartment.SubscriptionApartment = $scope.subscriptionApartment
            return;
        }).catch(function(error) {
            console.dir(error);
        })

        // On clicking on either a pin or the floorplan, remove, move or create a pin
        $scope.makePinAction = makePinAction;
        $scope.selectedSubscriptionApartmentPubId = null;

        function bulkUploadPhotos() {
            $scope.bulkUploadInitiated = true;
            $scope.uploadPhotoBtnText = 'Uploading...';
            var photos = $scope.apartment.sortedMedia.photos;
            LoadingSpinnerFct.show('bulk-upload-photo-loader');
            for (var i = 0; i < $scope.apartment.sortedMedia.photos.length; i++) {
                $scope.apartment.sortedMedia.photos[i].order = i;
            }
            UploadToolFct.bulkUploadPhotos($scope.apartment).then(function(response) {
                ModalBuilderFct.buildSimpleModal("", "OK", "Success", 'Upload Complete!').then(function(result) {
                    return;
                });
                $uibModalInstance.close();
            }).catch(function(error) {
                LoadingSpinnerFct.hide('bulk-upload-photo-loader');
                if (error === 'No Files To Upload') {
                    ModalBuilderFct.buildSimpleModal("", "OK", "Error", 'No new photos uploaded.').then(function(result) {
                        return;
                    });
                    $uibModalInstance.close();
                    return;
                }
            });
        }
        $scope.bulkUploadPhotos = bulkUploadPhotos;

        function assignPhotoOrder(photos) {
            for (var i = 0; i < photos.length; i++) {
                photos[i].order = i;
            }
            return photos;
        }

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
                movePin(mouseEvent, index, newMediaOrPhoto);
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
        function movePin(mouseEvent, index, newMediaOrPhoto) {
            movePinFlag = false;
            // Calculate the new pin X and Y
            var newPinPosition = calculatePinXandY(mouseEvent);
            // Get the pin that will be moved
            var pinToMove = $scope.apartment.sortedMedia[newOrCurrentPhotoForPinDrop][photoForPinDropIndex];

            pinToMove.x = newPinPosition.x;
            pinToMove.y = newPinPosition.y;

            if (pinToMove.id) {
                // send the new pin data to the API to be saved
                UploadToolFct.saveOnePhotoToWizioAPI(pinToMove, function(response) {
                    ModalBuilderFct.buildSimpleModal("", "OK", "Success", 'Pin moved.').then(function(result) {
                        return;
                    });
                })

            } else {
                return;
            }
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
                        newOrCurrentPhotoForPinDrop = newMediaOrPhoto;
                        photoForPinDropIndex = selectedPinIndex;

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
                if (response === 'exit') {
                    return;
                } else {
                    $scope.apartment.sortedMedia[newMediaOrPhoto][index] = response.Media;
                    ModalBuilderFct.buildSimpleModal("", "OK", "Success", 'Photo renamed successfully.').then(function(result) {
                        return;
                    });
                }
            });
        }
        $scope.renameMedia = renameMedia;

        $scope.cancelPinSelection = function() {
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
                dropPinFlag = false;
            } else {
                ModalBuilderFct.buildSimpleModal("", "OK", "Success", 'Choose a Photo below to associate with this pin.').then(function(result) {
                    return;
                });

                $scope.choosePhotoForPinFlag = true;
                $scope.temporaryPins.push({x: x, y: y});
            }
            return;
        }

        $scope.choosePhotoForPin = function(photo, index, typeOfPhoto) {
            var apartment = $scope.apartment.sortedMedia[typeOfPhoto][index];
            var temporaryPin = $scope.temporaryPins[0];
            apartment.x = $scope.temporaryPins[0].x
            apartment.y = $scope.temporaryPins[0].y
            apartment.isUnit = true;
            ModalBuilderFct.buildSimpleModal("", "OK", "Success", 'Photo assigned to pin!').then(function(result) {
                return;
            });
            $scope.choosePhotoForPinFlag = false;
            dropPinFlag = false;
        }

        $scope.previewPhoto = previewPhoto;

        function previewPhoto(photo, htmltag) {
            var file = photo;
            var reader = new FileReader();

            reader.addEventListener("load", function() {
                htmltag.src = reader.result;
            }, false);

            if (file) {
                reader.readAsDataURL(file);
            }
        }

        function uploadPhotos() {
            for (var i = 0; i < $scope.photos.length; i++) {
                $scope.photos[i]
            }
        }

        $scope.orderChange = function(item, partFrom, partTo, indexFrom, indexTo) {
            $scope.$apply();
            var previewElement;
            for(var i = 0; i < $scope.apartment.sortedMedia.photos.length; i++) {
                if ($scope.apartment.sortedMedia.photos[i].isNew) {
                    previewElement = document.getElementById('imgPreview' + i);
                    previewPhoto($scope.apartment.sortedMedia.photos[i].file, previewElement);
                }
            }
        }

        /**
         * Delete a new photo from the array of photos then run the previewPhoto
         * function to preview photos in the new locations.
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        function removeNewMedia(index) {
            var previewElement;
            apartment.sortedMedia.photos.splice(index, 1);
            apartment.sortedMedia.photos.forEach(function(item, i) {
                if(item.isNew) {
                    previewElement = document.getElementById('imgPreview' + i);
                    previewPhoto(item.file, previewElement)
                }
            })
            return;
        }
        $scope.removeNewMedia = removeNewMedia;
        $scope.addPhotosForUpload = function addAmenity() {
            document.getElementById('uploadMultiplePhotosInputButton').onchange = function() {
                $scope.files = [];
                $scope.apartment.sortedMedia.newMedia = [];
                var elementId = 'imgPreview';
                var previewElement;
                var filename;
                for (var i = 0; i < this.files.length; i++) {
                    var photo = {
                        x: null,
                        y: null,
                        apartmentpubid: apartment.pubid,
                        isUnit: 0,
                        type: 'vrphoto',
                        title: this.files[i].name,
                        awsurl: 'https://cdn.wizio.co/' + subscriptionApartment.pubid + '/',
                        ApartmentId: modalData.id,
                        SubscriptionApartmentPubId: subscriptionApartment.pubid,
                        useremail: TokenSvc.decode().email,
                        token: TokenSvc.getToken(),
                        file: this.files[i],
                        isNew: true
                    };
                    $scope.apartment.sortedMedia.photos.unshift(photo);
                    $scope.$apply();
                }
                for (var i = 0; i < this.files.length; i++) {
                    previewElement = document.getElementById('imgPreview' + i);
                    previewPhoto($scope.apartment.sortedMedia.photos[i].file, previewElement);
                }
                $scope.apartment.sortedMedia.photos = UploadToolFct.autoNameNewPhotos($scope.apartment.sortedMedia.photos);
                $scope.$apply();
            }
            $('#uploadMultiplePhotosInputButton').trigger('click');

        };
        $scope.createPinForPhoto = function(photo, index, newOrCurrentPhoto) {
            dropPinFlag = true;
            newOrCurrentPhotoForPinDrop = newOrCurrentPhoto;
            photoForPinDropIndex = index;
            return;
        }



        $scope.deletePhoto = function (photo, index, photosArr) {
          photo.IsDeleted = 1;
          UploadToolFct.deletePhoto(photo)
          .then(function(response){
            return;
          })
        }

    }
]);
