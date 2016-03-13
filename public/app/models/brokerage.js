angular.module('Models')
    .factory('BrokerageModel', [
        '$resource',
        'WizioConfig',
        function(WizioConfig, $resource) {
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

            function getAllBrokerages(){
                $resource(WizioConfig.baseAPIURL + 'brokerages')
                    .query(null, function(response){
                        return response;
                    });
            }

            function buildBrokerage(data) {
                return new Brokerage(
                    id: data.id,
                    businessName: data.businessName,
                    licenseID: data.licenseID,
                    address: data.address,
                    UserBrokers: data.UserBrokers,
                    ApartmentBrokerages: data.ApartmentBrokerages,
                    Listings: data.Listings,
                    Leads: data.Leads,
                    PropertyManagers: data.PropertyManagers
                );
            }
        }
    ])
