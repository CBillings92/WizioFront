angular.module('ApartmentDetailsApp')
    .controller('ApartmentDetailsCtrl', [
        '$scope',
        '$stateParams',
        '$sessionStorage',
        'lodash',
        'ApartmentGetSetSvc',
        'ApartmentResource',
        'AuthFct',
        'ModalSvc',
        function($scope, $stateParams, $sessionStorage, lodash, ApartmentGetSetSvc, ApartmentResource, AuthFct, ModalSvc) {
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
                    var modalDefaults = {
                        backdrop: true,
                        keyboard: true,
                        modalFade: true,
                        templateUrl: 'public/viewtemplates/public/profileform.html',
                        controller: 'ProfileCtrl'
                    };
                    var modalOptions = {
                        closeButtonText: 'Cancel',
                        actionButtonText: 'Delete Customer',
                        headerText: 'Delete ',
                        bodyText: 'Are you sure you want to delete this customer?'
                    };
                    ModalSvc.showModal(modalDefaults, modalOptions).then(function(result){
                        console.dir(result);

                    });
                } else {

                }
            };
        }
    ]);
