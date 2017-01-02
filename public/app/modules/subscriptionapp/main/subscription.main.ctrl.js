angular.module('AccountApp')
    .controller('SubscriptionMainCtrl', [
      '$scope',
      'SubscriptionFct',
      function($scope, SubscriptionFct) {
    

        $scope.submit = function(){
          var user = $scope.user;
          user.accountType = 'local';
          var subscription = $scope.chosenSubscription;

            SubscriptionFct.post.saveNewUser(user, subscription)
            .then(function(response){
              console.log(response);
            });
        };
    }])
