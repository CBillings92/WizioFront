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

        // config the AWS object in the global scope
        AWS.config.update({
            accessKeyId: 'AKIAJ3OKI45M7I25XVNQ',
            secretAccessKey: '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'
        });

        // config the AWS S3 object for upload
        var bucket = new AWS.S3({
            endpoint: 'https://cdn.wizio.co',
            s3BucketEndpoint: true,
            region: 'us-east-1',
        });

        /*  saveFloorPlanToS3 - SUMMARY
            saves tho floorplan image to S3, expects to receive the key which is
            a string that states what the folder name will be in S3 for the unit.
            should be the unit's public id.

            returns a promise
        */

        $scope.closeModal = function(){
            $uibModalInstance.dismiss('exit');
        }
        // send apartment address and unit number to next modal
        function continueToFloorPlanUpload(){
            $scope.formSubmitted = true;
            $uibModalInstance.close($scope.apartment);
        }

        $scope.functions = {
            saveForm: continueToFloorPlanUpload
        };
        //get the google maps corrected data
        //save it to the database
        //return the address

    }]);
