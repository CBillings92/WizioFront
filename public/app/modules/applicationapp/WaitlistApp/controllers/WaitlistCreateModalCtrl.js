angular.module('ApplicationApp')
.controller('WaitlistCreateModalCtrl', [
    '$scope',
    'FlexGetSetSvc',
    function($scope, FlexGetSetSvc){

        $scope.apartment = FlexGetSetSvc.get('ApartmentWaitlistingTo');
        console.dir($scope.apartment.beds);
        $scope.apartmentSlotsModal = [];
        var requestInfoOutbound = {
           apartmentInfo: null,
           users: null,
           owner: null
           };
        var waitlistArray = [];

        //create an array of user objects to store emails in for roomates.
        //subtracting one to account for the fact that we already have the]
        //logged in user's email address. Store him as the owener.
        for(var i = 1; i <= $scope.apartment.maxResidency - 1; i++){
          var userObj = {
           id: i
         };
         //push a userObj with enough slots for the waitlist for the apartment
         $scope.apartmentSlotsModal.push(userObj);
         waitlistArray.push(userObj);
       }


       $scope.waitlistSignup = function(){
           var apartmentObj = {
               apartmentId: $scope.apartment.id,
               apartmentMaxResidency: $scope.apartment.maxResidency
           };
           requestInfoOutbound.apartmentInfo = apartmentObj;
           requestInfoOutbound.users = waitlistArray;
           console.dir(requestInfoOutbound);
           waitlist.save(requestInfoOutbound, function(result, status){
               console.dir(result);
           });
       };

        $scope.ok = function() {
            $modalInstance.close('ok');

        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    }
])
