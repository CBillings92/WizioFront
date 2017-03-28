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
    'filterFilter',
    'WizioConfig',
    'ModalBuilderFct',
    'lodash',
    '$uibModalInstance',
    'TokenSvc',
    'UploadFct',
    'UploadToolFct',
    'modalData',
    function($scope, $resource, filterFilter, WizioConfig, ModalBuilderFct, lodash, $uibModalInstance, TokenSvc, UploadFct, UploadToolFct, modalData) {
        $scope.selectedUnit;

        // For angular filtered results
        $scope.searchText = {
            Apartment: {
                concatAddr: ''
            }
        };

        // modal control for closing the modal
        $scope.closeModal= function(){
            $uibModalInstance.close();
        }

        // Get all of the units that can have photos uploaded to them or be modified
        UploadToolFct.initializeChooseUnitModal()
        .then(function(response){
            $scope.units = response;
        })

        /*  SUMMARY - called when an address is selected from the menu -
            Loads floor plan and  photos for the unit
            subScope is `this` from the element click in the HTML
        */
        $scope.chooseUnit = function(selectedUnitIndex) {
            var SubscriptionPubId = TokenSvc.decode().Subscriptions[0].pubid;
            $scope.selectedUnit = $scope.units[selectedUnitIndex];
            var SubscriptionApartmentPubId = $scope.selectedUnit.SubscriptionApartment.pubid;

            UploadToolFct.workflow.init($scope.selectedUnit, SubscriptionApartmentPubId)
            .then(function(media){
                $scope.selectedUnit.Media = media;
                $uibModalInstance.close($scope.selectedUnit);
            })

        }
    }
]);
