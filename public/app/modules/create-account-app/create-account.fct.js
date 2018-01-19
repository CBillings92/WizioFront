/*
    Factory for handling retrieving and posting data to our Subscription API
*/
angular.module("CreateAccountApp").factory("CreateAccountFct", [
  "$resource",
  "$q",
  "$state",
  "WizioConfig",
  function($resource, $q, $state, WizioConfig) {
    var resources = {
      user: {
        invitedUser: WizioConfig.baseAPIURL + "user/registration",
        newUser: WizioConfig.baseAPIURL + "user/register/newuser"
      }
    };

    // All of our get requests
    var get = {
      subscriptions: getSubscriptions
    };

    var post = {
      saveNewUser: saveNewUser
    };

    // Pull subscription information from database
    function getSubscriptions() {
      return $q(function(resolve, reject) {
        $resource(WizioConfig.baseAPIURL + "subscriptionbase").query(function(response) {
          response[0].features = [
            "25 Active Tours",
            "Free Tour Requests during Trial Period",
            "Tour Creation Tool (Coming soon)"
          ];
          response[1].features = [
            "50 Active Tours",
            "Free Tour Requests during Trial Period",
            "Tour Creation Tool (Coming soon)"
          ];
          response[2].features = [
            "Unlimited Active Tours",
            "Wizio API Access",
            "Free Tour Requests during Trial Period",
            "Tour Creation Tool (Coming soon)",
            "Up to 25 Users ($5+ per month per additional user)"
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
      return $q(function(resolve, reject) {
        if ($state.current.name === "Signup.Invite") {
          $resource(resources.user.invitedUser).save(dataForAPI, function(response) {
            console.dir(response);
            if (response.success === 1) {
              return resolve(response);
            } else {
              return reject(response.message);
            }
          });
        } else {
          $resource(resources.user.newUser).save(dataForAPI, function(response) {
            if (response.success === 1) {
              return resolve(response);
            } else {
              return reject(response.message);
            }
          });
        }
      });
    }

    return {
      get: get,
      post: post
    };
  }
]);
