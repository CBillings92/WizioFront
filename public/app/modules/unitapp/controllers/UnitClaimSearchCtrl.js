angular.module('UnitApp')
//controller for the search functionality for the apartment claim form form
//for landlords
    .controller('UnitClaimSearchCtrl', [
        '$scope',
        '$modalInstance',
        '$sessionStorage',
        'SmartSearchSvc',
        'FlexGetSetSvc',
        'ApartmentClaimGetSetSvc',
        'modalData',
        'UnitCreateSvc',
        function($scope, $modalInstance, $sessionStorage, SmartSearchSvc, FlexGetSetSvc, ApartmentClaimGetSetSvc, modalData, UnitCreateSvc) {
            $scope.modalOptions = modalData;
            //create constructor function for an Apartment
            var Apartment = function(trackingID, address, unitNum) {
                this.address = address;
                this.unitNumArray = [];
            };
            //Array of apartment objects from form. Start user with one blank apartment
            $scope.apartmentObjArray = [];
            $scope.apartmentObjArray[0] = new Apartment(null, null);

            //smart bar code
            $scope.getLocation = function(val) {
                /*
                    pass second string variable to specify where to store googel geocoding API results from search bar.
                */
                return SmartSearchSvc.smartSearch(val, 'Staging-ApartmentClaims');
            };

            /*
                addressEntered : ON-BLUR - when address bar loses focus get the last object
                that was returned from the smart search's google API geocoder
                which was stored in 'Staging-ApartmentClaims' in sessionStorage
                Store that object in ApartmentClaims array in sessionStorage
            */
            $scope.addressEntered = function(apartmentIndex){
                UnitCreateSvc.parseGeocodeData($scope.apartmentObjArray[apartmentIndex].address, null, function(err, apartment){
                    //store apartment object from geocoder in fullApartment object
                    $scope.apartmentObjArray[apartmentIndex].fullApartment = apartment;
                    //move the unitNumArray into the fullApartment object
                    $scope.apartmentObjArray[apartmentIndex].fullApartment.unitNums =
                    $scope.apartmentObjArray[apartmentIndex].unitNumArray;
                    //set this object in sessionStorage
                    ApartmentClaimGetSetSvc.set(apartment, 'ApartmentClaims');
                });
            };
            $scope.addUnit = function(apartmentIndex) {
                $scope.apartmentObjArray[apartmentIndex].unitNumArray.push(null);
                console.dir($scope.apartmentObjArray);
            };
            $scope.addRange = function(apartmentIndex) {

                for (var i = 0; i < $scope.highNum; i++) {
                    $scope.apartmentObjArray[apartmentIndex].unitNumArray.push(null);
                }
            };

            $scope.addAddress = function() {
                var apartment = new Apartment(null, null);
                $scope.apartmentObjArray.push(apartment);
            };

            $scope.search = function() {
                var finalArray = [];
                for(i = 0; i < $scope.apartmentObjArray.length; i++){
                    console.dir(i);
                    console.dir("__________________________________")
                    for(j = 0; j < $scope.apartmentObjArray[i].unitNumArray.length; j++){
                        var apartment = $scope.apartmentObjArray[i].fullApartment;
                        console.dir(j);
                        console.dir(apartment.unitNums[j]);
                        var unitNum = apartment.unitNums[j];
                        console.dir(unitNum);
                        apartment.unitNum = unitNum;
                        console.dir(apartment.unitNums[j]);
                        console.dir(apartment);
                    }
                    //console.dir(finalArray);
                }
                //search database

                //navigate to apartmentEdit form
            };
        }
    ]);
