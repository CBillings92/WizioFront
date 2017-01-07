angular.module('AccountApp')
    .directive('userInfoDir', function() {
      return {
        templateUrl: 'public/app/modules/accountapp/user-info-app/user-info.view.html',
        controller: 'UserInfoCtrl',
        scope: {
          test: '@'
        },
        restrict: 'E'
    };
});
