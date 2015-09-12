angular.module('ApartmentDetailsApp')
    .controller('ApartmentDetailsCtrl', [
        '$scope',
        '$stateParams',
        '$sessionStorage',
        '$modal',
        'lodash',
        'ApartmentGetSetSvc',
        'ApartmentResource',
        'AuthFct',
        function($scope, $stateParams, $sessionStorage, $modal, lodash, ApartmentGetSetSvc, ApartmentResource, AuthFct) {
            //LOAD APARTMENT DATA START
            //get apartment ID from URL
            var apartmentURLID = $stateParams.id;
            //get apartment data from apartmentGetSet service
            var apartment = ApartmentGetSetSvc.get();
            //get apartment ID from session storage if it exists
            var apartmentSessionStorageID = null;
            if ($sessionStorage.apartmentSelected) {
                apartmentSessionStorageID = $sessionStorage.apartmentSelected.id;
            }
            //check if apartment from apartmentGetSet and sessionStorage match apartment requested in URL
            if (apartment !== null && apartment.id === apartmentURLID && apartmentSessionStorageID === apartmentURLID) {
                $scope.apartment = apartment;
            } else if (apartmentSessionStorageID == apartmentURLID) {
                $scope.apartment = $sessionStorage.apartmentSelected;
                console.dir($scope.apartment);
            } else {
                ApartmentResource.get({
                    id: apartmentURLID
                }, function(data) {
                    console.dir(data);
                    $scope.apartment = data;
                    ApartmentGetSetSvc.set(data);
                    console.dir($scope.apartment);
                });
            }
            //LOAD APARTMENT DATA end
            $scope.apply = function() {
                var user = AuthFct.getTokenClaims();
                if (user.ProfileId === null) {
                    var modalInstance = $modal.open({
                        templateUrl: 'public/viewtemplates/public/createprofilemodal.html',
                        controller: 'ProfileCreateModalCtrl',
                        size: 'md',
                    });
                    modalInstance.result.then(function() {
                        console.dir("IN RESULT");
                    }, function() {
                        console.dir("IN MODAL DISMISSED");
                    });
            } else {

            }
        };
    }]);
