angular.module('AccountApp')
    .controller('SubscriptionTileCtrl', [
        '$scope',
        function($scope){

            // console.log(subscription.features)

            $scope.changeSelected = function(selectedid) {

                $('.selected-plan').removeClass('selected-plan');

                var result = document.getElementById(selectedid);
                var target = angular.element(result);
                target.addClass("selected-plan");
            };


        }
    ]);
