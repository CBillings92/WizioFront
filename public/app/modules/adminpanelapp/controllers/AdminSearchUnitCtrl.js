angular.module('AdminPanelApp')
.controller('AdminSearchUnitCtrl', [
    '$scope',
    'ApartmentSearchSvc',
    'SmartSearchSvc',
    function ($scope, ApartmentSearchSvc, SmartSearchSvc) {
        $scope.filters = {
            beds: null,
            baths: null,
            minPrice: null,
            maxPrice: null
        };
        $scope.search = function() {
            //service in shared/services
            //pass in search string
            //SECOND ARG IS UNIT NUM
            //THIRD ARG FILTERS
            ApartmentSearchSvc.searchApartment($scope.searchString, $scope.unitNum, $scope.filters, function(err, data){
                $scope.$emit('passToSiblingAdminApp', {name:'updateUnitData', data: data});
            });
        };
        //smart search/typeahead functionality
        $scope.getLocation = function(val) {
            return SmartSearchSvc.smartSearch(val);
        };
    }
]);
