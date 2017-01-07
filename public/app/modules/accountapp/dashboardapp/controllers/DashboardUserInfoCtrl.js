angular.module('AccountApp')
.controller('DashboardUserInfoCtrl', [
    '$scope',
    '$state',
    'TokenSvc',
    'ModalSvc',
    'ModalBuilderFct',
    'WizioConfig',
    function($scope, $state, TokenSvc, ModalSvc, ModalBuilderFct, WizioConfig){
        $scope.accountInfo = TokenSvc.decode();
        console.dir($scope.accountInfo);
        //reusable function for creating modalDefaults for ModalSvc
        var modalDefaults = function(size, templateUrl, controller, modalData) {
            return {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                size: size,
                templateUrl: templateUrl,
                controller: controller,
                resolve: {
                    modalData: function() {
                        return modalData;
                    }
                }
            };
        };

        $scope.claimApartments = function(){
            $state.go('Unit.Claim');
        };
        $scope.leaveFeedback = function leaveFeedback(){
            ModalBuilderFct.buildComplexModal('md', WizioConfig.AccountDashboardViewsURL + 'feedback.modal.view,html', 'FeedbackModalCtrl', {})
            .then(function(response){

            });
        };

    }
]);
