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
            ApartmentGetSetSvc.checkApartment(function(result) {
                $scope.apartment = result;
            });
            //LOAD APARTMENT DATA end
            $scope.apply = function() {
                var user = AuthFct.getTokenClaims();
                ApartmentGetSetSvc.set($scope.apartment, "apartmentApplyingTo");
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
        }
    ]);
