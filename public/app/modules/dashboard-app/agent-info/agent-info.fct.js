angular.module('DashboardApp')
    .factory('AgentInfoFct', [
        '$resource',
        '$q',
        'TokenSvc',
        'ModalBuilderFct',
        function ($resource, $q, TokenSvc, ModalBuilderFct) {

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
                        var key = 'profile-photos/' + user.firstName + '_' + user.lastName + '_' + user.id + '.png';
                        // file, key, bucket, region
                        AWSFct.s3.profilePhotos.uploadphoto(file, key, false).then(function(response) {

                            key = AWSFct.utilities.modifyKeyForEnvironment(key);
                            $resource(apiurl + 'user/update-user-profile-photo').save({
                                awsProfilePhotoUrl: "https://cdn.wizio.co/" + key,
                                id: user.id
                            }, function(response) {
                                return resolve();
                            })
                        });

                    } else {
                        ModalBuilderFct.buildSimpleModal("", "OK", "Error", 'Please select a valid file.').then(function(result) {
                            return resolve();
                        });
                    }
                })
            }


            function savePhoneNumber(phoneNumber) {
                return $q(function(resolve, reject){
                    $resource(apiurl + 'user/update-user-phone-number').save({
                        phoneNumber: phoneNumberInput.value,
                        id: user.id
                    }, function(response) {

                        ModalBuilderFct.buildSimpleModal("", "OK", "Success", "Your phone number has been updated to: " + phoneNumberInput).then(function(result) {
                            return;
                        });

                    })
                })
            }

            return {
                saveProfilePhoto: saveProfilePhoto
            }
        }
    ])
