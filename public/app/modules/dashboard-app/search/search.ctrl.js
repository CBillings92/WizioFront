angular.module('DashboardApp')
    .controller('DashboardSearchCtrl', [
        '$scope',
        'LoadingSpinnerFct',
        function ($scope, LoadingSpinnerFct) {
            // On initiating a search show the loading spinner
            $scope.$on('searchInitiated', function(event, name) {
                $scope.loading = true;
            });

            // on a search returned, show results to page
            $scope.$on('searchReturned', function(event, results) {
                LoadingSpinnerFct.hide('account-dashboard-search-loader')
                var apartments = [];
                for (var i = 0; i < results.length; i++) {
                    apartments.push(results[i].Apartment);
                }
                $scope.apartments = apartments;
                $scope.loading = false;
            });
        }
    ])
