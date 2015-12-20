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
            //Array that will hold apartment reference objects to turn into real
            //apartment objects with unit numbers
            $scope.apartmentReferenceArray = [];
            //Adding the first apartment to the reference array to kick off the form
            //when the user first loads the modal
            $scope.apartmentReferenceArray[0] = new Apartment(null, null);
            var finalApartmentArray = [];
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
                UnitCreateSvc.parseGeocodeData($scope.apartmentReferenceArray[apartmentIndex].address, null, function(err, apartment){
                    //store apartment object from geocoder in fullApartment object
                    $scope.apartmentReferenceArray[apartmentIndex].push(apartment);
                    //move the unitNumArray into the fullApartment object
                    /*
                    $scope.apartmentReferenceArray[apartmentIndex].fullApartment.unitNums =
                    $scope.apartmentReferenceArray[apartmentIndex].unitNumArray;
                    */
                    //set this object in sessionStorage
                    ApartmentClaimGetSetSvc.set(apartment, 'ApartmentClaims');
                });
            };
            $scope.addUnit = function(apartmentIndex) {
                $scope.apartmentReferenceArray[apartmentIndex].unitNumArray.push(null);
                console.dir($scope.apartmentReferenceArray);


            };
            $scope.addRange = function(apartmentIndex) {
                for (var i = 0; i < $scope.highNum; i++) {
                    $scope.apartmentReferenceArray[apartmentIndex].unitNumArray.push(null);
                }
            };
            $scope.addAddress = function() {
                var apartment = new Apartment(null, null);
                $scope.apartmentReferenceArray.push(apartment);
            };

            $scope.search = function() {
                var finalArray = [];
                for(i = 0; i < $scope.apartmentReferenceArray.length; i++){
                    for(j = 0; j < $scope.apartmentReferenceArray[i].unitNumArray.length; j++){
                        var apartment = $scope.apartmentReferenceArray[i].fullApartment;
                        console.dir($scope.apartmentReferenceArray[i].unitNumArray[j]);
                        apartment.unitNum = $scope.apartmentReferenceArray[i].unitNumArray[j];
                        console.dir(apartment);
                    }
                    //console.dir(finalArray);
                }
                //search database

                //navigate to apartmentEdit form
            };
        }
    ]);
