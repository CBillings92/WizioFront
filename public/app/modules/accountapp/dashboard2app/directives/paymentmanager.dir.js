angular.module('AccountApp')
    .directive('paymentManagerDirv', function() {
      return {
        templateUrl: 'public/app/modules/accountapp/dashboard2app/views/paymentmanager.view.html',
        controller: 'PaymentManagerCtrl',
        scope: {
          plan: "@",
          costPerMonth: "@"
        },
        restrict: 'E'
    };
});
