angular.module('AccountApp')
    .controller('DashboardMainCtrl', [
        '$scope',
        'TokenSvc',
        'ModalSvc',
        'WizioConfig',
        'DashboardFactory',
        function($scope, TokenSvc, ModalSvc, WizioConfig, DashboardFactory) {
            DashboardFactory.routeToAccount();
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
                $scope.myApplicationsSelected = false;
                $scope.myApartmentsSelected = true;

                $scope.toggleMyApartments = function(){
                    if (!$scope.myApartmentsSelected) {
                        $scope.myApartmentsSelected = !$scope.myApartmentsSelected;
                        $scope.myApplicationsSelected = !$scope.myApplicationsSelected;
                    }
                };
                $scope.toggleMyApplications = function(){
                    if (!$scope.myApplicationsSelected) {
                        $scope.myApplicationsSelected = !$scope.myApplicationsSelected;
                        $scope.myApartmentsSelected = !$scope.myApartmentsSelected;
                    }
                };
            }
        }
    ]);
