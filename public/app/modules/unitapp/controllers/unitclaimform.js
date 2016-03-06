angular.module('UnitApp')
    .controller('UnitClaimFormCtrl', [
        '$scope',
        '$state',
        'TokenSvc',
        'ApartmentModel',
        'DescriptionModel',
        'SmartSearchSvc',
        'UnitFct',
        'FlexGetSetSvc',
        'ModalSvc',
        'WizioConfig',
        function($scope, $state, TokenSvc, ApartmentModel, DescriptionModel, SmartSearchSvc, UnitFct, FlexGetSetSvc, ModalSvc, WizioConfig) {
            //use a ternary IF operator to figure out what state we're on
            $scope.singleUnit = ($state.current.name === 'Unit.Edit') ? true : false;
            $scope.user = TokenSvc.decode();
            console.dir($scope.user);
            //load the selectOptions from the unit factory
            $scope.selectOptions = UnitFct.selectOptions;
            $scope.multiplePMBusinesses = false;
            if ($scope.user.userType === 2 || $scope.user.userType === 4) {
                if ($scope.user.PropertyManager.length > 0) {
                    $scope.multiplePMBusinesses = true;
                    $scope.selectOptions.pmBusinesses = $scope.user.PropertyManager;
                    $scope.selectedPM = $scope.selectOptions.pmBusinesses[0];
                }
            }

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
                    [
                        {address: 10 Post Office Sq..., unitNum: 3B, beds:...}
                    ]
                ]
            */
            $scope.containingArray = [
                [
                ]
            ];
            if ($scope.singleUnit) {
                console.dir("HELLO");
                console.dir(FlexGetSetSvc.get('UnitToEdit'));
                $scope.containingArray[0].push(FlexGetSetSvc.get('UnitToEdit'));
                console.dir($scope.containingArray);
            } else {
                $scope.containingArray[0].push({});
            }
            //adding a unit just adds an empty object to the current address array
            $scope.addUnit = function(addressIndex) {
                /*
                    Grab the first apartment from the address array
                    and grab its geocoder data
                */
                var apartmentToCopy = $scope.containingArray[addressIndex][0];
                //use prototype method to copy geocoded data onto new instance
                var newApartmentInstance = ApartmentModel.copyGeocodedData(apartmentToCopy);
                //push this new instance onto the containingArray on the address array
                $scope.containingArray[addressIndex].push(newApartmentInstance);
                return;
            };
            $scope.onUnitBlur = function(addressIndex, unitIndex) {
                //grab the data on the form located at the correct address array and the correct Unit object (the street and unit number)
                var unitAddressInfo = $scope.containingArray[addressIndex][unitIndex].apartmentData;
                var assignment = unitAddressInfo.Assignment;
                //build a new Apartment instance with it
                var newApartment = ApartmentModel.build(unitAddressInfo);
                newApartment.apartmentData.CreatedById = $scope.user.id;
                newApartment.apartmentData.UpdatedById = $scope.user.id;
                console.dir($scope.selectedPM);
                if($scope.selectedPM.id){
                    newApartment.apartmentData.PropertyManagerId = $scope.selectedPM.id;
                }
                //call the getGeocodeData prototype function to get all needed geocoded data
                newApartment.getGeocodeData()
                    .then(function(response) {
                        //find the apartment based on the new geocoded date
                        newApartment.api().findOrCreate(null, function(response) {
                            console.dir(response);
                            //if the aparment didn't exist before (if created is true)
                            var views = WizioConfig.UnitViewsURL;
                            if (response.created) {
                                newApartment.newlyCreated = true;
                                newApartment.apartmentData.CreatedById = $scope.user.id;
                                newApartment.apartmentData.UpdatedById = $scope.user.id;
                                console.dir($scope.selectedPM);
                                newApartment.apartmentData.PropertyManager = $scope.selectedPM;
                                newApartment.apartmentData.PropertyManagerId = $scope.selectedPM.id;
                                console.dir(newApartment);
                                newApartment.apartmentData.PropertyManagerId = "Unassigned";
                                $scope.containingArray[addressIndex][unitIndex] = UnitFct.apartmentExisted(newApartment, response);
                            } else {
                                newApartment.apartmentData.UpdatedById = $scope.user.id;
                                delete newApartment.apartmentData.createdById;
                                newApartment.newlyCreated = false;
                                if ($scope.user.userType === 2 && UnitFct.checkPropertyManagerOwnership(response)) {
                                    modalData = response.apartment;
                                    console.dir(response);
                                    var modalDefaultsUnitFound = {
                                        backdrop: true,
                                        keyboard: true,
                                        modalFade: true,
                                        templateUrl: views + "UnitVerifyModal.html",
                                        controller: 'UnitVerifyModalCtrl',
                                        resolve: {
                                            modalData: function() {
                                                return modalData;
                                            }
                                        }
                                    };
                                    ModalSvc.showModal(modalDefaultsUnitFound, {}).then(function(result) {
                                        editDataOrDontEdit(result, response, addressIndex, unitIndex);
                                        return;
                                    });
                                } else if ($scope.user.userType === 3) {
                                    if($scope.user.id !== response.apartment.CreatedById){
                                        var modalOptionsCantEdit = {
                                            closeButtonText: "Close",
                                            actionButtonText: "OK",
                                            headerText: "This Apartment Already Exists",
                                            bodyText: 'You are not permitted to edit this apartment. You can however make a public listing for this unit.'
                                        };
                                        $scope.containingArray[addressIndex][unitIndex].apartmentData.concatAddr = "";
                                        $scope.containingArray[addressIndex][unitIndex].apartmentData.unitNum = "";
                                        ModalSvc.showModal({}, modalOptionsCantEdit)
                                        .then(function(result) {
                                            return;
                                        });
                                    } else {
                                        modalData = response.apartment;
                                        console.dir(response);
                                        modalDefaultsUnitFound = {
                                            backdrop: true,
                                            keyboard: true,
                                            modalFade: true,
                                            templateUrl: views + "UnitVerifyModal.html",
                                            controller: 'UnitVerifyModalCtrl',
                                            resolve: {
                                                modalData: function() {
                                                    return modalData;
                                                }
                                            }
                                        };
                                        ModalSvc.showModal(modalDefaultsUnitFound, {}).then(function(result) {
                                            editDataOrDontEdit(result, response, addressIndex, unitIndex);
                                            return;
                                        });
                                    }
                                }
                            }

                            return;
                        });
                    });
                    //HELPER FUNCTION
                    function editDataOrDontEdit(result, response, addressIndex, unitIndex){
                        if (result === 'Use data') {
                            response.apartment.UpdatedById = $scope.user.id;
                            newApartment = ApartmentModel.build(response.apartment);
                            newApartment.apartmentData.PropertyManager = response.apartment.PropertyManager;
                            console.dir(newApartment);
                            $scope.containingArray[addressIndex][unitIndex] = newApartment;
                            return newApartment;
                        } else {
                            if($scope.containingArray[addressIndex].length === 1){
                                $scope.containingArray[addressIndex][unitIndex].apartmentData.concatAddr = "";
                                $scope.containingArray[addressIndex][unitIndex].apartmentData.unitNum = "";
                            } else {
                                $scope.containingArray[addressIndex].splice(unitIndex, 1);
                            }
                        }
                    }
            };

            $scope.copyUnit = function(addressIndex, unitIndex) {
                console.dir(addressIndex);
                console.dir(unitIndex);
                //get the correct apartment out of the array
                var apartment = $scope.containingArray[addressIndex][unitIndex];
                console.dir(apartment);
                // var description = apartment.Description;
                /*
                    call the duplicate prototype method to get the apartmentData
                    FIXME this probably doesn't need to be on the prototype button
                    just in the unitfct ? ?? ? ?
                */
                //duplicate the apartment data
                var duplicateApartmentData = apartment.duplicate();
                //duplicate the description data
                // var duplicateDescriptionData = description.duplicate();
                //build a new instance with this data
                var newInstance = ApartmentModel.build(duplicateApartmentData);
                // newInstance.Description = DescriptionModel.build(duplicateDescriptionData);
                //push it into the address array
                $scope.containingArray[addressIndex].push(newInstance);
            };

            $scope.deleteUnit = function(addressIndex, unitIndex) {
                delete $scope.containingArray[addressIndex][unitIndex];
            };

            $scope.submit = function() {
                ApartmentModel.claimApi($scope.containingArray, function(response) {
                    $state.go('Account.Dashboard.Main');
                });
            };

        }
    ]);
