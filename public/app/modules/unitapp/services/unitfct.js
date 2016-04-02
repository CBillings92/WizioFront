angular.module('UnitApp')
.factory('UnitFct', [
    'ApartmentModel',
    'TokenSvc',
    function(ApartmentModel, TokenSvc){

        var selectOptions = {
            beds: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            baths: [1, 2, 3],
            livingSpaces: [0, 1, 2, 3],
            // amenities: ['Central Air', 'Gym', 'Pool'],
            laundry: ['In Unit', 'In Building', 'None'],
            elevator: ['Yes', 'No'],
            makeCurrentListing: ['Yes', 'No'],
            pmBusinessOrPerson: ['Business', 'Person']
        };
        var features = {
            beds:{
                svg: 'public/assets/icons/bed.svg',
                data: "beds",
                postText: 'Beds',
            },
            baths:{
                svg: 'public/assets/icons/bath.svg',
                data: 'baths',
                postText: 'Baths',
            },
            laundry:{
                svg: 'public/assets/icons/laundry.svg',
                data: 'laundry',
                postText: '',
            },
            pets:{
                svg: 'public/assets/icons/pets.svg',
                data: 'pets',
                postText: '',
            },
            elevators:{
                svg: 'public/assets/icons/elevator.svg',
                data: 'elevator',
                postText: '',
            },
            electric:{
                svg: 'public/assets/icons/electric.svg',
                data: 'electric',
                postText: '',
            },
            gas:{
                svg: 'public/assets/icons/gas.svg',
                // data: 'gas',
                postText: '',
            },
            heat:{
                svg: 'public/assets/icons/heat.svg',
                // data: 'gas',
                postText: '',
            },
            smoking:{
                svg: 'public/assets/icons/smoking.svg',
                // data: 'gas',
                postText: '',
            },
            trash:{
                svg: 'public/assets/icons/trash.svg',
                // data: 'gas',
                postText: '',
            },
            water:{
                svg: 'public/assets/icons/water.svg',
                // data: 'gas',
                postText: '',
            },
            wifi:{
                svg: 'public/assets/icons/wifi.svg',
                // data: 'gas',
                postText: '',
            },
            gym:{
                svg: 'public/assets/icons/gym.svg',
                // data: 'gas',
                postText: '',
            },
            pool:{
                svg: 'public/assets/icons/pool.svg',
                // data: 'gas',
                postText: '',
            },
            nosmoking:{
                svg: 'public/assets/icons/nosmoking.svg',
                // data: 'gas',
                postText: '',
            },
            parking:{
                svg: 'public/assets/icons/parking.svg',
                // data: 'gas',
                postText: '',
            },
            pool:{
                svg: 'public/assets/icons/pool.svg',
                // data: 'gas',
                postText: '',
            },
            concierge:{
                svg: 'public/assets/icons/concierge.svg',
                // data: 'gas',
                postText: '',
            },
            cats:{
                svg: 'public/assets/icons/cats.svg',
                // data: 'gas',
                postText: '',
            },
            cable:{
                svg: 'public/assets/icons/cable.svg',
                // data: 'gas',
                postText: '',
            },
            ac:{
                svg: 'public/assets/icons/ac.svg',
                // data: 'gas',
                postText: '',
            },
            roofdeck:{
                svg: 'public/assets/icons/roofdeck.svg',
                // data: 'gas',
                postText: '',
            },
            supervisor:{
                svg: 'public/assets/icons/supervisor.svg',
                // data: 'gas',
                postText: '',
            },
            balcony:{
                svg: 'public/assets/icons/balcony.svg',
                // data: 'gas',
                postText: '',
            },
        };
        var apartmentExisted = function(newApartment, response){
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

        function checkPropertyManagerOwnership(response){
            var user = TokenSvc.decode();
            for (var i = 0; i < user.PropertyManager.length; i++) {
                if (user.PropertyManager[i].id === response.PropertyManagerId) {
                    return true;
                }
            }
            return false;
        }



        var createUnit = function(){

        };

        var searchUnit = function(){

        };
        return {
            selectOptions: selectOptions,
            createUnit: createUnit,
            apartmentExisted: apartmentExisted,
            checkPropertyManagerOwnership: checkPropertyManagerOwnership,
            features: features
        };
    }
]);
