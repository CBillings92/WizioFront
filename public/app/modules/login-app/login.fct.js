/*
    Login modal factory. Handles API requests and launching
    unauthorized modal
*/
angular.module('LoginApp')
    .factory('LoginFct', [
        '$resource',
        '$rootScope',
        '$q',
        'WizioConfig',
        'ModalBuilderFct',
        'TokenSvc',
        function ($resource, $rootScope, $q, WizioConfig, ModalBuilderFct, TokenSvc) {

            var api = {
                loginEndPoint : $resource(WizioConfig.baseAPIURL + 'user/authenticate')
            }

            function displayModal(modalToDisplay) {
                switch (modalToDisplay) {
                    case 'unauthorized':
                        ModalBuilderFct.buildSimpleModal(
                            "",
                            "OK",
                            "Login Failed",
                            'Please check your username and password.'
                        )
                        .then(function (result) {
                            return;
                        });
                        break;
                    default:

                }
            };

            function requestLogin(userData) {
                return $q(function(resolve, reject) {
                    api.loginEndPoint.save(userData, function(result){
                        if (result.success) {
                            resolve('success');
                        } else {
                            reject();
                        }
                    });
                });
            }

            return {
                requestLogin: requestLogin,
                displayModal: displayModal
            }
        }
    ])
