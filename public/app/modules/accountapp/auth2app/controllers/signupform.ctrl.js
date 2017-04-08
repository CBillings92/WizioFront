angular.module('AccountApp')
    .controller('SignupFormCtrl', [
        '$scope',
        '$state',
        '$uibModalInstance',
        '$window',
        '$resource',
        'ModalSvc',
        'TokenSvc',
        'modalData',
        'WizioConfig',
        'UserRegistrationSvc',
        'ModalBuilderFct',
        'AuthFct',
        function($scope, $state, $uibModalInstance, $window, $resource, ModalSvc, TokenSvc, modalData, WizioConfig, UserRegistrationSvc, ModalBuilderFct, AuthFct) {
            alert("no?");
            //Set a standard, local user object to save for local authentication
            $scope.waitlist = false;
            $scope.user = {};
            $scope.hasRegistered = false;
            //data comes from previous modal
            $scope.data = modalData;
            var stripetoken;

            // LAUNCH STRIPE MODAL
            // var handler = $window.StripeCheckout.configure({
            //     key: WizioConfig.stripe_test_key,
            //     image: 'https://s3.amazonaws.com/stripe-uploads/acct_16XvxPDqEKTsTxvomerchant-icon-1471400059126-Untitled-1.png',
            //     locale: 'auto',
            //     token: function stripecb(token) {
            //         stripetoken = token;
            //         stripetoken.userid = TokenSvc.decode().id;
            //         stripetoken.user = TokenSvc.decode();
            //         $resource(WizioConfig.baseAPIURL + "user/subscribe")
            //         .save(stripetoken, function(response) {
            //             return response;
            //         });
            //     }
            // });

            //the back button functionality
            function backstep() {
                return $uibModalInstance.close('backStep');
            }

            function closeModal() {
                return $uibModalInstance.close('ok');
            }
            function save() {
                    var passwordOne = $scope.user.password;
                    var passwordTwo = $scope.user.passwordConfirm;
                    var passwordsMatch = AuthFct.confirmPasswords(passwordOne, passwordTwo);

                    if (passwordsMatch) {
                        //assign user type
                        $scope.user = AuthFct.setUserType($scope.user, modalData);
                        //save user to DB
                        UserRegistrationSvc.saveUser($scope.user, function(data) {
                            if (data.status === "ERR") {
                                ModalBuilderFct.buildSimpleModal(
                                    "Close",
                                    "OK",
                                    "Email Not valid",
                                    'That email is already in use by an account holder. Please try another email or reset your password if you forgot it.'
                                ).then(function(result) {
                                    return;
                                });
                            } else {
                                $scope.hasRegistered = true;
                                handler.open({
                                    name: 'Wizio Inc.,',
                                    description: 'Subscription:',
                                    zipCode: true,
                                    email: $scope.user.email,
                                    amount: 10000
                                });

                            }

                        });
                    } else {
                        ModalBuilderFct.buildSimpleModal(
                                'Close',
                                'OK',
                                'Password Error',
                                'Passwords do not match!'
                            )
                            .then(function(result) {
                                return;
                            });
                        return;
                    }

            }
            $scope.backStep = backstep;

            $scope.closeModal = closeModal;

            $scope.save = save;

            $scope.login = function() {
                return $uibModalInstance.close('login');
            };

        }
    ]);
