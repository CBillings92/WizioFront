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
        var icons = {
            beds:{
                baseUrl: "",
                blackUrl: "public/assets/icons/bed-black.svg",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            baths:{
                baseUrl: "",
                blackUrl: "public/assets/icons/bath-black.svg",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            laundry:{
                baseUrl: "",
                blackUrl: "public/assets/icons/laundry-black.svg",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            dishwasher:{
                baseUrl: "",
                blackUrl: "public/assets/icons/dishwasher-black.svg",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            ac:{
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            electricity: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            gas: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            heat: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            hotwater: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            watersewer: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            wifi: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            pets: {
                baseUrl: "",
                blackUrl: "public/assets/icons/pets-black.svg",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            elevator: {
                baseUrl: "",
                blackUrl: "public/assets/icons/elevator-black.svg",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            cable: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            garbagedisposal: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            trashremoval: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            snowremoval: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            fireplace: {
                baseUrl: "",
                blackUrl: "public/assets/icons/fireplace-black.svg",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            garage: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            parking: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            concierge: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            superintendent: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            pool: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            porch: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
            },
            smoking: {
                baseUrl: "",
                blackUrl: "",
                blueUrl: "",
                orangeUrl: "",
                grayUrl: "",
                description: {

                },
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
            checkPropertyManagerOwnership: checkPropertyManagerOwnership
        };
    }
]);
