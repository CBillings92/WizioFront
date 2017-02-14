/*
  Contains functionality related to interfacing with AWS S3
*/
angular.module('AWSApp')
  .factory('AWSFct', [
    '$q',
    'WizioConfig',
    function(
        $q,
        WizioConfig
    ){
        AWS.config.update({
          accessKeyId: 'AKIAIPGWV5OFR73P3VLQ',
          secretAccessKey: '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'
        });

        function createS3Object(endpoint, region) {
          var S3Object = new AWS.S3({
            endpoint: endpoint || 'https://cdn.wizio.co',
            s3BucketEndpoint: true,
            region: region || 'us-east-1'
          });
          return S3Object;
      }

      /* modifyKeyForEnvironment - SUMMARY
        Modify the key of the S3 object based on the current environment the
        codebase is running in. If it's dev (local) or test (test AWS server)
        append 'test_' to the data so it's easily findable and deleteable.
      */
      function modifyKeyForEnvironment(key) {
          if (WizioConfig.ENV === 'dev' || WizioConfig.ENV === 'test') {
              key = 'test_' + key;
          }
          return key
      }

        /* copyFile - SUMMARY
          Rename a file in an S3 bucket - happnes by copying the file with
          the new name and then deletes the old file
        */
        function copyFile(newFileName, oldFileName, fileFolderName) {
          // create a new S3 object from AWS library
          var bucket = createS3Object();
          // Create the oldFileEndPoint which defines the file to be copied
          var oldFileEndPoint = 'equirect-photos/'+ fileFolderName + '/' + oldFileName + '.JPG';
          // Create the newFileEndPoint which defines the file's end state
          var newFileEndPoint = fileFolderName + '/' + newFileName + '.JPG';
          var params = {
            Bucket: 'equirect-photos',
            CopySource: oldFileEndPoint,
            Key: newFileEndPoint,
          };
          return $q(function(resolve, reject){
            bucket.copyObject(params, function(err, success){
              if(err){
                console.log(err, err.stack);
                reject(err);
              } else {
                resolve(success);
              }
            });
          });
        }

        /* deleteFile - SUMMARY
            delete a file from AWS S3 buckets
        */
        function deleteFile(fileName, folderName) {
          var bucket = createS3Object();
          var params = {
            Bucket: 'equirect-photos',
            Key: folderName + '/' + fileName + '.JPG'
          };
          return $q(function(resolve, reject){
            bucket.deleteObject(params, function(err, success){
              if(err){
                console.log(err, err.stack);
                reject(err);
              } else {
                resolve(success);
              }
            });
          });
        }

        /*
          Workflow function used to rename a file in our S3 buckets.
        */
        function renameFile(newFileName, oldFileName, fileFolderName) {
            // return a promise
            return $q(function(resolve, reject){
                // copy the file with the new file name first
                copyFile(newFileName, oldFileName, fileFolderName)
                    .then(function(response){
                        // delete the old file once the new file is copied
                        return deleteFile(oldFileName, fileFolderName);
                    })
                    .then(function(response){
                        resolve(response);
                    })
                    .catch(function(err){

                    });
            });
        }

        function uploadFloorPlanFile(file, key, bucket, region) {
            return new $q(function(resolve, reject){
                var properKey = modifyKeyForEnvironment(key);
                //check if the file exists
                if (file) {
                    var bucket = createS3Object();
                    //parameters to be sent to S3 - key is the path in the S3 bucket
                    var params = {
                        Bucket: 'equirect-photos',
                        Key: properKey,
                        ContentType: 'png',
                        Body: file
                    };

                    //save the floorplan to S3
                    bucket.putObject(params, function(err, data) {
                        resolve(data);
                    });
                } else {
                    reject('Could not reach S3 - Please yell at Cameron');
                }
            });
        }

        function uploadProfileFile(file, key, bucket, region) {
            return new $q(function(resolve, reject){
                var properKey = modifyKeyForEnvironment(key);
                //check if the file exists
                if (file) {
                    var bucket = createS3Object();
                    //parameters to be sent to S3 - key is the path in the S3 bucket
                    var params = {
                        Bucket: 'wizio-profile-photos',
                        Key: properKey,
                        ContentType: file.type,
                        Body: file
                    };

                    //save the floorplan to S3
                    bucket.putObject(params, function(err, data) {
                        resolve(data);
                    });
                } else {
                    reject('Could not reach S3 - Please yell at Cameron');
                }
            });
        }

        return {
          s3: {
            equirectPhotos:{
              renameFile: renameFile,
              uploadFloorPlanFile: uploadFloorPlanFile
            },
            profilePhotos: {
                uploadphoto: uploadProfileFile
            }
          }
        };
    }
  ]);
