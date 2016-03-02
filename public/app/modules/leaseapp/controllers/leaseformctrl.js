/*
===========================================================================
Leases and listings are basically the same thing. When a user "lists" an Apartment
they're really just saying "Hey! I'm creating a new lease for this apartment
and opening it to the public. This is what I'm offering!".

A lease has a currentListing key/property that is a boolean value and tells
us if a lease is being listed currently. A lease with a start date that hasn't
begun can be listed as a currentListing
===========================================================================
*/
angular.module('LeaseApp')
    .controller('LeaseFormCtrl', [
        '$scope',
        '$state',
        'TokenSvc',
        'LeaseFct',
        'FlexGetSetSvc',
        function($scope, $state, TokenSvc, LeaseFct, FlexGetSetSvc) {
            //create empty object on scope
            $scope.lease = {};
            //populate the form's select options from Lease Factory
            $scope.selectOptions = LeaseFct.selectLeaseOptions;
            //find out whether we're editing a listing or creating a new one
            $scope.editingListing = $state.current.name === 'Account.Lease.Edit' ? true : false;
            console.dir($scope.editingListing);
            //if we are editing a current listing/upcoming lease
            if($scope.editingListing){
                var leases = FlexGetSetSvc.get('EditCurrentListing').Leases;
                //if there are two leases and the second lease in the array is
                //the current listing, show that on the form to edit
                if(leases.length == 2 && leases[1].currentListing == 1){
                    leases[1].dateStart = new Date(leases[1].dateStart);
                    leases[1].dateEnd= new Date(leases[1].dateEnd);
                    $scope.lease = leases[1];
                } else {
                    leases[0].dateStart = new Date(leases[0].dateStart);
                    leases[0].dateEnd = new Date(leases[0].dateEnd);
                    //otherwise make it the first/only lease
                    $scope.lease = leases[0];
                }
            } else {
                $scope.lease.ApartmentId = FlexGetSetSvc.get('NewLeaseApartmentId');
            }

            //either edits a current lease or saves a current lease.
            $scope.formSubmission = function(action){
                console.dir($scope.lease);
                console.dir(action);
                $scope.lease.UserId = TokenSvc.decode().id;
                LeaseFct[action]($scope.lease, function(response){
                    //handle repsonse;
                });
            };
        }
    ]);
