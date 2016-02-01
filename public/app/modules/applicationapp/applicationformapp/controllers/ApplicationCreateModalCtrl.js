angular.module('ApplicationApp')
.controller('ApplicationCreateModalCtrl', [
    '$scope',
    '$modalInstance',
    'FlexGetSetSvc',
    'TokenSvc',
    'ApplicationResource',
    function($scope, $modalInstance, FlexGetSetSvc, TokenSvc, ApplicationResource){

        $scope.apartment = FlexGetSetSvc.get('ApartmentApplyingTo');
        $scope.apartmentSlotsModal = [];
        var requestInfoOutbound = {
           apartmentInfo: null,
           users: null,
           owner: null
           };
        $scope.applicationArray = [];
        $scope.trial = [];

        //create an array of user objects to store emails in for roomates.
        //subtracting one to account for the fact that we already have the]
        //logged in user's email address. Store him as the owener.
        for(var i = 1; i <= $scope.apartment.beds - 1; i++){
          var userObj = {
           id: i
         };
         //push a userObj with enough slots for the application for the apartment
         $scope.apartmentSlotsModal.push(userObj);
       }

        $scope.applicationSignup = function() {
            var apartmentObj = {
                apartmentId: $scope.apartment.id,
                apartmentMaxResidency: $scope.apartment.maxResidency
            };
            requestInfoOutbound.apartmentInfo = apartmentObj;
            requestInfoOutbound.users = $scope.applicationArray;
            requestInfoOutbound.owner = TokenSvc.decode().id;
            requestInfoOutbound.ownerEmail = TokenSvc.decode().email;
            ApplicationResource.base.save(requestInfoOutbound, function(result, status){
                $modalInstance.close('ok');
            });

        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
]);
