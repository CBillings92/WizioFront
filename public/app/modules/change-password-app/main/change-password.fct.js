angular.module('AccountApp')
    .factory('ChangePasswordFct', [
        'WizioConfig',
        '$q',
        '$resource',
        function(WizioConfig, $q, $resource) {

            var api = {
                get: {
                    email: sendEmailForPasswordReset
                },
                post: {

                },
                update: {
                    password: updatePassword
                },
                delete: {

                }
            }

            function sendEmailForPasswordReset(email) {
                return $q(function(resolve, reject){
                    $resource(WizioConfig.baseAPIURL + 'user/password/:email')
                    .get({email: email})
                    .$promise
                    .then(function(response){
                        return resolve(response);
                    })
                })
            }

            function updatePassword(userData) {
                return $q(function (resolve, reject) {
                    $resource(WizioConfig.baseAPIURL + 'user/password', {
                        'update': { method:'PUT' }
                    }).update(userData)
                    .$promise
                    .then(function(user){
                        resolve(user);
                    })
                    .catch(function(err){

                    })
                })
            }
            return {
                api: api
            }
    }])
