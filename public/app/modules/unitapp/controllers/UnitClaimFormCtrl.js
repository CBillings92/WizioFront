angular.module('UnitApp')
    .controller('UnitClaimFormCtrl', [
            '$scope',
            '$state',
            'UnitFct',
            'ApartmentModel',
            'SmartSearchSvc',
            'UnitCreateSvc',
            'ModalSvc',
            'TokenSvc',
            'ApartmentClaimGetSetSvc',
            'WizioConfig',
            function($scope, $state, UnitFct, ApartmentModel, SmartSearchSvc, UnitCreateSvc, ModalSvc, TokenSvc, ApartmentClaimGetSetSvc, WizioConfig) {

                //check what state we are in and change the UI accordingly
                $scope.singleUnit = ($state.current.name === "Unit.Edit" || $state.current.name === "Unit.Create") ? true : false;

                $scope.selectOptions = UnitFct.selectOptions;


                $scope.apartmentArray = [[]];
                //used to hold reference objects for google analytics data for apartments
                //begins with an empty object to start form with one empty apartment
                var referenceArray = [{}];

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
                //smart bar code
                $scope.getLocation = function(val) {
                    //second argument specifies name for sessionStorage variable
                    return SmartSearchSvc.smartSearch(val, 'Staging-ApartmentClaims');
                };

                //create a new address input box
                $scope.addAddress = function() {
                    //push empty placeholder for geocoder object
                    referenceArray.push({});
                    //push empty array to house unit objects in associated with this address
                    $scope.apartmentArray.push([]);
                };
                $scope.addressEntered = function(apartmentIndex) {
                    var currentAddressObj = $scope.apartmentArray[apartmentIndex];
                    UnitCreateSvc.parseGeocodeData(currentAddressObj.address, null, function(err, apartment) {
                        //store apartment object from geocoder in fullApartment object
                        referenceArray[apartmentIndex] = apartment;
                        //assign the newly created apartment onto the last index
                        currentAddressObj.push(apartment);
                        //set this object in sessionStorage
                        ApartmentClaimGetSetSvc.set(apartment, 'ApartmentClaims');
                    });
                };
                $scope.addUnit = function(addressIndex) {
                    $scope.apartmentArray[addressIndex].push({});
                    console.dir($scope.apartmentArray[addressIndex]);
                    var lastIndex = $scope.apartmentArray[addressIndex].length - 1;
                    $scope.apartmentArray[addressIndex][lastIndex] = referenceArray[addressIndex];
                    console.dir($scope.apartmentArray);
                    console.dir($scope.apartmentArray[addressIndex]);


                };
                //findOrCreateUnit
                $scope.unitEntered = function(apartmentIndex, unitIndex) {
                    var unit = $scope.apartmentArray[apartmentIndex][unitIndex];
                    ApartmentModel.claimApi().save(null, unit, function(data) {
                            // if apartment was already found
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
                                            unit.id = data.apartment.id;
                                            return;
                                        } else {
                                            delete unit.unitNum;
                                            for (var key in data.apartment) {
                                                if (data.apartment.hasOwnProperty(key)) {
                                                    unit[key] = data.apartment[key];
                                                }
                                            }
                                            return;
                                        }
                                    });
                                } else {
                                    for (var key in data.apartment) {
                                        if (data.apartment.hasOwnProperty(key)) {
                                            unit[key] = data.apartment[key];
                                        }
                                    }
                                    // $scope.apartmentArray[apartmentIndex][unitIndex] = data.apartment;
                                    console.dir($scope.apartmentArray);
                                    return;
                                }

                            });
                        //ApartmentModel.api().save()
                    };
                    //if unit number is not null and not undefined
                    //search database for the address and the unit number
                    //if the address exists, build the form and input the current data
                    //else build out an empty form

                    //FUNCTION - add unit
                    //create a new unitNum input box


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

                }]);
