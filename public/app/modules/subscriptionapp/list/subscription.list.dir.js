angular.module('AccountApp')
    .directive('subscriptionListDir', function() {
      return {
        templateUrl: 'public/app/modules/subscriptionapp/list/subscription.list.html',
        controller: 'SubscriptionListCtrl',
        scope: {
          chosenSubscription: '=chosenSubscription'
        },
        restrict: 'EA'
      }
    })
