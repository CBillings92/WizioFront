angular.module('UnitApp')
.controller('UnitClaimSearchCtrl', [
    '$scope',
    '$modalInstance',
    'SmartSearchSvc',
    'modalData',
    function($scope, $modalInstance, SmartSearchSvc, modalData){
        $scope.modalOptions = modalData;

        var Apartment = function (trackingID, address, unitNum) {
            this.trackingID = trackingID;
            this.address = address;
            this.unitNumArray = [];
        };
        $scope.apartmentObjArray = [];
        $scope.apartmentObjArray[0] = new Apartment(null, null);

        $scope.getLocation = function(val) {
            return SmartSearchSvc.smartSearch(val);
        };

        $scope.addUnit = function(apartmentIndex){
            $scope.apartmentObjArray[apartmentIndex].unitNumArray.push(null);
        };

        $scope.addRange = function(apartmentIndex){

            for(var i = 0; i < $scope.highNum; i++){
                $scope.apartmentObjArray[apartmentIndex].unitNumArray.push(null);
            }
        };

        $scope.addAddress = function(){
            var apartment = new Apartment(null, null);
            $scope.apartmentObjArray.push(apartment);
        };

        $scope.search = function(){

        };
    }
]);
