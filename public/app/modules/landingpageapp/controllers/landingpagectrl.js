angular.module('LandingPageApp')
    .controller('LandingPageCtrl', [
        '$scope',
        '$state',
        'SmartSearchSvc',
        'SearchFct',
        function($scope, $state, SmartSearchSvc, SearchFct) {
            $scope.data = {};
            $scope.filters = {
                beds: null,
                baths: null,
                minPrice: null,
                maxPrice: null
            };
            //smart search/typeahead functionality
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };
            //search function
            $scope.search = function() {
                console.dir($scope.data);
                SearchFct.search(
                    {concatAddr: $scope.data.searchString},
                    $scope.filters,
                    function(response) {
                        $state.go('Unit.Display');
                    });
            };
        }
    ]);
