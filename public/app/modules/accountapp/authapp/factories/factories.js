angular.module('AuthApp')
    .factory('AuthFct', [
        '$state',
        '$localStorage',
        '$rootScope',
        '$q',
        'AuthRegistrationResource',
        'AuthLoginResource',
        'TokenSvc',
        function($state, $localStorage, $rootScope, $q, AuthRegistrationResource, AuthLoginResource, TokenSvc) {
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
            /*  SIGNIN()
                signin - used to sign users into our site.
                expects {username: username, password: password}
                uses $q and $promise to handle async with promises
            */
            function signin(data) {
                return $q(function(resolve, reject) {
                    var postRequest = AuthLoginResource.save(data);
                    postRequest.$promise
                        .then(function(result) {
                            $rootScope.isLoggedin = true;
                            $rootScope.userType = TokenSvc.decode().userType;
                            resolve('success');
                        })
                        .catch(function(result) {
                            $rootScope.error = "Failed to sign in!";
                            reject('failed');
                        });
                });
            }

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

            function confirmPasswords(passwordOne, passwordTwo) {
                if (passwordOne === passwordTwo) {
                    return true;
                } else {
                    return false;
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

            function signup(data) {
                return $q(function(resolve, reject) {
                    var registrationRequest = AuthRegistrationResource.save(null, data);
                    registrationRequest.$promise
                        .then(function(result) {
                            resolve(result);
                        })
                        .catch(function(result) {
                            reject(result);
                        });
                });
            }

            return {
                signup: signup,
                signin: signin,
                confirmPasswords: confirmPasswords,
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
