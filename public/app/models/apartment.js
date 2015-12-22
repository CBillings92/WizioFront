angular.module('Models')
.factory('ApartmentModel', [
    '$sessionStorage',
    '$resource',
    'lodash',
    'WizioConfig',
    function($sessionStorage, $resource, lodash, WizioConfig){
        function Apartment(street, unitNum, neighborhood,
            locality,
            administrative_area_level_3,
            state,
            zip,
            beds,
            baths,
            livingSpaces,
            maxResidency,
            costPerMonth,
            renovated,
            pets,
            ApartmentType,
            latitude,
            longitude,
            concatAddr,
            leaseType,
            leaseExpectedEnd,
            leaseActualEnd,
            LandlordId,
            route
        ){
            this.street =street;
            this.unitNum =unitNum;
            this.neighborhood =neighborhood;
            this.locality =locality;
            this.administrative_area_level_3 =administrative_area_level_3;
            this.state =state;
            this.zip =zip;
            this.beds =beds;
            this.baths =baths;
            this.livingSpaces =livingSpaces;
            this.maxResidency =maxResidency;
            this.costPerMonth =costPerMonth;
            this.renovated =renovated;
            this.pets =pets;
            this.ApartmentType =ApartmentType;
            this.latitude =latitude;
            this.longitude =longitude;
            this.concatAddr =concatAddr;
            this.leaseType =leaseType;
            this.leaseExpectedEnd =leaseExpectedEnd;
            this.leaseActualEnd =leaseActualEnd;
            this.LandlordId =LandlordId;
            this.route =route;
        }

        Apartment.prototype.api = function(){
            return $resource(WizioConfig.baseAPIURL + 'apartment/:id', {id: '@id'});
        };
        Apartment.api = function(){
            return $resource(WizioConfig.baseAPIURL + 'apartment/:id', {id: '@id'});
        };
        Apartment.apiMod = function(endpoint){
            switch (endpoint) {
                case "claim":
                    return;
                default:

            }
        }
        Apartment.search = function(searchString, unitNum, filters, callback){

        };
        Apartment.claimApi = function(){
            return $resource(WizioConfig.baseAPIURL + 'apartment/claim');
        }
        Apartment.build = function(data){
            return new Apartment(
                data.street,
                data.unitNum,
                data.neighborhood,
                data.locality,
                data.administrative_area_level_3,
                data.state,
                data.zip,
                data.beds,
                data.baths,
                data.livingSpaces,
                data.maxResidency,
                data.costPerMonth,
                data.renovated,
                data.pets,
                data.ApartmentType,
                data.latitude,
                data.longitude,
                data.concatAddr,
                data.leaseType,
                data.leaseExpectedEnd,
                data.leaseActualEnd,
                data.LandlordId,
                data.route
            );
        };


        return Apartment;
    }
]);
