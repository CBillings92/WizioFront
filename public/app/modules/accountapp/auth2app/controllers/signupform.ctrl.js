angular.module('AccountApp')
    .controller('SignupFormCtrl', [
        '$scope',
        '$state',
        '$uibModal',
        '$uibModalInstance',
        '$window',
        '$resource',
        'ModalSvc',
        'TokenSvc',
        'data',
        'WizioConfig',
        'UserRegistrationSvc',
        'ModalBuilderFct',
        'AuthFct',
        function($scope, $state, $uibModal, $uibModalInstance, $window, $resource, ModalSvc, TokenSvc, data, WizioConfig, UserRegistrationSvc, ModalBuilderFct, AuthFct) {
            //Set a standard, local user object to save for local authentication
            $scope.waitlist = false;
            $scope.user = {};
            $scope.hasRegistered = false;
            //data comes from previous modal
            $scope.data = data;
            var stripetoken;
            var handler = $window.StripeCheckout.configure({
                key: WizioConfig.stripe_test_key,
                image: 'https://s3.amazonaws.com/stripe-uploads/acct_16XvxPDqEKTsTxvomerchant-icon-1471400059126-Untitled-1.png',
                locale: 'auto',
                token: function stripecb(token) {
                    stripetoken = token;
                    console.dir("1");
                    stripetoken.userid = TokenSvc.decode().id;
                    console.dir("2");
                    $resource(WizioConfig.baseAPIURL + "user/subscribe")
                    .save(stripetoken, function(response) {
                        return response;
                    });
                }
            })

            //the back button functionality
            function backstep() {
                return $uibModalInstance.close('backStep');
            }

            function closeModal() {
                return $uibModalInstance.close('ok');
            }

            function save() {
                console.dir("CALLED TWIE");
                if ($scope.waitlist) {

                } else {
                    var passwordOne = $scope.user.password;
                    var passwordTwo = $scope.user.passwordConfirm;
                    var passwordsMatch;

                    passwordsMatch = AuthFct.confirmPasswords(passwordOne, passwordTwo);
                    if (passwordsMatch) {
                        //assign user type
                        $scope.user = AuthFct.setUserType($scope.user, data);
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
                                'The two passwords you typed do not match'
                            )
                            .then(function(result) {
                                return;
                            });
                        return;
                    }
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
