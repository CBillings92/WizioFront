angular.module('AccountApp')
    .controller('TermsAndServicesCtrl', [
        '$scope',
        function($scope){

        $scope.pass = false;

        $scope.showContinue = function() {

            if (document.getElementById('terms').checked && document.getElementById('next').checked && document.getElementById('last').checked) {
                document.getElementById('contbutton').style.visibility = "visible";
            }
        };
    }
    ])
