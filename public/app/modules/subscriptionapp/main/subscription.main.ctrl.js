angular.module('AccountApp')
    .controller('SubscriptionMainCtrl', [
        '$scope',
        '$state',
        'SubscriptionFct',
        '$window',
        'WizioConfig',
        'TokenSvc',
        '$resource',
        function($scope, $state, SubscriptionFct, $window, WizioConfig, TokenSvc, $resource) {
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





            $scope.submit = function() {
                var user = $scope.user;
                var subscription;



                if($scope.invitationSignup){
                    user.invitePubId = $state.params.invitePubId;
                } else {
                    user.subscription = $scope.chosenSubscription;


                }

                SubscriptionFct.post.saveNewUser(user, subscription)
                    .then(function(response) {
                      $state.go('Account.Dashboard');
                    });
            };
        }
    ]);
