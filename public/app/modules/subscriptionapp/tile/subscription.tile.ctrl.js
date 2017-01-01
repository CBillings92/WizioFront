angular.module('AccountApp')
    .controller('SubscriptionTileCtrl', [
        '$scope',
        function($scope){

            $scope.changeSelected = function(selectedid) {

                $('.selected-plan').removeClass('selected-plan');

                var result = document.getElementById(selectedid);
                console.log("yo");
                console.log(result);
                var target = angular.element(result);
                target.addClass("selected-plan");
            };


        }
    ]);
