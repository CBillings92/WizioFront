angular.module('UnitApp')
.controller('UnitDisplayCtrl', [
    '$scope',
    '$sessionStorage',
    '$state',
    'lodash',
    'ApartmentGetSetSvc',
    function($scope, $sessionStorage, $state, lodash, ApartmentGetSetSvc){
        //collect data from event emitter
        //first
        //$scope.sessionStorage = $sessionStorage;
        //store in apartmentSearch last search results stored on sessionStorage
        $scope.sessionStorage = $sessionStorage;
        $scope.apartmentSearch = $sessionStorage.apartmentSearch;

        $scope.$on('searchFinished', function(event, data){
            console.dir(data);
            $scope.apartmentSearch = data;
        });
        console.dir($scope.sessionStorage.apartmentSearch);


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
