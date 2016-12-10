/*
    for uploading floorplans prior to fliming. Will create a building and unit
    in the database, and then send the floorplan to the S3 bucket, creating
    a new folder for the unit to have its photos stored eventually. Folder is
    the units pubid
*/
angular.module('PhotographerApp')
    .controller('FloorPlanUploadCtrl', ['$scope', '$resource', 'WizioConfig', '$q', function($scope, $resource, WizioConfig,$q) {
        // shorthanding the wizioconfig api url for convenience
        var apiurl = WizioConfig.baseAPIURL;
        $scope.noFloorPlanChkBox = false;
        // put apartment on the scope for the form input
        $scope.apartment = {
            address: null,
            floorPlanModel: null
        };

        // use some vanillaJS to get the element that the floorplan will be uploaded on
        var fileChooser = document.getElementById('file-chooser');

        // config the AWS object in the global scope
        AWS.config.update({
            accessKeyId: 'AKIAJ3OKI45M7I25XVNQ',
            secretAccessKey: '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'
        });

        // config the AWS S3 object for upload
        var bucket = new AWS.S3({
            endpoint: 'http://cdn.wizio.co',
            s3BucketEndpoint: true,
            region: 'us-east-1',
        });

        /*
            saves tho floorplan image to S3, expects to receive the key which is
            a string that states what the folder name will be in S3 for the unit.
            should be the unit's public id.

            returns a promise
        */

        function saveFloorPlanToS3(key) {
            return new $q(function(resolve, reject){
                //grab the first file in the file array (our floorplan)
                var file = fileChooser.files[0];
                //check if the file exists
                if (file) {

                    //parameters to be sent to S3 - key is the path in the S3 bucket
                    var params = {
                        Bucket: 'equirect-photos',
                        Key: key,
                        ContentType: file.type,
                        Body: file
                    };

                    //save the floorplan to S3
                    bucket.putObject(params, function(err, data) {
                        results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
                        console.dir(data);
                        resolve(data);
                    });
                } else {
                    reject('Could not reach S3 - Please yell at Cameron');
                }
            });
        }
        // //vanilla JS for uploading the photo
        // var button = document.getElementById('upload-button');
        // var results = document.getElementById('results');
        // button.addEventListener('click', function() {
        // }, false);

        //send apartemnt address and unit number to the backend
        function createAddress(){
            $resource(apiurl + 'unit')
            .save({apartmentAddress: $scope.apartment.address, floorPlanModel: $scope.apartment.floorPlanModel}, function(response){
                var key = response.pubid + '/floorplan.png';
                if($scope.noFloorPlanChkBox){
                    alert('Saved with no floorplan');
                    return;
                } else {
                    saveFloorPlanToS3(key)
                    .then(function(response){
                        alert('finished');
                    })
                    .catch(function (err) {
                        alert(err);
                    });
                }
            });
        }

        $scope.functions = {
            saveForm: createAddress
        };
        //get the google maps corrected data
        //save it to the database
        //return the address

    }]);
