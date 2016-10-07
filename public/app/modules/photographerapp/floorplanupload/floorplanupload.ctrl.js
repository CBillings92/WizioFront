angular.module('PhotographerApp')
    .controller('FloorPlanUploadCtrl', ['$scope', '$resource', 'WizioConfig', '$q', function($scope, $resource, WizioConfig,$q) {
        var apiurl;
        $scope.apartment = {
            address: null,
            floorPlanModel: null
        }

        var fileChooser = document.getElementById('file-chooser');

        apiurl = WizioConfig.baseAPIURL;
        //config the AWS object in the global scope
        AWS.config.update({
            accessKeyId: 'AKIAJ3OKI45M7I25XVNQ',
            secretAccessKey: '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'
        });
        //config the AWS S3 object for upload
        var bucket = new AWS.S3({
            endpoint: 'http://cdn.wizio.co',
            s3BucketEndpoint: true,
            region: 'us-east-1',
        });
        function saveFloorPlanToS3(key) {
            return new $q(function(resolve, reject){
                var file = fileChooser.files[0];
                if (file) {
                    results.innerHTML = '';

                    var params = {
                        Bucket: 'equirect-photos',
                        Key: key,
                        ContentType: file.type,
                        Body: file
                    };
                    bucket.putObject(params, function(err, data) {
                        results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
                        console.dir(data);
                        resolve(data);
                    });
                } else {
                    results.innerHTML = 'Nothing to upload.';
                    reject('err');
                }
            })
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
                saveFloorPlanToS3(key)
                    .then(function(response){
                        alert('finished');
                    })

            })
        }

        $scope.functions = {
            saveForm: createAddress
        }
        //get the google maps corrected data
        //save it to the database
        //return the address

    }])
