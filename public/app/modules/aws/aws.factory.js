/*
  Contains functionality related to interfacing with AWS S3
*/
angular.module('AWSApp')
  .factory('AWSFct', [
    '$q',
    function($q){
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

        /*
          Rename a file in an S3 bucket - happnes by copying the file with
          the new name and then deletes the old file
        */
        function copyFile(newFileName, oldFileName, fileFolderName) {
          // create a new S3 object from AWS library
          var bucket = createS3Object();

          // Create the oldFileEndPoint which defines the file to be copied
          var oldFileEndPoint = fileFolderName + '/' + oldFileName;
          // Create the newFileEndPoint which defines the file's end state
          var newFileEndPoint = fileFolderName + '/' + newFileName;

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
                console.dir(success);
                resolve(success);
              }
            });
          });
        }

        function deleteFile(fileName, folderName) {
          var bucket = createS3Object();
          var params = {
            Bucket: 'equirect-photos',
            Key: folderName + '/' + fileName
          };

          return $q(function(resolve, reject){
            bucket.deleteObject(params, function(err, success){
              if(err){
                console.log(err, err.stack);
                reject(err);
              } else {
                console.dir(success);
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
                    .catch(function(err){

                    });
            });
        }

        return {
          s3: {
            equirectPhotos:{
              renameFile: renameFile
            }
          }
        };
    }
  ]);
