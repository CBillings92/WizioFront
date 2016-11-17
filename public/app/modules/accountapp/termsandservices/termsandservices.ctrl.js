angular.module('AccountApp')
    .controller('TermsAndServicesCtrl', [
        '$scope',
        '$uibModalInstance',
        function($scope, $uibModalInstance){
        $scope.pass = false;
        $scope.allChecked = false;
        $scope.showContinue = function() {

            var termsChecked = document.getElementById('terms').checked;
            var nextChecked = document.getElementById('next').checked;
            var lastChecked = document.getElementById('last').checked;
            if(
                termsChecked
                && nextChecked
                && lastChecked
            ) {
                $scope.allChecked = true;
                console.dir($scope.allChecked);
            }
        };

        $scope.testfunc = function(){
            $uibModalInstance.close('success');
        }
    }
    ])
