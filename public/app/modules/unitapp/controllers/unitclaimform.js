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
        'lodash',
        function($scope, $state, $q, TokenSvc, ApartmentModel, DescriptionModel, SmartSearchSvc, UnitFct, FlexGetSetSvc, ModalSvc, WizioConfig, lodash) {
            'ng-strict';
            var dataForModal = {};
            //get the geocoded location for the smart bar
            $scope.getLocation = function(val) {
                return SmartSearchSvc.smartSearch(val, 'Staging-ApartmentClaims');
            };

            (function formPrimer() {
                //Figure out what state we're on
                $scope.singleUnit = ($state.current.name === 'Unit.Edit') ? true : false;
                //grab the user object that is currently logged in
                $scope.user = TokenSvc.decode();
                //get the selectOptions for all of the drop downs on the form
                $scope.selectOptions = UnitFct.selectOptions;
                $scope.ammenities = UnitFct.ammenities;
                //for handling multiple property managers in the future
                $scope.multiplePMBusinesses = false;
                if ($scope.user.userType === 2 || $scope.user.userType === 4) {
                    if ($scope.user.PropertyManager.length > 0) {
                        $scope.multiplePMBusinesses = true;
                        $scope.selectOptions.pmBusinesses = $scope.user.PropertyManager;
                        $scope.selectedPM = $scope.selectOptions.pmBusinesses[0];
                    }
                }
                //setup the containing object for apartments
                $scope.containingArray = [];
                //if editing a unit, get that unit and push it into containing
                //object, otherwise push empty object
                if ($scope.singleUnit) {
                    //build an instance of an apartment with the data in localstorage
                    var newApartmentInstance = ApartmentModel.build(FlexGetSetSvc.get('UnitToEdit'));
                    //append the description to the new apartment instance
                    newApartmentInstance.apartmentData.Description = FlexGetSetSvc.get('UnitToEdit').Descriptions[0];
                    //append the propertymanager to the new apartmentInstance
                    newApartmentInstance.apartmentData.PropertyManager = $scope.selectedPM;
                    //append the property manager id onto the unit
                    newApartmentInstance.apartmentData.PropertyManagerId = $scope.selectedPM.id;
                    newApartmentInstance.apartmentData.UpdatedById = $scope.user.id;
                    $scope.apartmentAddress = newApartmentInstance.apartmentData.concatAddr;
                    $scope.containingArray.push(newApartmentInstance);
                } else {
                    $scope.containingArray.push({});
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
                ]
            */
            function updateAddress() {
                var dataForModal = {
                    Address: $scope.apartmentAddress,
                    unitNum: $scope.containingArray[0].apartmentData.unitNum,
                    ApartmentId: $scope.containingArray[0].apartmentData.id,
                };
                dataForModal.dataToChange= "Address";

                var dataForUpdateAddressModal = {
                    templateUrl: WizioConfig.UnitViewsURL + "updateinfomodal.html",
                    controller: 'UpdateInfoModalCtrl',
                    modalData: dataForModal,
                };
                buildModal(1, dataForUpdateAddressModal)
                .then(function(response) {
                    $scope.apartmentAddress = response.concatAddr;
                    for(var key in response){
                        if(response.hasOwnProperty(key)){
                            $scope.containingArray[0].apartmentData[key] = response[key];
                        }
                    }
                    return;
                });
            }

            function updateUnitNum() {
                var dataForModal = {
                    Address: $scope.apartmentAddress,
                    unitNum: $scope.containingArray[0].apartmentData.unitNum,
                    ApartmentId: $scope.containingArray[0].apartmentData.id,
                };
                dataForModal.dataToChange= "Unit Number";

                var dataForUpdateUnitNumModal = {
                    templateUrl: WizioConfig.UnitViewsURL + "updateinfomodal.html",
                    controller: 'UpdateInfoModalCtrl',
                    modalData: dataForModal,
                };
                buildModal(1, dataForUpdateUnitNumModal)
                .then(function(response) {
                    $scope.containingArray[0].apartmentData.unitNum = response;
                });
            }
            var commonVariables = {
                addressIndex: null,
                unitIndex: null
            };

            function addBlankUnitToAddress(addressIndex) {
                //we're going to copy the geocoded data from the first apartment
                //at this address
                var apartmentToCopy = $scope.containingArray[0];
                var newApartmentInstance = ApartmentModel.copyGeocodedData(apartmentToCopy);
                newApartmentInstance.apartmentData.CreatedById = $scope.user.id;
                newApartmentInstance.apartmentData.UpdatedById = $scope.user.id;
                newApartmentInstance.apartmentData.PropertyManager = $scope.selectedPM;
                newApartmentInstance.apartmentData.PropertyManagerId = $scope.selectedPM.id;
                delete newApartmentInstance.apartmentData.id;
                $scope.containingArray.push(newApartmentInstance);
                return;
            }

            function copyUnit(unitIndex) {
                var unitToDuplicate = $scope.containingArray[unitIndex];
                var duplicateApartmentData = unitToDuplicate.duplicate();
                var newInstance = ApartmentModel.build(duplicateApartmentData);
                newInstance.apartmentData.id = null;
                $scope.containingArray.push(newInstance);
                return;
            }

            function removeUnit(unitIndex) {
                if ($scope.containingArray.length === 1) {
                    return;
                } else {
                    $scope.containingArray[unitIndex].splice(unitIndex, 1);
                    return;
                }
            }
            //reusable buildModal function that can build both types of modals
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

            function getNewUnitGeocodeData(unitIndex) {
                return $q(function(resolve, reject) {
                    var unitAddressInfo = $scope.containingArray[unitIndex].apartmentData;
                    var newUnitInstance = ApartmentModel.build(unitAddressInfo);
                    commonVariables.unitIndex = unitIndex;
                    newUnitInstance.getGeocodeData()
                        .then(function(response) {
                            return resolve(newUnitInstance);
                        });
                });
            }

            function findOrCreateNewUnit(unitInstance) {
                return $q(function(resolve, reject) {
                    var user = TokenSvc.decode();
                    //add a description object onto the instance for saving to DB
                    unitInstance.apartmentData.Description = {
                        description: "",
                        id: null,
                        UserId: user.id
                    };
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
                    unitInstance.apartmentData.Description.ApartmentId = dbResponse.apartment.id;
                    unitInstance.apartmentData.Description.id = dbResponse.apartment.Description.id;
                    // unit.apartmentData.PropertyManagerId = "Unassigned";
                    $scope.containingArray[commonVariables.unitIndex] = unitInstance;
                    return resolve(unitInstance);
                });
            }

            function onUnitCreatedPreviously(data) {
                return $q(function(resolve, reject) {
                    var dbResponse = data.dbResponse;
                    var unitInstance = data.unitInstance;
                    unitInstance.newlyCreated = false;
                    unitInstance.apartmentData.UpdatedById = $scope.user.id;
                    if ($scope.user.userType === 2 && UnitFct.checkPropertyManagerOwnership(dbResponse)) {
                        dataForModal = {
                            templateUrl: WizioConfig.UnitViewsURL + "UnitVerifyModal.html",
                            controller: 'UnitVerifyModalCtrl',
                            modalData: dbResponse
                        };
                        buildModal(1, dataForModal)
                            .then(function(dbResponse) {
                                $scope.containingArray[commonVariables.unitIndex] = {};
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

            function onUnitBlur(unitIndex) {
                $scope.containingArray[unitIndex].apartmentData.concatAddr = $scope.apartmentAddress;
                getNewUnitGeocodeData(unitIndex)
                    .then(findOrCreateNewUnit)
                    .then(handleAPIResponse);

                return;
            }

            $scope.functions = {
                addUnit: addBlankUnitToAddress,
                onUnitBlur: onUnitBlur,
                copyUnit: copyUnit,
                removeUnit: removeUnit,
                updateAddress: updateAddress,
                updateUnitNumber: updateUnitNum
            };

            $scope.submit = function() {
                // var apartments = lodash.pluck($scope.containingArray, 'apartmentData');
                ApartmentModel.claimApi($scope.containingArray, function(response) {
                    $state.go('Account.Dashboard.Main');
                });
            };

        }
    ]);
