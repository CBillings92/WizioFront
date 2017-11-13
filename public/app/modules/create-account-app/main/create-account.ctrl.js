angular.module('CreateAccountApp')
    .controller('CreateAccountCtrl', [
        '$scope',
        '$state',
        'CreateAccountFct',
        '$window',
        'WizioConfig',
        'TokenSvc',
        '$resource',
        'ModalBuilderFct',
        function($scope, $state, CreateAccountFct, $window, WizioConfig, TokenSvc, $resource, ModalBuilderFct) {
            //
            $scope.numUsersNotNeeded = true;
            $scope.signupInviteFlag = $state.current.name === "Signup.Invite" ? true : false;

            $scope.submit = function() {
                var subscription;
                var user = $scope.user;
                if (user.password != user.passwordConfirm) {
                    ModalBuilderFct.buildSimpleModal("", "OK", "Error", 'Your passwords do not match!').then(function(result) {
                        return;
                    });
                    return;
                }
                if($scope.signupInviteFlag === false) {
                    if (user.code != "931422") {
                        ModalBuilderFct.buildSimpleModal("", "OK", "Error", 'You do not have the correct signup code!').then(function(result) {
                            return;
                        });
                        return;
                    }
                }


                // Check if the user was invited or if it's a new registration
                if ($scope.signupInviteFlag) {
                    user.invitePubId = $state.params.invitePubId;
                } else {
                    subscription = $scope.chosenSubscription;
                }



                CreateAccountFct.post.saveNewUser(user, subscription).then(function(response) {
                    $state.go('Account.Dashboard');
                });
            };
            $scope.getPlan = function() {
                return $scope.chosenSubscription = '2';
            }


            var stripetoken;
            var handler = $window.StripeCheckout.configure({
                key: WizioConfig.stripe_test_key,
                image: 'https://s3.amazonaws.com/stripe-uploads/acct_16XvxPDqEKTsTxvomerchant-icon-1471400059126-Untitled-1.png',
                locale: 'auto',
                token: function stripecb(token) {
                    stripetoken = token;
                    stripetoken.userid = TokenSvc.decode().id;
                    stripetoken.user = TokenSvc.decode();
                    stripetoken.plan_id = $scope.chosenSubscription;
                    stripetoken.total_users = 1;
                    $resource(WizioConfig.baseAPIURL + "user/subscribe")
                    .save(stripetoken, function(response) {
                        return response;
                    });
                }
            });
            //
            // handler.open({
            //     name: 'Wizio Inc.,',
            //     description: 'Subscribe below:',
            //     zipCode: true,
            //     // email: $scope.user.email,
            // });
        }
    ]);
