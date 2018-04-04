angular.module("DashboardApp").factory("AgentInfoFct", [
  "$resource",
  "$q",
  "TokenSvc",
  "ModalBuilderFct",
  "WizioConfig",
  "AWSFct",
  function($resource, $q, TokenSvc, ModalBuilderFct, WizioConfig, AWSFct) {
    /**
     * Saves a profile photo for the current user
     * @param  {file} file Profile photo for the user
     * @return {promise}      Returns a promise
     */
    function saveProfilePhoto(file) {
      return $q(function(resolve, reject) {
        var user = TokenSvc.decode();
        //check if the file exists
        if (file) {
          var key = "profile-photos/" + user.firstName + "_" + user.lastName + "_" + user.id + ".png";
          // file, key, bucket, region
          AWSFct.s3.profilePhotos.uploadphoto(file, key, false).then(function(response) {
            $resource(WizioConfig.baseAPIURL + "user/update-user-profile-photo").save(
              {
                awsProfilePhotoUrl: "https://cdn.wizio.co/" + key,
                id: user.id
              },
              function(response) {
                ModalBuilderFct.buildSimpleModal("", "OK", "Success", "Your profile photo has been updated: ").then(
                  function(result) {
                    return resolve();
                  }
                );
              }
            );
          });
        } else {
          ModalBuilderFct.buildSimpleModal("", "OK", "Error", "Please select a valid file.").then(function(result) {
            return resolve();
          });
        }
      });
    }

    function savePhoneNumber(phoneNumber) {
      return $q(function(resolve, reject) {
        var user = TokenSvc.decode();
        $resource(WizioConfig.baseAPIURL + "user/update-user-phone-number").save(
          {
            phoneNumber: phoneNumber,
            id: user.id
          },
          function(response) {
            ModalBuilderFct.buildSimpleModal(
              "",
              "OK",
              "Success",
              "Your phone number has been updated to: " + phoneNumber
            ).then(function(result) {
              return;
            });
          }
        );
      });
    }

    return {
      saveProfilePhoto: saveProfilePhoto,
      savePhoneNumber: savePhoneNumber
    };
  }
]);
