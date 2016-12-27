angular.module('SearchApp')
    .controller('SearchCtrl', [
        '$scope',
        'SmartSearchSvc',
        function($scope, SmartSearchSvc) {
        // ADD TYPE AHEAD CODE
        //smart search/typeahead functionality
        $scope.getLocation = function(val) {
            return SmartSearchSvc.smartSearch(val);
        };

        // ADD SUBMIT SEARCH ADDRESS function
        $scope.submitSearch = function() {

        }
    }]);
