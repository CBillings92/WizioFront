angular.module('AccountApp')
    .directive('changePassword', function() {
      return {
        templateUrl: 'public/app/modules/change-password-app/change-password-button/change-password.view.html',
        controller: 'ChangePasswordCtrl',
        scope: {
            changePassword: '=changePassword'
        },
        restrict: 'EA'
      }
    })
