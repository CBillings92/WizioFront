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

        var apartmentExisted = function(newApartment, response){
            console.dir(response);
            var user = TokenSvc.decode();
            newApartment.apartmentData.id = response.apartment.id;
            newApartment.Assignment = {
                UserId: user.id,
                ApartmentId: newApartment.apartmentData.id
            };
            newApartment.apartmentData.CreatedById = user.id;
            newApartment.apartmentData.UpdatedById = user.id;
            return newApartment;
        }

        function checkPropertyManagerOwnership(response){
            var user = TokenSvc.decode();
            for (var i = 0; i < user.PropertyManager.length; i++) {
                if (user.PropertyManager[i].id === response.apartment.PropertyManagerId) {
                    return true;
                } else {
                    return false;
                }
            }
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
