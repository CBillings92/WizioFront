angular.module('AccountApp')
    .directive('subscriptionListDir', function() {
      return {
        templateUrl: 'public/app/modules/subscriptionapp/list/subscription.list.html',
        controller: 'SubscriptionListCtrl',
        scope: {},
        restrict: 'EA'
      }
    })
