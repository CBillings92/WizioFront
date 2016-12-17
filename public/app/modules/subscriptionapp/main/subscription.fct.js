/*
    Factory for handling retrieving and posting data to our Subscription API
*/
angular.module('AccountApp')
    .factory('SubscriptionFct', [
        function() {

            // All of our get requests
            var get = {
                subscriptions: getSubscriptions,
                subscribers: subscribers,
                subscriber: subscriber
            }

            // All of our post requests
            var post = {
                subscription: postSubscription,
                subscriber: postSubscriber
            }

            // Pull subscription information from database
            function getSubscriptions(){
                // Pull from database eventually
                var subscriptions = [
                    {
                        name: 'Agent',
                        costPerMonth: 100,
                    },
                    {
                        name: 'Broker',
                        costPerMonth: 200,
                    },
                    {
                        name: 'Office',
                        costPerMonth: 300,
                    }
                ];
                return subscriptions;
            }

            function getSubscribers() {

            }

            function getSubscriber() {

            }

            function postSubscribtion() {

            }

            return {
                get: get,
                post: post,
            };
}]);
