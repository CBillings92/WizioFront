angular.module('AdminPanelApp')
.controller('AdminSearchUnitCtrl', [
    '$scope',
    'ApartmentSearchSvc',
    'SmartSearchSvc',
    function ($scope, ApartmentSearchSvc, SmartSearchSvc) {
        console.dir("WHY2");
        $scope.search = function() {
            //service in shared/services
            //pass in search string
            ApartmentSearchSvc.searchApartment($scope.searchString, function(err, data){
                console.dir(data);
                console.dir(err);
                $scope.$emit('passToSiblingAdminApp', {name:'updateUnitData', data: data});
            });
        };
        //smart search/typeahead functionality
        $scope.getLocation = function(val) {
            return SmartSearchSvc.smartSearch(val);
        };
    }
]);
