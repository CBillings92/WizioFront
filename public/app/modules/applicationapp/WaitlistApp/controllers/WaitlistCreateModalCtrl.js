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
        for(var i = 1; i <= $scope.apartment.maxResidency - 1; i++){
          var userObj = {
           id: i
         };
         $scope.apartmentSlotsModal.push(userObj);
         waitlistArray.push(userObj);
       }
       $scope.waitlistSignup = function(){
           var apartmentObj = {
               apartmentId: apartment.id,
               apartmentMaxResidency: apartment.maxResidency
           };
           requestInfoOutbound.apartmentInfo = apartmentObj;
           requestInfoOutbound.users = waitlistArray;
           console.dir(requestInfoOutbound);
           waitlist.save(null, requestInfoOutbound, function(result, status){
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
