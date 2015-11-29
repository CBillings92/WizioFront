angular.module('AccountApp')
.controller('DashboardLLUnitListCtrl', [
    '$scope',
    '$state',
    function ($scope, $state) {
        //navigate to editApartments form
        $scope.editApartments = function(){

        };
        //go to claimApartments form
        $scope.claimApartments = function(){
            $state.go('')
        };
        //indexNum comes fromt HTML form
        //open email now modal. Shoud allow landlords to select who to email
        //and provide pre-made emails to send.
        $scope.emailNow = function(indexNum){

        };

        //navigate to applicants page. indexNum comes from HTML form
        //form should contain applications for apartments.
        $scope.viewApplicants = function(indexNum){

        };

    }
]);
