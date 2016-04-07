angular.module('Models')
    .factory('BrokerageModel', [
        '$q',
        '$resource',
        'WizioConfig',
        function($q, $resource, WizioConfig) {
            function Brokerage(id, businessName, licenseID, address, UserBrokers,
                ApartmentBrokerages, Listings, Leads, PropertyManagers) {
                this.id = id;
                this.businessName = businessName;
                this.licenseID = licenseID;
                this.address = address;
                this.UserBrokers = UserBrokers;
                this.ApartmentBrokerages = ApartmentBrokerages;
                this.Listings = Listings;
                this.Leads = Leads;
                this.PropertyManagers = PropertyManager;
            }

            Brokerage.getAllBrokerages = function getAllBrokerages() {
                return $q(function(resolve, reject) {
                    $resource(WizioConfig.baseAPIURL + 'brokerage')
                        .query(null, function(response) {
                            return resolve(response);
                        });
                });
            };

            Brokerage.savePartners = function savePartners(data){
                return new Promise(function(resolve, reject) {
                    $resource(WizioConfig.baseAPIURL + 'brokerage/partners')
                        .save(data, function(response){
                            return resolve(response);
                        });
                });
            };

            Brokerage.getSharedApartments = function(brokerageid){
                return new Promise(function(resolve, reject) {
                    $resource(WizioConfig.baseAPIURL + '/brokerage/partners/:id', {id: '@id'})
                        .query({id: brokerageid}, function(response) {
                            return response;
                        });
                });
            };

            function buildBrokerage(data) {
                return new Brokerage(
                    data.id,
                    data.businessName,
                    data.licenseID,
                    data.address,
                    data.UserBrokers,
                    data.ApartmentBrokerages,
                    data.Listings,
                    data.Leads,
                    data.PropertyManagers
                );
            }
            return Brokerage;
        }
    ]);
