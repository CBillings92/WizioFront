angular.module('AccountApp')
    .controller('TermsAndServicesCtrl', [
        '$scope',
        function($scope){
        $scope.pass = false;

        $scope.showContinue = function() {

            var termsChecked = document.getElementById('terms').checked;
            var nextChecked = document.getElementById('next').checked;
            var lastChecked = document.getElementById('last').checked;
            if(
                termsChecked
                && nextChecked
                && lastChecked
            ) {
                document.getElementById('contbutton').style.visibility = "visible";
            }
        };
    }
    ])
