angular.module('AccountApp')
    .controller('DashboardMainCtrl', [
        '$scope',
        '$timeout',
        'TokenSvc',
        'ModalSvc',
        'WizioConfig',
        function($scope, $timeout, TokenSvc, ModalSvc, WizioConfig) {

            var userType = TokenSvc.decode().userType;
            console.dir(userType);
            if(userType == 1){
                $scope.applicationSelected = true;
                $scope.favoritesSelected = false;

                $scope.toggleapplication = function(){
                    if (!$scope.applicationSelected) {
                        $scope.applicationSelected = !$scope.applicationSelected;
                        $scope.favoritesSelected = !$scope.favoritesSelected;
                    }
                };
                $scope.toggleFavorites = function(){
                    if (!$scope.favoritesSelected) {
                        $scope.applicationSelected = !$scope.applicationSelected;
                        $scope.favoritesSelected = !$scope.favoritesSelected;
                    }
                };

                $scope.gridViewSelected = true;
                $scope.listViewSelected = false;

                $scope.toggleGridView = function(){
                    if (!$scope.gridViewSelected) {
                        $scope.gridViewSelected = !$scope.gridViewSelected;
                        $scope.listViewSelected = !$scope.listViewSelected;
                    }
                };
                $scope.toggleListView = function(){
                    if (!$scope.listViewSelected) {
                        $scope.gridViewSelected = !$scope.gridViewSelected;
                        $scope.listViewSelected = !$scope.listViewSelected;
                    }
                };
            } else if(userType == 2){

            }

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
            ModalSvc.showModal({}, modalOptions).then(function(result) {
                if (result === 'ok') {
                    var modalOptionsUnitSearch = {
                        closeButtonText: "Close",
                        actionButtonText: "Search",
                    };
                    var UnitViews = WizioConfig.UnitViewsURL;
                    var modalDefaultsUnitSearch = modalDefaults('md', UnitViews + 'UnitClaimSearch.html', 'UnitClaimSearchCtrl', modalOptionsUnitSearch);

                    ModalSvc.showModal(modalDefaultsUnitSearch, modalOptionsUnitSearch).then(function(result) {

                    });
                }
            });
            //get all the other apartment information
        }
    ]);
