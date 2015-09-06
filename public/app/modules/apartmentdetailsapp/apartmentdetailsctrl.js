angular.module('ApartmentDetailsApp')
  .controller('ApartmentDetailsCtrl', [
    '$scope',
    '$stateParams',
    '$sessionStorage',
    'lodash',
    'ApartmentGetSetSvc',
    'ApartmentResource',
    function($scope, $stateParams, $sessionStorage, lodash, ApartmentGetSetSvc, ApartmentResource){
        //get apartment ID from URL
        var apartmentURLID = $stateParams.id;
        //get apartment data from apartmentGetSet service
        var apartment = ApartmentGetSetSvc.get();
        //get apartment ID from session storage if it exists
        var apartmentSessionStorageID = null;
        if($sessionStorage.apartmentSelected){
            apartmentSessionStorageID = $sessionStorage.apartmentSelected.id;
        }
        //check if apartment from apartmentGetSet and sessionStorage match apartment requested in URL
        if(apartment !== null && apartment.id === apartmentURLID && apartmentSessionStorageID === apartmentURLID){
            $scope.apartment = apartment;
        } else if(apartmentSessionStorageID == apartmentURLID){
            $scope.apartment = $sessionStorage.apartmentSelected;
            console.dir($scope.apartment);
        } else {
            ApartmentResource.get({id: apartmentURLID}, function(data){
                console.dir(data);
                $scope.apartment = data;
                ApartmentGetSetSvc.set(data);
                console.dir($scope.apartment);
            });
        }
    }
  ]);
