/*
  Contains functionality related to interfacing with AWS S3
*/
angular.module ('AWSApp').factory ('AWSFct', [
  '$q',
  '$resource',
  'WizioConfig',
  function ($q, $resource, WizioConfig) {
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
      return $q (function (reject, resolve) {
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
            return resolve (S3Object);
          })
          .catch (function (err) {
            cleanAWSConfigs ();
            return reject ({
              status: 'err',
              message: 'Could not create S3 object at this time',
            });
          });
      });
    }

    /* copyFile - SUMMARY
          Rename a file in an S3 bucket - happnes by copying the file with
          the new name and then deletes the old file
        */
    function copyFile (newFileName, oldFileName, fileFolderName) {
      return $q (function (reject, resolve) {
        // create a new S3 object from AWS library
        createS3Object ()
          .then (function (bucket) {
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
          })
          .catch (function (err) {
            return reject (err);
          });
      });
    }

    /* deleteFile - SUMMARY
            delete a file from AWS S3 buckets
        */
    function deleteFile (fileName, folderName) {
      return $q (function (resolve, reject) {
        createS3Object ()
          .then (function (bucket) {
            var params = {
              Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
              // Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
              Key: folderName + '/' + fileName + '.JPG',
            };
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
          })
          .catch (function (err) {
            return reject (err);
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
        if (!file) {
          return reject ({status: 'err', message: 'Missing file'});
        }
        createS3Object ()
          .then (function (bucket) {
            var params = {
              Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
              Key: key,
              ContentType: 'png',
              Body: file,
            };
            bucket.putObject (params, function (err, data) {
              cleanAWSConfigs ();
              if (err) {
                return reject ({
                  status: 'err',
                  message: "Could not execute operation 'putObject' at this time",
                  rawError: err,
                });
              } else {
                return resolve ({status: 'success'});
              }
            });
          })
          .catch (function (err) {
            return reject ({
              status: 'err',
              message: 'Could not create S3 Bucket Object',
              rawError: err,
            });
          });
      });
    }

    function uploadTourPhoto (file, key, bucket, region) {
      return $q (function (resolve, reject) {
        if (!file) {
          return reject ({status: 'err', message: 'Missing file'});
        }
        createS3Object ().then (function (bucket) {
          var params = {
            Bucket: WizioConfig.S3_EQUIRECTPHOTOS_BUCKET,
            Key: key,
            ContentType: 'JPG',
            Body: file,
          };
          bucket.putObject (params, function (err, data) {
            cleanAWSConfigs ();
            resolve (data);
          });
        });
      });
    }

    function uploadProfileFile (file, key, bucket) {
      return new $q (function (resolve, reject) {
        //check if the file exists
        if (!file) {
          return reject ({status: 'err', message: 'No file'});
        }
        createS3Object ().then (function (bucket) {
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
        });
        //parameters to be sent to S3 - key is the path in the S3 bucket

        // var bucket = bucket ? bucket : 'equirect-photos';
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
