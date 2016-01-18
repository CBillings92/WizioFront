angular.module('UnitApp')
    .controller('UnitClaimFormCtrl2', [
        '$scope',
        '$state',
        'ApartmentModel',
        'DescriptionModel',
        'SmartSearchSvc',
        'UnitFct',
        function($scope, $state, ApartmentModel, DescriptionModel, SmartSearchSvc, UnitFct) {
            //use a ternary IF operator to figure out what state we're on
            $scope.singleUnit = ($state.current.name === 'Unit.Edit' || $state.current.name === 'Unit.Claim') ? true : false;

            //load the selectOptions from the unit factory
            $scope.selectOptions = UnitFct.selectOptions;

            //get the geocoded location for the smart bar
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val, 'Staging-ApartmentClaims');
            };

            //setup the containingArray for housing addresses with units
            /*
                the containing array houses arrays of objects. The arrays
                it houses are representative of an address, and each objects
                within the array is representative of a unit at that addresses
                EX:
                [
                    [
                        {address: 175 Amory St ... ..., unitNum: 2, beds:...}
                        {address: 175 Amory St ... ..., unitNum: 1, beds:...}
                    ]
                ]
            */
            $scope.containingArray = [
                [
                    {

                    }
                ]
            ];
            //Whenever we add a new address, we want to push a new empty array
            //into containingArray with an empty object to setup the first unit
            $scope.addAddress = function() {
                $scope.containingArray.push([{

                }]);
            };
            //adding a unit just adds an empty object to the current address array
            $scope.addUnit = function(addressIndex) {
                $scope.containingArray[addressIndex].push({});
                var apartmentToCopy = $scope.containingArray[addressIndex][0];
                for(var key in apartmentToCopy){
                    
                }
            };

            $scope.onUnitBlur = function(addressIndex, unitIndex) {
                //grab the data on the form located at the correct address array and the correct Unit object (the street and unit number)
                var unitAddressInfo = $scope.containingArray[addressIndex][unitIndex].apartmentData;
                //build a new Apartment instance with it
                var newApartment = ApartmentModel.build(unitAddressInfo);
                //call the getGeocodeData prototype function to get all needed geocoded data
                newApartment.getGeocodeData(function(response){
                    $scope.containingArray[addressIndex][unitIndex] = newApartment;
                });
            };

            $scope.onDescriptionBlur = function(addressIndex, unitIndex){
                var apartment = $scope.containingArray[addressIndex][unitIndex];
                console.dir(apartment);
                var descriptionText = apartment.Descriptions.description;

                var newDescription = new DescriptionModel(null, null, descriptionText);
                newDescription.getAssociatonData();
                apartment.Descriptions = newDescription;
                console.dir(newDescription);
            };

            $scope.submit = function(){

            };

        }
    ]);
