angular.module('Models')
    .factory('BusinessModel', [
        '$q',
        function($q) {
            var Business = {
                init: init
            }

            function init(businessObj) {
                this.businessName = businessObj.businessName;
                this.siteURL = businessObj.siteURL;
                this.stripe_cus_id = businessObj.stripe_cus_id;
                this.purchaser_id = businessObj.purchaser_id;
            }

            function cancelSubscription() {
                //handle cancel subscription
            }

            function modifyPaymentMethod() {
                //handle payment method modifications
            }

            function saveNewBusiness() {

            }

            function modifyBusiness() {

            }

            function setup(user, business) {
                console.dir(user);
                console.dir(setup);
                // return new $q(function(resolve, reject) {
                //     $resource(WizioConfig.baseAPIURL + 'business/setup')
                //         .save({user:user,business:business}, function(response) {
                //             resolve(response);
                //         })
                // });
            }

            function api() {
                return {
                    setup: setup
                }
            }
            return Business;
        }
    ])
