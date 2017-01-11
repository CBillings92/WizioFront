angular.module('AccountApp')
    .directive('changePasswordFormDir', function() {
      return {
        templateUrl: 'public/app/modules/change-password-app/change-password-form/change-password.form.view.html',
        controller: 'ChangePasswordCtrl',
        scope: {},
        restrict: 'EA'
      }
    })
