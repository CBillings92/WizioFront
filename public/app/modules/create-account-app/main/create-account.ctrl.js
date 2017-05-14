angular.module('CreateAccountApp')
    .controller('CreateAccountCtrl', [
        '$scope',
        '$state',
        'CreateAccountFct',
        '$window',
        'WizioConfig',
        'TokenSvc',
        '$resource',
        function($scope, $state, CreateAccountFct, $window, WizioConfig, TokenSvc, $resource) {
            //test
            $scope.signupInvite = $state.current.name === "Signup.Invite" ? true : false;

            $scope.submit = function() {
                var subscription;

                if ($scope.user.password != $scope.user.passwordConfirm) {

                    ModalBuilderFct.buildSimpleModal("", "OK", "Error", 'Your passwords do not match!').then(function(result) {
                        return;
                    });

                    return;
                }

                var user = $scope.user;
                if ($scope.signupInvite) {
                    user.invitePubId = $state.params.invitePubId;
                } else {
                    subscription = $scope.chosenSubscription;
                }
                //    user.accountType = 'local';

                SubscriptionFct.post.saveNewUser(user, subscription).then(function(response) {
                    $state.go('Account.Dashboard');
                });
            };
            $scope.invitationSignup = $state.current.name === 'Signup.Invite' ? true : false;
            $scope.getPlan = function() {
                    console.log($scope.chosenSubscription);
                    return $scope.chosenSubscription == '2';
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
                    stripetoken.total_users = $scope.total_users;
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
