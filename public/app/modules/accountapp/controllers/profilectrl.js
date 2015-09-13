angular.module('AccountApp')
.controller('ProfileCtrl', [
    '$scope',
    'ApartmentGetSetSvc',
    'AuthFct',
    'ApplicationResource',
    function($scope, ApartmentGetSetSvc, AuthFct, ApplicationResource){
        var apartment = ApartmentGetSetSvc.get('apartmentApplyingTo');
        var user = AuthFct.getTokenClaims();
        console.dir(apartment);


        //create a function that collects all the form data
        //do any kind of validation on form data you need
        //pass data to API through angular resource
        //route user to new page
    }
]);
