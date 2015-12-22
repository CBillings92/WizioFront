angular.module('UnitApp')
.controller('UnitClaimFormCtrl', [
    '$scope',
    'ApartmentModel',
    'SmartSearchSvc',
    'UnitCreateSvc',
    'ModalSvc',
    'ApartmentClaimGetSetSvc',
    'WizioConfig',
    function ($scope, ApartmentModel, SmartSearchSvc, UnitCreateSvc, ModalSvc, ApartmentClaimGetSetSvc, WizioConfig) {
        $scope.apartmentArray = [];
        var referenceArray = [];
        //create an address array. These arrays house the full apartment units
        /*
            ex:
                [
                    [
                        {address: 175 Amory St, unitNum:1, data: data, data:data,...}
                        {address: 175 Amory St, unitNum:2, data:data, data:data...}
                    ]
                ]
        */
        $scope.apartmentArray.push([]);
        //create a unit in an array that represents an address
        referenceArray.push({});
        //smart bar code
        $scope.getLocation = function(val) {
            /*
                pass second string variable to specify where to store googel geocoding API results from search bar.
            */
            return SmartSearchSvc.smartSearch(val, 'Staging-ApartmentClaims');
        };
        //findOrCreateUnit
        $scope.unitEntered = function(apartmentIndex, unitIndex){
            //assign apartment we'll be handling to shorter variable for readability
            unitEntered = $scope.apartmentArray[apartmentIndex][unitIndex];
            //store the apartment object from the google geocoder in the unitEntered
            console.dir(referenceArray[apartmentIndex]);
            unitEntered.fullApartment = referenceArray[apartmentIndex];
            //store the unitNum on the apartent geocoder object
            unitEntered.fullApartment.unitNum = unitEntered.unitNum;
            //final apartment to send to the database
            var finalApartment = unitEntered.fullApartment;
            ApartmentModel.claimApi().save(null, finalApartment, function(data){
                console.dir(data);
                console.dir(finalApartment);
                if(!data.created){
                    var modalDefaults = {
                        backdrop: true,
                        keyboard: true,
                        modalFade: true,
                        templateUrl: WizioConfig.UnitViewsURL + 'UnitVerifyModal.html',
                        controller: 'UnitVerifyModalCtrl',
                        resolve: {
                            modalData: function() {
                                return data.apartment;
                            }
                        }
                    };
                    ModalSvc.showModal(modalDefaults, {}).then(function(response){
                        console.dir(response);
                        if(response === 'Do not use data'){
                            return;
                        } else {
                            $scope.apartmentArray[apartmentIndex][unitIndex] = data.apartment;
                            return;
                        }

                    });
                }

            });
            //ApartmentModel.api().save()
        };
            //if unit number is not null and not undefined
            //search database for the address and the unit number
            //if the address exists, build the form and input the current data
            //else build out an empty form
        $scope.addressEntered = function(apartmentIndex){
            UnitCreateSvc.parseGeocodeData($scope.apartmentArray[apartmentIndex].address, null, function(err, apartment){
                //store apartment object from geocoder in fullApartment object
                referenceArray[apartmentIndex] = apartment;
                for(var i = 0; i < $scope.apartmentArray[apartmentIndex].length; i++){
                    $scope.apartmentArray[apartmentIndex][i].fullApartment = apartment;
                }
                //set this object in sessionStorage
                ApartmentClaimGetSetSvc.set(apartment, 'ApartmentClaims');
            });
        };
        //FUNCTION - add unit
        //create a new unitNum input box
        $scope.addUnit = function(addressIndex){
            $scope.apartmentArray[addressIndex].push({});
        };


        //FUNCTION - add Address
        //create a new address input box
        $scope.addAddress = function(){
            referenceArray.push({});
            $scope.apartmentArray.push([])
        };

        //FUNCTION - copy apartment form
        //create a new apartment form and copy the data into it
        $scope.copyUnit = function(apartmentIndex, unitIndex){
            //assign apartment we'll be handling to shorter variable for readability
            var unitToCopy = $scope.apartmentArray[apartmentIndex][unitIndex];

            var apartmentClone = {};
            var i;
            var keys = Object.keys(unitToCopy);
            for(i = 0; i < keys.length; i++ ){
                apartmentClone[keys[i]] = unitToCopy[keys[i]];
            }
            console.dir(apartmentClone);
            $scope.apartmentArray[apartmentIndex].push(apartmentClone);

        };

        $scope.removeUnit = function(apartmentIndex, unitIndex){
            console.dir($scope.apartmentArray);
            delete $scope.apartmentArray[apartmentIndex].splice(unitIndex, 1);
            console.dir($scope.apartmentArray);

        };

        $scope.removeAddress = function(apartmentIndex){
            delete $scope.apartmentArray[apartmentIndex];
        };

    }
]);
