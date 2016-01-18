angular.module('Models')
    .factory('ApartmentModel', [
        '$sessionStorage',
        '$resource',
        'lodash',
        'WizioConfig',
        'UnitCreateSvc',
        function($sessionStorage, $resource, lodash, WizioConfig, UnitCreateSvc) {
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
            ) {
                this.apartmentData = {
                    street: street,
                    unitNum: unitNum,
                    neighborhood: neighborhood || null,
                    locality: locality || null,
                    administrative_area_level_3: administrative_area_level_3 || null,
                    state: state || null,
                    zip: zip || null,
                    beds: beds || null,
                    baths: baths || null,
                    livingSpaces: livingSpaces || null,
                    maxResidency: maxResidency || null,
                    costPerMonth: costPerMonth || null,
                    renovated: renovated || null,
                    pets: pets || null,
                    ApartmentType: ApartmentType || null,
                    latitude: latitude || null,
                    longitude: longitude || null,
                    concatAddr: concatAddr || null,
                    leaseType: leaseType || null,
                    leaseExpectedEnd: leaseExpectedEnd || null,
                    leaseActualEnd: leaseActualEnd || null,
                    LandlordId: LandlordId || null,
                    route: route || null,
                };
            }
            Apartment.prototype.api = {
                create: function(callback) {
                    $resource(WizioConfig.baseAPIURL + 'apartment').save(this.data, function(response) {
                        return callback(response);
                    });
                },
                update: function(callback) {
                    $resource(WizioConfig.baseAPIURL + 'apartment/:id', {
                        id: '@id'
                    }).save({
                        id: this.id
                    }, this.data, function(response) {
                        return callback(response);
                    });
                },
                getById: function(callback) {
                    $resource(WizioConfig.baseAPIURL + 'apartment/:id', {
                        id: '@id'
                    }).get({
                        id: this.id
                    }, function(response) {
                        return callback(response);
                    });
                }
            };
            Apartment.prototype.getGeocodeData = function(callback){
                var apartmentData = this.apartmentData;
                UnitCreateSvc.parseGeocodeData(this.apartmentData.concatAddr, null, function(err, response){
                    for(var key in response){
                        apartmentData[key] = response[key];
                    }
                    callback('done');
                });
            };
            Apartment.setDescription = function(){
                if(arguments.length > 0){
                    this.apartmentData.Descriptions = null;
                    this.apartmentData.Descriptions.description = arguments.description;
                    this.apartmentData.Descriptions.UserId
                }
            }
            Apartment.prototype.api = function() {
                return {
                    oneParam: $resource(WizioConfig.baseAPIURL + 'apartment/:id')
                };
            };
            Apartment.prototype.api = function() {
                return $resource(WizioConfig.baseAPIURL + 'apartment/:id', {
                    id: '@id'
                });
            };
            Apartment.api = function() {
                return $resource(WizioConfig.baseAPIURL + 'apartment/:id', {
                    id: '@id'
                });
            };
            Apartment.claimApi = function() {
                return $resource(WizioConfig.baseAPIURL + 'apartment/claim/:action', {
                    action: "@action"
                });
            };
            Apartment.build = function(data) {
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
