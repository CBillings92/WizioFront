angular.module('UnitApp')
    .factory('UnitFct', [
        'ApartmentModel',
        'TokenSvc',
        function(ApartmentModel, TokenSvc) {

            var selectOptions = {
                // beds: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                baths: [1, 2, 3],
                livingSpaces: [0, 1, 2, 3],
                // amenities: ['Central Air', 'Gym', 'Pool'],
                laundry: ['In Unit', 'In Building', 'None'],
                elevator: ['Yes', 'No'],
                makeCurrentListing: ['Yes', 'No'],
                pmBusinessOrPerson: ['Business', 'Person']
            };
            var features = {
                beds: {
                    svg: 'public/assets/icons/bed.svg',
                    data: "beds",
                    label: 'Beds',
                    postText: 'Beds',
                    selectArray: [0, 1, 2, 3, 4, 5, 6, 7, 8],
                    dataParent: 'Apartment'
                },
                baths: {
                    svg: 'public/assets/icons/bath.svg',
                    data: 'baths',
                    label: 'Baths',
                    postText: 'Baths',
                    selectArray: [1, 2, 3]
                    dataParent: 'Apartment'
                },
                laundry: {
                    svg: 'public/assets/icons/laundry.svg',
                    data: 'laundry',
                    label: 'Laundry',
                    postText: '',
                    selectObject: {
                        'In Unit': 'In Unit',
                        'In Building': 'In Building',
                        'None': 'None'
                    },
                    dataParent: 'Apartment'
                },
                pets: {
                    svg: 'public/assets/icons/pets.svg',
                    data: 'pets',
                    label: 'Pets',
                    postText: '',
                    selectObject: {
                        'Cats OK': 'Cats OK',
                        'Dogs OK': 'Dogs OK',
                        'Cats and Dogs OK': 'Cats and Dogs OK'
                    },
                    dataParent: 'Apartment'
                },
                elevators: {
                    svg: 'public/assets/icons/elevator.svg',
                    data: 'elevator',
                    label: 'Elevator',
                    postText: '',
                    selectObject: {
                        'Yes': 'Yes',
                        'No': 'No'
                    },
                    dataParent: 'Apartment'
                },
                electric: {
                    svg: 'public/assets/icons/electric.svg',
                    data: 'electric',
                    postText: '',
                },
                gas: {
                    svg: 'public/assets/icons/gas.svg',
                    data: 'gas',
                    postText: '',
                },
                heat: {
                    svg: 'public/assets/icons/heat.svg',
                    data: 'heat',
                    postText: '',
                },
                smoking: {
                    svg: 'public/assets/icons/smoking.svg',
                    data: 'smoking',
                    postText: '',
                },
                trash: {
                    svg: 'public/assets/icons/trash.svg',
                    data: 'trashRemoval',
                    postText: '',
                    label: 'trash',
                    selectObject: {
                        true:'Yes',
                        false:'No',
                    },
                    dataParent: 'Lease'
                },
                water: {
                    svg: 'public/assets/icons/water.svg',
                    data: 'waterSewerIncluded',
                    postText: '',
                    dataParent: 'Lease',
                },
                wifi: {
                    svg: 'public/assets/icons/wifi.svg',
                    data: 'wifiIncluded',
                    postText: '',
                    dataParent: 'Lease',
                },
                gym: {
                    svg: 'public/assets/icons/gym.svg',
                    data: 'gym',
                    postText: '',
                    label: 'gym',
                    selectObject: {
                        true: 'Yes',
                        false: 'No'
                    },
                    dataParent: 'Apartment'
                },
                pool: {
                    svg: 'public/assets/icons/pool.svg',
                    data: 'pool',
                    postText: '',
                    label: 'pool',
                    selectObject: {
                        1: 'Yes',
                        0: 'No',
                    },
                    dataParent: 'Apartment'
                },
                nosmoking: {
                    svg: 'public/assets/icons/nosmoking.svg',
                    data: 'nosmoking',
                    postText: '',
                },
                parking: {
                    svg: 'public/assets/icons/parking.svg',
                    data: 'parking',
                    label: 'Parking',
                    selectObject: {
                        1:'1 Space',
                        2:'2 Spaces',
                        0:'No',
                    },
                    postText: '',
                    dataParent: 'Apartment'
                },
                concierge: {
                    svg: 'public/assets/icons/concierge.svg',
                    data: 'concierge',
                    postText: '',
                    label: 'concierge',
                    selectObject: {
                        1:'Yes',
                        0:'No'
                    },
                    dataParent: 'Apartment'
                },
                cats: {
                    svg: 'public/assets/icons/cats.svg',
                    data: 'cats',
                    postText: '',
                },
                cable: {
                    svg: 'public/assets/icons/cable.svg',
                    data: 'cable',
                    postText: '',
                },
                ac: {
                    svg: 'public/assets/icons/ac.svg',
                    data: 'airconditioning',
                    postText: '',
                    label: 'ac',
                    selectObject: {
                        1:'Yes',
                        0:'No'
                    },
                    dataParent: 'Apartment'
                },
                roofDeck: {
                    svg: 'public/assets/icons/roofdeck.svg',
                    data: 'roofDeck',
                    postText: '',
                    label: 'roofdeck',
                    selectObject: {
                        1:'Yes',
                        0:'No',
                    },
                    dataParent: 'Apartment'
                },
                supervisor: {
                    svg: 'public/assets/icons/supervisor.svg',
                    data: 'superIntendent',
                    postText: '',
                    label: 'Super Intendent',
                    selectObject: {
                        1:'Yes',
                        0:'No'
                    },
                    dataParent: 'Apartment'
                },
                balcony: {
                    svg: 'public/assets/icons/balcony.svg',
                    data: 'balcony',
                    postText: '',
                    label: 'balcony',
                    selectObject: {
                        1:'Yes',
                        0:'No'
                    },
                    dataParent: 'Apartment'
                },
            };
            var apartmentExisted = function(newApartment, response) {
                var user = TokenSvc.decode();
                newApartment.apartmentData.id = response.apartment.id;
                newApartment.Assignment = {
                    UserId: user.id,
                    ApartmentId: newApartment.apartmentData.id
                };
                newApartment.apartmentData.CreatedById = user.id;
                newApartment.apartmentData.UpdatedById = user.id;
                return newApartment;
            };

            function checkPropertyManagerOwnership(response) {
                var user = TokenSvc.decode();
                for (var i = 0; i < user.PropertyManager.length; i++) {
                    if (user.PropertyManager[i].id === response.PropertyManagerId) {
                        return true;
                    }
                }
                return false;
            }



            var createUnit = function() {

            };

            var searchUnit = function() {

            };
            return {
                selectOptions: selectOptions,
                createUnit: createUnit,
                apartmentExisted: apartmentExisted,
                checkPropertyManagerOwnership: checkPropertyManagerOwnership,
                features: features,
                ammenities: features
            };
        }
    ]);
