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
        'lodash',
        function($scope, $modalInstance, $sessionStorage, SmartSearchSvc, FlexGetSetSvc, ApartmentClaimGetSetSvc, modalData, UnitCreateSvc, lodash) {
            $scope.modalOptions = modalData;
            //create constructor function for an Apartment
            var Apartment = function(trackingID, address, unitNum) {
                this.address = address;
                this.unitNum = unitNum;
            };
            //Array that will hold apartment reference objects to turn into real
            //apartment objects with unit numbers
            $scope.finalApartmentArray = [];
            //Adding the first apartment to the reference array to kick off the form
            //when the user first loads the modal
            $scope.finalApartmentArray[0] = [(new Apartment(null, null))];

            //smart bar code
            $scope.getLocation = function(val) {
                /*
                    pass second string variable to specify where to store googel geocoding API results from search bar.
                */
                return SmartSearchSvc.smartSearch(val, 'Staging-ApartmentClaims');
            };
            //on selecting the add address button
            $scope.addAddress = function() {
                //create a new, blank Apartment object
                var apartment = new Apartment(null, null);
                //store taht apartment object in an array
                var apartmentArray = [apartment];
                //push that array into the referenceArray array
                $scope.finalApartmentArray.push(apartmentArray);
            };
            /*
                addressEntered : ON-BLUR - when address bar loses focus get the last object
                that was returned from the smart search's google API geocoder
                which was stored in 'Staging-ApartmentClaims' in sessionStorage
                Store that object in ApartmentClaims array in sessionStorage
            */
            $scope.addressEntered = function(apartmentIndex){
                UnitCreateSvc.parseGeocodeData($scope.finalApartmentArray[apartmentIndex].address, null, function(err, apartment){
                    //store apartment object from geocoder in fullApartment object
                    $scope.finalApartmentArray[apartmentIndex].fullApartment = apartment;
                    //set this object in sessionStorage
                    ApartmentClaimGetSetSvc.set(apartment, 'ApartmentClaims');
                });
            };
            $scope.unitEntered  = function(apartmentIndex){
                //get the last unit entered into the apartment array
                var lastUnitEntered = $scope.finalApartmentArray[apartmentIndex].pop();
                //get the full apartment object that we got from the geocoder
                var fullApartment = $scope.finalApartmentArray[apartmentIndex].fullApartment;
                //create an empty object for the impending clone war..er...object clone
                var objectClone = {};
                //initialize i variable for for loop
                var i;
                //store the keys of the fullApartment object in a variable
                var keys = Object.keys(fullApartment);
                //loop through all of the keys and make a clone object
                for(i = 0; i < keys.length; i++){
                    objectClone[keys[i]] = fullApartment[keys[i]];
                }
                //store the objectClone of the fullApartment on the current unit
                lastUnitEntered.fullApartment = objectClone;
                //store the unitNumber on the last entered unit in the fullApartment
                lastUnitEntered.fullApartment.unitNum = lastUnitEntered.unitNum;
                //push this new object back onto the array we popped it off of
                $scope.finalApartmentArray[apartmentIndex].push(lastUnitEntered);
            };
            $scope.addUnit = function(apartmentIndex) {
                $scope.finalApartmentArray[apartmentIndex].push(new Apartment(null,null));

                //$scope.finalApartmentArray[($scope.finalApartmentArray.length - 1)].unitNum = null;
                //$scope.finalApartmentArray[apartmentIndex].unitNumArray.push(null);
                console.dir($scope.finalApartmentArray);


            };
            $scope.removeUnit = function(apartmentArrayIndex, unitIndex){
                console.dir($scope.finalApartmentArray[apartmentArrayIndex]);
                //console.dir($scope.finalApartmentArray[apartmentArrayIndex][unitIndex]);
                console.dir(unitIndex);
                $scope.finalApartmentArray[apartmentArrayIndex].splice(unitIndex, 1);
            };
            $scope.addRange = function(apartmentIndex) {
                for (var i = 0; i < $scope.highNum; i++) {
                    $scope.finalApartmentArray[apartmentIndex].unitNumArray.push(null);
                }
            };

            $scope.search = function() {
                for(var i = 0; i < $scope.finalApartmentArray.length; i++){
                    delete $scope.finalApartmentArray[i].address;
                    delete $scope.finalApartmentArray[i].fullApartment;

                }
                var finalData = lodash.flatten(lodash.map($scope.finalApartmentArray, lodash.values));
                finalData = lodash.pluck(finalData, 'fullApartment');


                //search database

                //navigate to apartmentEdit form
            };
        }
    ]);
