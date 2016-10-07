angular.module('PhotographerApp')
    .controller('FloorPlanUploadCtrl', ['$scope', '$resource', 'WizioConfig', function($scope, $resource, WizioConfig) {
        var apartmentAddress, floorPlanModel, apiurl;

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

        // //vanilla JS for uploading the photo
        // var fileChooser = document.getElementById('file-chooser');
        // var button = document.getElementById('upload-button');
        // var results = document.getElementById('results');
        // button.addEventListener('click', function() {
        //     var file = fileChooser.files[0];
        //     if (file) {
        //         results.innerHTML = '';
        //
        //         var params = {
        //             Bucket: 'equirect-photos',
        //             Key: file.name,
        //             ContentType: file.type,
        //             Body: file
        //         };
        //         bucket.putObject(params, function(err, data) {
        //             results.innerHTML = err ? 'ERROR!' : 'UPLOADED.';
        //             console.dir(data);
        //         });
        //     } else {
        //         results.innerHTML = 'Nothing to upload.';
        //     }
        // }, false);

        //send apartemnt address and unit number to the backend
        function createAddress(){
            $resource(apiurl + 'unit')
            .save({apartmentAddress: '176 Amory Street Jamaica Plain', floorPlanModel: '2'}, function(response){
                console.dir('inResponse');
            })
        }

        $scope.functions = {
            saveForm: createAddress
        }
        //get the google maps corrected data
        //save it to the database
        //return the address

    }])
