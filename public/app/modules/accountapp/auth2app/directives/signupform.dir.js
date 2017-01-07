angular.module('AccountApp')
    .directive('signupDir', function() {
        return {
            templateUrl: 'public/app/modules/accountapp/auth2app/views/signup.view.html',
            controller: 'SignupCtrl',
            scope: {},
            restrict: 'E'
        };
    });
