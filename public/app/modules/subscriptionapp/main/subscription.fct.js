/*
    Factory for handling retrieving and posting data to our Subscription API
*/
angular.module('AccountApp')
    .factory('SubscriptionFct', [
        '$resource',
        '$q',
        'WizioConfig',
        function($resource, $q, WizioConfig) {
            var resources = {
                user: {
                    registration: WizioConfig.baseAPIURL + 'user/registration'
                }
            };

            // All of our get requests
            var get = {
                subscriptions: getSubscriptions,
            };

            var post = {
                saveNewUser: saveNewUser
            };

            // Pull subscription information from database
            function getSubscriptions() {
                return $q(function(resolve, reject) {
                    $resource(WizioConfig.baseAPIURL + 'subscriptionbase')
                        .query(function(response) {
                            response[0].features = [
                                '25 Active Tours',
                                'Free Tour Requests during Trial Period',
                                'Tour Creation Tool (Coming soon)'
                            ];
                            response[1].features = [
                                '50 Active Tours',
                                'Free Tour Requests during Trial Period',
                                'Tour Creation Tool (Coming soon)',
                            ];
                            response[2].features = [
                                'Unlimited Active Tours',
                                'Wizio API Access',
                                'Free Tour Requests during Trial Period',
                                'Tour Creation Tool (Coming soon)',
                                'Up to 25 Users ($5+ per month per additional user)'
                            ];
                            return resolve(response);
                        });
                });
            }

            function saveNewUser(user, subscription) {
                var dataForAPI = {
                    user: user,
                    subscription: subscription
                };
                return $q(function(response, resolve) {
                    $resource(resources.user.registration)
                        .save(dataForAPI, function(response) {
                            return resolve(response);
                        });
                });
            }

            return {
                get: get,
                post: post
            };
        }
    ]);
