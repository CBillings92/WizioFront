angular.module('UnitApp')
.controller('UnitDisplayCtrl', [
    '$scope',
    '$sessionStorage',
    '$state',
    'lodash',
    'ApartmentGetSetSvc',
    function($scope, $sessionStorage, $state, lodash, ApartmentGetSetSvc){
        //collect data from event emitter
        $scope.sessionStorage = $sessionStorage;
        $scope.$on('searchFinished', function(event, data){
            console.dir(data);
            $scope.apartmentSearch = data;
        });
        $scope.apartmentSearch = $sessionStorage.apartmentSearch;

        $scope.apartmentSelected = function(id){
            var apartment = lodash.find($scope.apartmentSearch, {id: id});
            if(apartment !== undefined){
                ApartmentGetSetSvc.set(apartment, "apartmentSelected");
                $state.go('Unit.Details', {id: id});
            } else {
                alert('Error: Apartment not loaded properly');
            }
            console.dir(apartment);
        };
    }
]);
