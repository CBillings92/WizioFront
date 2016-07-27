angular.module('AccountApp')
    .controller('PaymentCtrl', [
        '$scope',
        '$state',
        'TokenSvc',
        'ModalSvc',
        'WizioConfig',
        
        function($scope, $state, TokenSvc, ModalSvc, WizioConfig){

            $scope.accountInfo = TokenSvc.decode();

            // Set your secret key: remember to change this to your live secret key in production
            // See your keys here https://dashboard.stripe.com/account/apikeys
            var stripe = require("stripe")("sk_test_kmz1ru3MIvMYh9BHKGqg5VRQ");

            $scope.subscribe = function() {

                console.log("hello reddit");
                // Set your secret key: remember to change this to your live secret key in production
                // See your keys here https://dashboard.stripe.com/account/apikeys
                var stripe = require("stripe")("sk_test_kmz1ru3MIvMYh9BHKGqg5VRQ");

                // (Assuming you're using express - expressjs.com)
                // Get the credit card details submitted by the form
                var stripeToken = request.body.stripeToken;

                stripe.customers.create({
                    source: stripeToken,
                    plan: "gold",
                    email: "payinguser@example.com"
                }, function(err, customer) {
                    // ...
            });

            };

    }]);
