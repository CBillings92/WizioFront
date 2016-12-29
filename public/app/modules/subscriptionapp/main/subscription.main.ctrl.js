angular.module('AccountApp')
    .controller('SubscriptionMainCtrl', [
      '$scope',
      'SubscriptionFct',
      function($scope, SubscriptionFct) {
        alert('hello');
        $scope.test = function(){
            console.dir('test');
        }
        $scope.submit = function(){
          var user = $scope.user;
          user.accountType = 'local';
          var subscription = $scope.chosenSubscription;
            SubscriptionFct.post.saveNewUser(user, subscription)
            .then(function(response){
              console.dir(response);
            });
        }
    }])
