angular.module('LandingPageApp')
    .controller('LandingPageCtrl', [
        '$scope',
        '$state',
        'SmartSearchSvc',
        'SearchFct',
        function($scope, $state, SmartSearchSvc, SearchFct) {
            $scope.data = {};
            //smart search/typeahead functionality
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val);
            };
            //search function
            $scope.search = function() {
                SearchFct.search(
                    $scope.data.searchString,
                    $scope.filters,
                    function(response) {
                        $state.go('Unit.Display');
                    });
            };
        }
    ]);
