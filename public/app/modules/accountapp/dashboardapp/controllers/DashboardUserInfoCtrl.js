angular.module('AccountApp')
.controller('DashboardUserInfoCtrl', [
    '$scope',
    '$state',
    'TokenSvc',
    'ModalSvc',
    'WizioConfig',
    function($scope, $state, TokenSvc, ModalSvc, WizioConfig){
        $scope.accountInfo = TokenSvc.decode();
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
            var modal = modalDefaults('md', WizioConfig.AccountDashboardViewsURL + 'feedback.modal.view.html', 'FeedbackModalCtrl', {});

            ModalSvc.showModal(modal, {})
                .then(function(results){

                });
        };
        
    }
]);
