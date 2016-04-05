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
                // elevator: ['Yes', 'No'],
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
                    selectArray: [1, 2, 3],
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
                    dataParent: 'Lease'
                },
                elevators: {
                    svg: 'public/assets/icons/elevator.svg',
                    data: 'elevator',
                    label: 'Elevator',
                    postText: '',
                    selectObject: {
                        'Yes':true,
                        'No':false,
                    },
                    'trueValue': 1,
                    'falseValue': 0,
                    dataParent: 'Apartment'
                },
                electric: {
                    svg: 'public/assets/icons/electric.svg',
                    data: 'electricIncluded',
                    postText: '',
                    dataParent: 'Lease',
                    label: 'Electric'
                },
                gas: {
                    svg: 'public/assets/icons/gas.svg',
                    data: 'gasIncluded',
                    postText: '',
                    dataParent: 'Lease',
                    label: 'Gas'
                },
                heat: {
                    svg: 'public/assets/icons/heat.svg',
                    data: 'heatIncluded',
                    postText: '',
                    dataParent: 'Lease',
                    label: 'Heat'
                },
                smoking: {
                    svg: 'public/assets/icons/smoking.svg',
                    data: 'smoking',
                    postText: '',
                    label: 'Smoking',
                    dataParent: 'Lease'
                },
                trash: {
                    svg: 'public/assets/icons/trash.svg',
                    data: 'trashRemoval',
                    postText: '',
                    label: 'Trash Removal',
                    selectObject: {
                        'Yes':true,
                        'No':false,
                    },
                    'trueValue': 1,
                    'falseValue': 0,
                    dataParent: 'Lease'
                },
                water: {
                    svg: 'public/assets/icons/water.svg',
                    data: 'waterSewerIncluded',
                    postText: '',
                    dataParent: 'Lease',
                    label: 'Water',
                    'trueValue': 1,
                    'falseValue': 0,
                },
                wifi: {
                    svg: 'public/assets/icons/wifi.svg',
                    data: 'wifiIncluded',
                    postText: '',
                    dataParent: 'Lease',
                    label: 'Wifi'
                },
                gym: {
                    svg: 'public/assets/icons/gym.svg',
                    data: 'gym',
                    postText: '',
                    label: 'Gym',
                    selectObject: {
                        'Yes':true,
                        'No':false,
                    },
                    'trueValue': 1,
                    'falseValue': 0,
                    dataParent: 'Apartment'
                },
                pool: {
                    svg: 'public/assets/icons/pool.svg',
                    data: 'pool',
                    postText: '',
                    label: 'Pool',
                    selectObject: {
                        'Yes':true,
                        'No':false,
                    },
                    'trueValue': 1,
                    'falseValue': 0,
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
                        'Yes':true,
                        'No':false,
                    },
                    'trueValue': 1,
                    'falseValue': 0,
                    postText: '',
                    dataParent: 'Apartment'
                },
                concierge: {
                    svg: 'public/assets/icons/concierge.svg',
                    data: 'concierge',
                    postText: '',
                    label: 'Concierge',
                    selectObject: {
                        'Yes':true,
                        'No':false,
                    },
                    'trueValue': 1,
                    'falseValue': 0,
                    dataParent: 'Apartment'
                },
                cats: {
                    svg: 'public/assets/icons/cats.svg',
                    data: 'cats',
                    postText: '',
                },
                cable: {
                    svg: 'public/assets/icons/cable.svg',
                    data: 'cableIncluded',
                    postText: '',
                    dataParent: 'Lease',
                    label: 'Cable'
                },
                ac: {
                    svg: 'public/assets/icons/ac.svg',
                    data: 'airconditioning',
                    postText: '',
                    label: 'Air Conditioning',
                    selectObject: {
                        'Yes':true,
                        'No':false,
                    },
                    'trueValue': 1,
                    'falseValue': 0,
                    dataParent: 'Apartment'
                },
                roofDeck: {
                    svg: 'public/assets/icons/roofdeck.svg',
                    data: 'roofDeck',
                    postText: '',
                    label: 'Roof Deck',
                    selectObject: {
                        'Yes':true,
                        'No':false,
                    },
                    'trueValue': 1,
                    'falseValue': 0,
                    dataParent: 'Apartment'
                },
                supervisor: {
                    svg: 'public/assets/icons/supervisor.svg',
                    data: 'superIntendent',
                    postText: '',
                    label: 'Super Intendent',
                    selectObject: {
                        'Yes':true,
                        'No':false,
                    },
                    'trueValue': 1,
                    'falseValue': 0,
                    dataParent: 'Apartment'
                },
                balcony: {
                    svg: 'public/assets/icons/balcony.svg',
                    data: 'Balcony',
                    postText: '',
                    label: 'balcony',
                    selectObject: {
                        'Yes':true,
                        'No':false,
                    },
                    'trueValue': 1,
                    'falseValue': 0,
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
