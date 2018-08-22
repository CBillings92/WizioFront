/*
  Contains functionality related to interfacing with AWS S3
*/
angular.module ('AWSApp').factory ('AWSFct', [
  '$q',
  '$resource',
  'WizioConfig',
  function ($q, $resource, WizioConfig) {
    // AWS.config.update({accessKeyId: 'AKIAIPGWV5OFR73P3VLQ', secretAccessKey: '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'});
    AWS.config.update ({
      accessKeyId: 'AKIAJKN2QU5DJSYHC7LA',
      secretAccessKey: '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',
    });

    function getKeys () {
      return $q (function (reject, resolve) {
        $resource (WizioConfig.baseAPIURL + 'aws').get (function (response) {
          if (response.status === 'success') {
            return resolve (response);
          } else {
            alert (
              'Could not fetch credentials for authenticating upload. Please try again later'
            );
            return reject ();
          }
        });
      });
    }

    function cleanAWSConfigs () {
      AWS.config.update ({
        accessKeyId: '',
        secretAccesSKey: '',
      });
    }

    function createS3Object (endpoint, region) {
      getKeys ()
        .then (function (response) {
          AWS.config.update ({
            accessKeyId: response.accessKey,
            secretAccessKey: response.secretAccessKey,
          });
          var S3Object = new AWS.S3 ({
            endpoint: endpoint || WizioConfig.CLOUDFRONT_DISTRO_UPLOAD_URL,
            s3BucketEndpoint: true,
            region: region || 'us-east-1',
          });
          return S3Object;
        })
        .catch (function (err) {
          cleanAWSConfigs ();
          return;
        });
    }

    /* copyFile - SUMMARY
          Rename a file in an S3 bucket - happnes by copying the file with
          the new name and then deletes the old file
        */
    function copyFile (newFileName, oldFileName, fileFolderName) {
      // create a new S3 object from AWS library
      var bucket = createS3Object ();
      // Create the oldFileEndPoint which defines the file to be copied
      // var oldFileEndPoint = WizioConfig.S3_EQUIRECTPHOTOS_BUCKET + '/' + fileFolderName + '/' + oldFileName + '.JPG';
      var oldFileEndPoint =
        WizioConfig.S3_EQUIRECTPHOTOS_BUCKET +
        '/' +
        fileFolderName +
        '/' +
        oldFileName +
        '.JPG';
      // Create the newFileEndPoint which defines the file's end state
      var newFileEndPoint = fileFolderName + '/' + newFileName + '.JPG';
      var params = {
        // Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
        Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
        CopySource: oldFileEndPoint,
        Key: newFileEndPoint,
      };
      return $q (function (resolve, reject) {
        bucket.copyObject (params, function (err, success) {
          if (err) {
            console.log (err, err.stack);
            cleanAWSConfigs ();
            reject (err);
          } else {
            cleanAWSConfigs ();
            resolve (success);
          }
        });
      });
    }

    /* deleteFile - SUMMARY
            delete a file from AWS S3 buckets
        */
    function deleteFile (fileName, folderName) {
      var bucket = createS3Object ();
      var params = {
        Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
        // Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
        Key: folderName + '/' + fileName + '.JPG',
      };
      return $q (function (resolve, reject) {
        bucket.deleteObject (params, function (err, success) {
          if (err) {
            console.log (err, err.stack);
            cleanAWSConfigs ();
            reject (err);
          } else {
            cleanAWSConfigs ();
            resolve (success);
          }
        });
      });
    }

    /*
          Workflow function used to rename a file in our S3 buckets.
        */
    function renameFile (newFileName, oldFileName, fileFolderName) {
      // return a promise
      return $q (function (resolve, reject) {
        // copy the file with the new file name first
        copyFile (newFileName, oldFileName, fileFolderName)
          .then (function (response) {
            // delete the old file once the new file is copied
            return deleteFile (oldFileName, fileFolderName);
          })
          .then (function (response) {
            cleanAWSConfigs ();
            resolve (response);
          })
          .catch (function (err) {
            cleanAWSConfigs ();
          });
      });
    }

    function uploadFloorPlanFile (file, key, bucket, region) {
      return new $q (function (resolve, reject) {
        //check if the file exists
        if (file) {
          var bucket = createS3Object ();
          //parameters to be sent to S3 - key is the path in the S3 bucket
          var params = {
            // Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
            Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
            Key: key,
            ContentType: 'png',
            Body: file,
          };

          //save the floorplan to S3
          bucket.putObject (params, function (err, data) {
            cleanAWSConfigs ();
            resolve (data);
          });
        } else {
          cleanAWSConfigs ();
          reject ('Could not reach S3 - Please yell at Cameron');
        }
      });
    }

    function uploadTourPhoto (file, key, bucket, region) {
      return $q (function (resolve, reject) {
        if (file) {
          var bucket = createS3Object ();
          var params = {
            // Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
            Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
            Key: key,
            ContentType: 'JPG',
            Body: file,
          };
          bucket.putObject (params, function (err, data) {
            console.dir (err);
            cleanAWSConfigs ();
            resolve (data);
          });
        }
      });
    }

    function uploadProfileFile (file, key, bucket) {
      return new $q (function (resolve, reject) {
        //check if the file exists
        if (file) {
          var bucket = createS3Object ();
          //parameters to be sent to S3 - key is the path in the S3 bucket

          // var bucket = bucket ? bucket : 'equirect-photos';

          var params = {
            Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
            // Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
            Key: key,
            ContentType: file.type,
            Body: file,
          };
          //save the floorplan to S3
          bucket.putObject (params, function (err, data) {
            cleanAWSConfigs ();
            resolve (data);
          });
        } else {
          cleanAWSConfigs ();
          reject ('Could not reach S3 - Please yell at Cameron');
        }
      });
    }

    return {
      s3: {
        equirectPhotos: {
          renameFile: renameFile,
          uploadFloorPlanFile: uploadFloorPlanFile,
          uploadTourPhoto: uploadTourPhoto,
        },
        profilePhotos: {
          uploadphoto: uploadProfileFile,
        },
      },
    };
  },
]);
