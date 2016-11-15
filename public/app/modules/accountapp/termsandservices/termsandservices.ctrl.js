angular.module('AccountApp')
    .controller('TermsAndServicesCtrl', [
        '$scope',
        function($scope){
        var getElemByID = document.getElementById;


        $scope.pass = false;

        $scope.showContinue = function() {

            var termsChecked = getElemByID('terms').checked;
            var nextChecked = getElemByID('next').checked;
            var lastChecked = getElemByID('last').checked;
            if(
                document.getElementById('terms').checked
                && document.getElementById('next').checked
                && document.getElementById('last').checked
            ) {
                document.getElementById('contbutton').style.visibility = "visible";
            }
        };
    }
    ])
