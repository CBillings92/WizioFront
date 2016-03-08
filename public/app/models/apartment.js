angular.module('Models')
    .factory('ApartmentModel', [
        '$sessionStorage',
        '$resource',
        '$q',
        'lodash',
        'WizioConfig',
        'UnitCreateSvc',
        function($sessionStorage, $resource, $q, lodash, WizioConfig, UnitCreateSvc) {
            function Apartment(id, street, unitNum, neighborhood,
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
                PropertyManagerId,
                route,
                laundry,
                elevator,
                CreatedById,
                UpdatedById
            ) {
                this.apartmentData = {
                    id: id || null,
                    street: street || null,
                    unitNum: unitNum || null,
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
                    ApartmentType: ApartmentType || null,
                    latitude: latitude || null,
                    longitude: longitude || null,
                    concatAddr: concatAddr || null,
                    PropertyManagerId: PropertyManagerId || null,
                    route: route || null,
                    laundry: laundry || null,
                    elevator: elevator || null,
                    CreatedById: CreatedById || null,
                    UpdatedById: UpdatedById || null,
                };
            }
            Apartment.prototype.api = function(){
                var apartment = this;
                return {
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
                    },
                    findOrCreate: function(action, callback){
                        console.dir(apartment);
                        $resource(WizioConfig.baseAPIURL + 'apartment/claim/:action', {
                            action: "@action"
                        }).save(action, apartment, function(response){
                            return callback(response);
                        });
                    }

                };
            };
            Apartment.prototype.getGeocodeData = function(callback){
                var apartmentData = this.apartmentData;
                return $q(function(resolve, reject){
                    UnitCreateSvc.parseGeocodeData(apartmentData.concatAddr, null, function(err, response){
                        console.dir(response);
                        for(var key in response){
                            if(response[key] === 'Longitude'){
                                apartment.Longitude = parseFloat(response[key]).toFixed(6);
                            } else if (response[key] === 'Latitude'){
                                apartment.Latitude = parseFloat(response[key]).toFixed(6);
                            } else {
                                apartmentData[key] = response[key];
                            }
                        }
                        resolve('done');
                    });
                });

            };
            Apartment.prototype.duplicate = function(){
                var duplicate = {};
                for(var key in this.apartmentData){
                    if(this.apartmentData.hasOwnProperty(key)){
                        duplicate[key] = this.apartmentData[key];
                    }
                }
                return duplicate;
            };
            Apartment.setDescription = function(){
                if(arguments.length > 0){
                    this.apartmentData.Descriptions = null;
                    this.apartmentData.Descriptions.description = arguments.description;
                    // this.apartmentData.Descriptions.UserId
                }
            };
            Apartment.prototype.concealAddress = function(){
                var left = Math.floor((this.apartmentData.concatAddr.charCodeAt(5) /19) + 4);
                    var right = Math.floor((this.apartmentData.concatAddr.charCodeAt(3) /19) + 4);
                    var houseNumInt = parseInt((this.apartmentData.concatAddr).replace(/(^\d+)(.+$)/i, '$1'));
                    var houseNumLow = houseNumInt - left;
                    if(houseNumInt < 15){
                        houseNumLow = 1;
                    }
                    var houseNumHigh = houseNumInt + right;
                    var houseNumRange = houseNumLow.toString() + "-" + houseNumHigh.toString();
                    this.apartmentData.concatAddr = houseNumRange + this.apartmentData.concatAddr.replace(/^\d+/, '');
            };
            // Apartment.prototype.api = function() {
            //     return {
            //         oneParam: $resource(WizioConfig.baseAPIURL + 'apartment/:id')
            //     };
            // };
            // Apartment.prototype.api = function() {
            //     return $resource(WizioConfig.baseAPIURL + 'apartment/:id', {
            //         id: '@id'
            //     });
            // };
            Apartment.api = function() {
                return $resource(WizioConfig.baseAPIURL + 'apartment/:id', {
                    id: '@id'
                });
            };
            Apartment.claimApi = function(data, callback) {
                return $resource(WizioConfig.baseAPIURL + 'apartment/claim/finalize').save(data, function(res){
                    return callback(res);
                });
            };

            Apartment.copyGeocodedData = function(ApartmentIntstance){
                var oldData = ApartmentIntstance.apartmentData;
                return new Apartment(
                    oldData.id,
                    oldData.street,
                    null,
                    oldData.neighborhood,
                    oldData.locality,
                    oldData.administrative_area_level_3,
                    oldData.state,
                    oldData.zip,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    null,
                    oldData.latitude,
                    oldData.longitude,
                    oldData.concatAddr,
                    null,
                    null,
                    null,
                    null,
                    null
                );
            };
            Apartment.build = function(data) {
                return new Apartment(
                    data.id,
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
                    data.PropertyManagerId,
                    data.route,
                    data.laundry,
                    data.elevator,
                    data.CreatedById,
                    data.UpdatedById
                );
            };


            return Apartment;
        }
    ]);
