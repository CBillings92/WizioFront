/*  createunit.ctrl.js - SUMMARY
    for uploading floorplans prior to fliming. Will create a building and unit
    in the database, and then send the floorplan to the S3 bucket, creating
    a new folder for the unit to have its photos stored eventually. Folder is
    the units pubid
*/
angular.module('PhotographerApp')
    .controller('CreateUnitModalCtrl', [
        '$scope',
        '$resource',
        'WizioConfig',
        '$q',
        'LoadingSpinnerFct',
        'SmartSearchSvc',
        '$uibModalInstance',
        'TokenSvc',
        function(
            $scope,
            $resource,
            WizioConfig,
            $q,
            LoadingSpinnerFct,
            SmartSearchSvc,
            $uibModalInstance,
            TokenSvc
        ) {
        // shorthanding the wizioconfig api url for convenience
        var apiurl = WizioConfig.baseAPIURL;

        $scope.formSubmitted = false;
        // put apartment on the scope for the form input
        $scope.apartment = {
            address: null,
            floorPlanModel: null
        };

        // functionality for typeahead
        $scope.getLocation = function(val) {
            return SmartSearchSvc.smartSearch(val);
        };

        $scope.closeModal = function(){
            $uibModalInstance.dismiss('exit');
        }
        // send apartment address and unit number to next modal
        function continueToTourMgmt(){
          alert('Being called')
            $scope.formSubmitted = true;
            $resource(apiurl + 'unit')
            .save({apartmentAddress: $scope.apartment.address, floorPlanModel: $scope.apartment.floorPlanModel}, function(response){
              $uibModalInstance.close(response);
            })
        }

        $scope.functions = {
            saveForm: continueToTourMgmt
        };
        //get the google maps corrected data
        //save it to the database
        //return the address

    }]);
