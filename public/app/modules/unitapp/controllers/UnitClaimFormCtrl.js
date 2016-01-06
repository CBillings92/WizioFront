angular.module('UnitApp')
    .controller('UnitClaimFormCtrl', [
        '$scope',
        'ApartmentModel',
        'SmartSearchSvc',
        'UnitCreateSvc',
        'ModalSvc',
        'TokenSvc',
        'ApartmentClaimGetSetSvc',
        'WizioConfig',
        function($scope, ApartmentModel, SmartSearchSvc, UnitCreateSvc, ModalSvc, TokenSvc, ApartmentClaimGetSetSvc, WizioConfig) {
            $scope.selectOptions = {
                beds: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                baths: [1, 2, 3],
                livingSpaces: [0, 1, 2, 3],
                pets: ['Pets Acceptable', 'Only Dogs and Cats', 'Only Cats', 'Only Small Animals', 'No Pets'],
                utilities: ['Hot Water', 'Electric', 'Cable', 'Internet', 'Heat', 'Gas'],
                amenities: ['Central Air', 'Gym', 'Pool'],
                laundry: ['In Unit', 'In Building', 'None'],
                elevator: ['Yes', 'No']

            };
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
            $scope.unitEntered = function(apartmentIndex, unitIndex) {

                ApartmentModel.claimApi().save(null, $scope.apartmentArray[apartmentIndex][unitIndex], function(data) {
                    if (!data.created) {
                        //create defaults object for modalsvc
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
                        //use newly created object to make a modal
                        ModalSvc.showModal(modalDefaults, {}).then(function(response) {
                            if (response === 'Do not use data') {
                                $scope.apartmentArray[apartmentIndex][unitIndex].id = data.apartment.id;
                                return;
                            } else {

                                delete $scope.apartmentArray[apartmentIndex][unitIndex].unitNum;
                                console.dir(data.apartment);
                                for(var key in data.apartment){
                                    if(data.apartment.hasOwnProperty(key)){
                                        $scope.apartmentArray[apartmentIndex][unitIndex] = data.apartment[key];
                                    }
                                };
                                console.dir($scope.apartmentArray);
                                // $scope.apartmentArray[apartmentIndex][unitIndex] = data.apartment;
                                return;
                            }

                        });
                    } else {
                        var i;
                        var keys = Object.keys(data.apartment);
                        for (i = 0; i < keys.length; i++) {
                            $scope.apartmentArray[apartmentIndex][unitIndex][keys[i]] = data.apartment[keys[i]];
                        }
                        // $scope.apartmentArray[apartmentIndex][unitIndex] = data.apartment;
                        console.dir($scope.apartmentArray);
                        return;
                    };

                });
                //ApartmentModel.api().save()
            };
            //if unit number is not null and not undefined
            //search database for the address and the unit number
            //if the address exists, build the form and input the current data
            //else build out an empty form
            $scope.addressEntered = function(apartmentIndex) {
                UnitCreateSvc.parseGeocodeData($scope.apartmentArray[apartmentIndex].address, null, function(err, apartment) {
                    //store apartment object from geocoder in fullApartment object
                    referenceArray[apartmentIndex] = apartment;
                    for (var i = 0; i < $scope.apartmentArray[apartmentIndex].length; i++) {
                        $scope.apartmentArray[apartmentIndex][i] = apartment;
                    }
                    console.dir($scope.apartmentArray[apartmentIndex]);
                    //set this object in sessionStorage
                    ApartmentClaimGetSetSvc.set(apartment, 'ApartmentClaims');
                });
            };
            //FUNCTION - add unit
            //create a new unitNum input box
            $scope.addUnit = function(addressIndex) {
                $scope.apartmentArray[addressIndex].push({});
                var lastIndex = $scope.apartmentArray[addressIndex].length - 1;
                $scope.apartmentArray[addressIndex][lastIndex] = referenceArray[addressIndex];
                console.dir($scope.apartmentArray);
                console.dir($scope.apartmentArray[addressIndex]);


            };


            //FUNCTION - add Address
            //create a new address input box
            $scope.addAddress = function() {
                referenceArray.push({});
                $scope.apartmentArray.push([]);
            };

            //FUNCTION - copy apartment form
            //create a new apartment form and copy the data into it
            $scope.copyUnit = function(apartmentIndex, unitIndex) {
                //assign apartment we'll be handling to shorter variable for readability
                var unitToCopy = $scope.apartmentArray[apartmentIndex][unitIndex];

                var apartmentClone = {};
                apartmentClone.copy = true;
                var i;
                var keys = Object.keys(unitToCopy);
                for (i = 0; i < keys.length; i++) {
                    apartmentClone[keys[i]] = unitToCopy[keys[i]];
                }
                var descriptionsClone = {};
                var descriptionKeys = Object.keys(unitToCopy.Descriptions);
                var j;
                for (j = 0; j < descriptionKeys.length; j++) {
                    if (unitToCopy.Descriptions[keys[i]] == 'description' || 'UserId' || 'userType' || 'ApartmentId') {
                        descriptionsClone[keys[i]] = unitToCopy.Descriptions[keys[i]];
                    }
                }
                apartmentClone.Descriptions = descriptionsClone;
                $scope.apartmentArray[apartmentIndex].push(apartmentClone);

            };

            $scope.removeUnit = function(apartmentIndex, unitIndex) {
                console.dir($scope.apartmentArray);

            };

            $scope.removeAddress = function(apartmentIndex) {
                delete $scope.apartmentArray[apartmentIndex];
            };

            $scope.submit = function() {
                for (var i = 0; i < $scope.apartmentArray.length; i++) {
                    for (var j = 0; j < $scope.apartmentArray[i].length; j++) {
                        /*
                            Lots of reassignment...
                            create a new descriptionObj object on the Apartment
                            store the description on that object
                            Store the apartmentId on that Object
                            Store the userId on that Object
                            Store the userType on that object
                        */
                        $scope.apartmentArray[i][j].Descriptions.ApartmentId = $scope.apartmentArray[i][j].id;
                        $scope.apartmentArray[i][j].Descriptions.UserId = TokenSvc.decode().id;
                        $scope.apartmentArray[i][j].Descriptions.userType = TokenSvc.decode().userType;
                    }
                }
                ApartmentClaimGetSetSvc.reset('ApartmentClaims');
                ApartmentModel.claimApi().save({
                    action: 'finalize'
                }, $scope.apartmentArray, function(response) {});
            };

        }
    ]);
