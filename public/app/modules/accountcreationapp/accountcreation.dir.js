angular.module('AccountApp')
    .directive('accountCreationFormDir',
        function() {
          return {
            templateUrl: 'public/app/modules/accountcreationapp/accountcreation.form.html',
            controller: 'AccountCreationFormCtrl',
            scope: {
                user: '=user'
            },
            restrict: 'E'
        };
  });
