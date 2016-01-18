angular.module('UnitApp')
.factory('UnitFct', [
    'ApartmentModel',
    function(ApartmentModel){

        var selectOptions = {
            beds: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            baths: [1, 2, 3],
            livingSpaces: [0, 1, 2, 3],
            // amenities: ['Central Air', 'Gym', 'Pool'],
            laundry: ['In Unit', 'In Building', 'None'],
            elevator: ['Yes', 'No']
        };

        var createUnit = function(){

        };
        return {
            selectOptions: selectOptions,
            createUnit: createUnit
        };
    }
]);
