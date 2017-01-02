angular.module('SearchApp')
    .controller('SearchResultsListCtrl', [
        '$scope',
        '$sessionStorage',
        function($scope, $sessionStorage) {
            $scope.apartments = $sessionStorage.apartmentSearch;

        }
    ]);
