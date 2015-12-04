angular.module('AccountApp')
    .controller('DashboardMainCtrl', [
        '$scope',
        '$timeout',
        'TokenSvc',
        'ModalSvc',
        'WizioConfig',
        function($scope, $timeout, TokenSvc, ModalSvc, WizioConfig) {
            //get account/user info from the currently active token.
            var accountInfo = TokenSvc.decode();
            //set timeout to wait for child controllers to load.
            $timeout(function() {
                $scope.$broadcast('AccountInfoBroadcast', accountInfo);
            });
            //if no units are claimed, start claim process
            var modalOptions = {
                closeButtonText: "Close",
                actionButtonText: "OK",
                headerText: "Apartment Claims",
                bodyText: "We notice you haven't claimed any apartments yet. Let us walk you through the process!"
            };
            var modalDefaults = function(size, templateUrl, controller, data) {
                return {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    size: size,
                    templateUrl: templateUrl,
                    controller: controller,
                    resolve: {
                        data: function() {
                            return data;
                        }
                    }
                };
            };
            ModalSvc.showModal({}, modalOptions).then(function(result){
                if(result === 'ok'){
                    var modalOptionsUnitSearch = {
                        closeButtonText: "Close",
                        actionButtonText: "Search",
                    };
                    var UnitViews = WizioConfig.UnitViewsURL;
                    var modalDefaultsUnitSearch = modalDefaults('md', UnitViews + 'UnitClaimSearch.html', 'UnitClaimSearchCtrl');

                    ModalSvc.showModal(modalDefaultsUnitSearch, modalOptionsUnitSearch).then(function(result){

                    });
                }
            });
            //get all the other apartment information
        }
    ]);
