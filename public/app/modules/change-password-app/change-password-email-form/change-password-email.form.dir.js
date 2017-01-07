angular.module('AccountApp')
    .directive('changePasswordEmailFormDir', function() {
      return {
        templateUrl: 'public/app/modules/change-password-app/change-password-email-form/change-password-email-form.view.html',
        controller: 'ChangePasswordEmailFormCtrl',
        scope: {},
        restrict: 'EA'
      }
    })
