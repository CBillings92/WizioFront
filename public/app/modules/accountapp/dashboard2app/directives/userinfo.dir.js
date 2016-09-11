angular.module('AccountApp')
    .directive('userInfoDir', function() {
      return {
        templateUrl: 'public/app/modules/accountapp/dashboard2app/views/userinfo.view.html',
        controller: 'UserInfoCtrl',
        scope: {
          test: '@'
        },
        restrict: 'E'
    };
});
