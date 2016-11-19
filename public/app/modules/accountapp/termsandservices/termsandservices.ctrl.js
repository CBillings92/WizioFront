angular.module('AccountApp')
    .controller('TermsAndServicesCtrl', [
        '$scope',
        '$uibModalInstance',
        function($scope, $uibModalInstance) {
            // flag for displaying continue button on modal
            $scope.pass = false;

            // Each time a check box is clicked, run this function
            $scope.showContinue = function() {
                var termsChkBx = document.getElementById('terms').checked;
                var nextChkBx = document.getElementById('next').checked;
                var lastChkBx = document.getElementById('last').checked;
                var continueButton = document.getElementById('contbutton');
                if (termsChkBx && nextChkBx && lastChkBx) {

                    continueButton.style.visibility = "visible";
                }
            };

            $scope.ok = function() {
                $uibModalInstance.close('success');
            }
        }

    ])
