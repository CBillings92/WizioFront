angular.module('UnitApp')
    .factory('UnitDetailsFct', [
        'ApartmentGetSetSvc',
        'UnitFct',
        function unitDetailsFct(ApartmentGetSetSvc,UnitFct) {
            function setDataForPage(dataFromAPI) {
                var listing, apartment, features;

                listing = dataFromAPI;
                listing.dateStart = moment(
                    listing.dateStart
                ).format('YYYY-MM-DD');

                apartment = dataFromAPI.Apartment;
                apartment.monthlyRent = dataFromAPI.monthlyRent;
                features = UnitFct.features;

                //store the data in sessionStorage
                ApartmentGetSetSvc.set(apartment, 'apartmentSelected');
                var dataForPage = {
                    dataFromAPI: dataFromAPI,
                    listing: listing,
                    apartment: apartment,
                    features: features
                };
                return dataForPage;
            }
            return {
                setDataForPage: setDataForPage
            };
        }
    ]);
