/*
    this form is used for the creation and editing of apartments (not leases).
    you edit the beds, baths, unit number, laundry and so on
*/
angular.module('UnitApp')
    .controller('UnitClaimFormCtrl', [
        '$scope',
        '$state',
        '$q',
        'TokenSvc',
        'ApartmentModel',
        'DescriptionModel',
        'SmartSearchSvc',
        'UnitFct',
        'FlexGetSetSvc',
        'ModalSvc',
        'WizioConfig',
        function($scope, $state, $q, TokenSvc, ApartmentModel, DescriptionModel, SmartSearchSvc, UnitFct, FlexGetSetSvc, ModalSvc, WizioConfig) {
            //get the geocoded location for the smart bar
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val, 'Staging-ApartmentClaims');
            };
            (function formPrimer() {
                //use a ternary IF operator to figure out what state we're on
                $scope.singleUnit = ($state.current.name === 'Unit.Edit') ? true : false;
                //grab the user object that is currently logged in
                $scope.user = TokenSvc.decode();
                //get the selectOptions for all of the drop downs on the form
                $scope.selectOptions = UnitFct.selectOptions;
                $scope.multiplePMBusinesses = false;
                if ($scope.user.userType === 2 || $scope.user.userType === 4) {
                    if ($scope.user.PropertyManager.length > 0) {
                        $scope.multiplePMBusinesses = true;
                        $scope.selectOptions.pmBusinesses = $scope.user.PropertyManager;
                        $scope.selectedPM = $scope.selectOptions.pmBusinesses[0];
                    }
                }
                //setup the containing object for apartments
                $scope.containingArray = [
                    []
                ];
                //if editing a unit, get that unit and push it into containing
                //object, otherwise push empty object
                if ($scope.singleUnit) {
                    $scope.containingArray[0].push(FlexGetSetSvc.get('UnitToEdit'));
                } else {
                    $scope.containingArray[0].push({});
                }
            })();


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
            var commonVariables = {
                addressIndex: null,
                unitIndex: null
            };
            function addBlankUnitToAddress(addressIndex) {
                //we're going to copy the geocoded data from the first apartment
                //at this address
                var apartmentToCopy = $scope.containingArray[addressIndex][0];
                var newApartmentInstance = ApartmentModel.copyGeocodedData(apartmentToCopy);
                $scope.containingArray[addressIndex].push(newApartmentInstance);
                return;
            }

            function unitNumberAdded() {

            }

            function buildModal(type, data) {
                return $q(function(resolve, reject) {
                    if (type === 1) {
                        var modalDefaults = {
                            backdrop: true,
                            keyboard: true,
                            modalFade: true,
                            templateUrl: data.templateUrl,
                            controller: data.controller,
                            resolve: {
                                modalData: function() {
                                    return data.modalData;
                                }
                            }
                        };
                        ModalSvc.showModal(modalDefaults, {}).then(function(result) {
                            return resolve(result);
                        });
                    } else {
                        var modalOptions = {
                            closeButtonText: data.closeButtonText,
                            actionButtonText: data.actionButtonText,
                            headerText: data.headerText,
                            bodyText: data.bodyText
                        };
                        ModalSvc.showModal({}, modalOptions).then(function(result) {
                            return resolve(result);
                        });
                    }
                });
            }

            function getNewUnitGeocodeData(addressIndex, unitIndex) {
                return $q(function(resolve, reject) {
                    var unitAddressInfo = $scope.containingArray[addressIndex][unitIndex].apartmentData;
                    var newUnitInstance = ApartmentModel.build(unitAddressInfo);
                    commonVariables.addressIndex = addressIndex;
                    commonVariables.unitIndex = unitIndex;
                    newUnitInstance.getGeocodeData()
                        .then(function(response) {
                            return resolve(newUnitInstance);
                        });
                });
            }

            function findOrCreateNewUnit(unitInstance) {
                return $q(function(resolve, reject) {
                    unitInstance.api().findOrCreate(null, function(dbResponse) {
                        var dataPasser = {
                            unitInstance: unitInstance,
                            dbResponse: dbResponse
                        };
                        return resolve(dataPasser);
                    });
                });
            }

            function handleAPIResponse(data) {
                return $q(function(resolve, reject) {
                    var dbResponse = data.dbResponse;
                    var unitInstance = data.unitInstance;
                    if (dbResponse.created === true) {
                        onUnitNewlyCreated(data)
                            .then(function(unit) {
                                return resolve(unit);
                            });
                    } else {
                        onUnitCreatedPreviously(data)
                            .then(function(unit) {
                                return resolve(unit);
                            });
                    }
                });
            }

            function onUnitNewlyCreated(data) {
                return $q(function(resolve, reject) {
                    var dbResponse = data.dbResponse;
                    var unitInstance = data.unitInstance;
                    unitInstance.newlyCreated = true;
                    unitInstance.apartmentData.id = dbResponse.apartment.id;
                    unitInstance.apartmentData.CreatedById = $scope.user.id;
                    unitInstance.apartmentData.UpdatedById = $scope.user.id;
                    unitInstance.apartmentData.PropertyManager = $scope.selectedPM;
                    unitInstance.apartmentData.PropertyManagerId = $scope.selectedPM.id;
                    // unit.apartmentData.PropertyManagerId = "Unassigned";
                    $scope.containingArray[commonVariables.addressIndex][commonVariables.unitIndex] = unitInstance;
                    return resolve(unitInstance);
                });
            }

            function onUnitCreatedPreviously(data) {
                return $q(function(resolve, reject) {
                    var dbResponse = data.dbResponse;
                    var unitInstance = data.unitInstance;
                    unitInstance.newlyCreated = false;
                    unitInstance.apartmentData.UpdatedById = $scope.user.id;
                    var dataForModal = {};
                    if ($scope.user.userType === 2 && UnitFct.checkPropertyManagerOwnership(dbResponse)) {
                        dataForModal = {
                            templateUrl: WizioConfig.UnitViewsURL + "UnitVerifyModal.html",
                            controller: 'UnitVerifyModalCtrl',
                            modalData: dbResponse
                        };
                        buildModal(1, dataForModal)
                            .then(function(dbResponse) {

                            });
                    } else if ($scope.userType === 3 && $scope.user.id !== response.apartment.CreatedById) {
                        dataForModal = {
                            closeButtonText: "Close",
                            actionButtonText: "OK",
                            headerText: "This Apartment Already Exists",
                            bodyText: 'You are not permitted to edit this apartment. You can however make a public listing for this unit.'
                        };
                        buildModal(2, dataForModal)
                            .then(function(dbResponse) {

                            });
                    }
                });
            }

            function onUnitBlur(addressIndex, unitIndex) {
                getNewUnitGeocodeData(addressIndex, unitIndex)
                    .then(findOrCreateNewUnit)
                    .then(handleAPIResponse);
            }
            $scope.functions = {
                addUnit: addBlankUnitToAddress,
                onUnitBlur: onUnitBlur
            };
            // $scope.onUnitBlur = function(addressIndex, unitIndex) {
            //     //grab the data on the form located at the correct address array and the correct Unit object (the street and unit number)
            //     var unitAddressInfo = $scope.containingArray[addressIndex][unitIndex].apartmentData;
            //     var assignment = unitAddressInfo.Assignment;
            //     //build a new Apartment instance with it
            //     var newApartment = ApartmentModel.build(unitAddressInfo);
            //     newApartment.apartmentData.CreatedById = $scope.user.id;
            //     newApartment.apartmentData.UpdatedById = $scope.user.id;
            //     console.dir($scope.selectedPM);
            //     if ($scope.selectedPM.id) {
            //         newApartment.apartmentData.PropertyManagerId = $scope.selectedPM.id;
            //     }
            //     //call the getGeocodeData prototype function to get all needed geocoded data
            //     newApartment.getGeocodeData()
            //         .then(function(response) {
            //             //find the apartment based on the new geocoded date
            //             newApartment.api().findOrCreate(null, function(response) {
            //                 console.dir(response);
            //                 //if the aparment didn't exist before (if created is true)
            //                 var views = WizioConfig.UnitViewsURL;
            //                 if (response.created) {
            //                     newApartment.newlyCreated = true;
            //                     newApartment.apartmentData.CreatedById = $scope.user.id;
            //                     newApartment.apartmentData.UpdatedById = $scope.user.id;
            //                     console.dir($scope.selectedPM);
            //                     newApartment.apartmentData.PropertyManager = $scope.selectedPM;
            //                     newApartment.apartmentData.PropertyManagerId = $scope.selectedPM.id;
            //                     console.dir(newApartment);
            //                     newApartment.apartmentData.PropertyManagerId = "Unassigned";
            //                     $scope.containingArray[addressIndex][unitIndex] = UnitFct.apartmentExisted(newApartment, response);
            //                 } else {
            //                     newApartment.apartmentData.UpdatedById = $scope.user.id;
            //                     delete newApartment.apartmentData.createdById;
            //                     newApartment.newlyCreated = false;
            //                     if ($scope.user.userType === 2 && UnitFct.checkPropertyManagerOwnership(response)) {
            //                         modalData = response.apartment;
            //                         console.dir(response);
            //                         var modalDefaultsUnitFound = {
            //                             backdrop: true,
            //                             keyboard: true,
            //                             modalFade: true,
            //                             templateUrl: views + "UnitVerifyModal.html",
            //                             controller: 'UnitVerifyModalCtrl',
            //                             resolve: {
            //                                 modalData: function() {
            //                                     return modalData;
            //                                 }
            //                             }
            //                         };
            //                         ModalSvc.showModal(modalDefaultsUnitFound, {}).then(function(result) {
            //                             editDataOrDontEdit(result, response, addressIndex, unitIndex);
            //                             return;
            //                         });
            //                     } else if ($scope.user.userType === 3) {
            //                         if ($scope.user.id !== response.apartment.CreatedById) {
            //                             var modalOptionsCantEdit = {
            //                                 closeButtonText: "Close",
            //                                 actionButtonText: "OK",
            //                                 headerText: "This Apartment Already Exists",
            //                                 bodyText: 'You are not permitted to edit this apartment. You can however make a public listing for this unit.'
            //                             };
            //                             $scope.containingArray[addressIndex][unitIndex].apartmentData.concatAddr = "";
            //                             $scope.containingArray[addressIndex][unitIndex].apartmentData.unitNum = "";
            //                             ModalSvc.showModal({}, modalOptionsCantEdit)
            //                                 .then(function(result) {
            //                                     return;
            //                                 });
            //                         } else {
            //                             modalData = response.apartment;
            //                             console.dir(response);
            //                             modalDefaultsUnitFound = {
            //                                 backdrop: true,
            //                                 keyboard: true,
            //                                 modalFade: true,
            //                                 templateUrl: views + "UnitVerifyModal.html",
            //                                 controller: 'UnitVerifyModalCtrl',
            //                                 resolve: {
            //                                     modalData: function() {
            //                                         return modalData;
            //                                     }
            //                                 }
            //                             };
            //                             ModalSvc.showModal(modalDefaultsUnitFound, {}).then(function(result) {
            //                                 editDataOrDontEdit(result, response, addressIndex, unitIndex);
            //                                 return;
            //                             });
            //                         }
            //                     }
            //                 }
            //
            //                 return;
            //             });
            //         });
            //HELPER FUNCTION
            function editDataOrDontEdit(result, response, addressIndex, unitIndex) {
                if (result === 'Use data') {
                    response.apartment.UpdatedById = $scope.user.id;
                    newApartment = ApartmentModel.build(response.apartment);
                    newApartment.apartmentData.PropertyManager = response.apartment.PropertyManager;
                    console.dir(newApartment);
                    $scope.containingArray[addressIndex][unitIndex] = newApartment;
                    return newApartment;
                } else {
                    if ($scope.containingArray[addressIndex].length === 1) {
                        $scope.containingArray[addressIndex][unitIndex].apartmentData.concatAddr = "";
                        $scope.containingArray[addressIndex][unitIndex].apartmentData.unitNum = "";
                    } else {
                        $scope.containingArray[addressIndex].splice(unitIndex, 1);
                    }
                }
            }
            // };

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
