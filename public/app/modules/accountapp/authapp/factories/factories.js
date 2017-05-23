angular.module('AuthApp')
    .factory('AuthFct', [
        '$state',
        '$localStorage',
        '$rootScope',
        '$q',
        'TokenSvc',
        function($state, $localStorage, $rootScope, $q, TokenSvc) {
            //check if a user is logged in
            var isLoggedin = function() {
                var tokenExp = true;
                var token = TokenSvc.getToken();
                if (token === "No Token" || TokenSvc.checkExp(token)) {
                    return false;
                } else {
                    return true;
                }
            };

            function resetEmailResponseHandler(response, email) {
                if (response.status === "ERR") {
                    //set the object that give the modal its default verbiage
                    ModalBuilderFct.buildSimpleModal(
                        'Close',
                        'OK',
                        'Passwor Reset Error',
                        'We could not succesfully send an email to ' + email + '. Please make sure this is the correct email address.'
                    ).then(function(result) {
                        return;
                    });

                } else {
                    //set the object that give the modal its default verbiage
                    ModalBuilderFct.buildSimpleModal(
                        'Close',
                        'OK',
                        'Passwor Reset Email Sent',
                        'An email has been sent to ' + email + ' with instructions on how to reset your password'
                    ).then(function(result) {
                        //FIXME - should we reroute user to landing page?
                        return $state.go('LandingPage');
                    });
                }
            }

            function setUserType(user, isTenant) {
                user.accountType = 'local';
                if (isTenant) {
                    user.userType = 1;
                } else {
                    switch (user.type) {
                        case "Broker/Agent":
                            user.userType = 3;
                            break;
                        case "Property Manager":
                            user.userType = 2;
                            break;
                        default:
                            user.userType = 2;
                    }
                }
                return user;
            }


            return {
                setUserType: setUserType,
                logout: function() {
                    $localStorage.token = null;
                    delete $localStorage.token;
                    $rootScope.isLoggedIn = false;
                    if ($state.current.data.requireLogin) {
                        $state.go('LandingPage');
                        return;
                    }
                    return;
                },
                isLoggedin: isLoggedin
            };
        }
    ]);
