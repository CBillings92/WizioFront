angular.module('Models')
    .factory('LeaseModel', [
        '$resource',
        'WizioConfig',
        function($resource, WizioConfig) {
            function Lease(UserId, ApartmentId, DateStart, DateEnd, LeaseParams, LandlordId, BrokerId) {
                this.UserId = UserId;
                this.ApartmentId = ApartmentId;
                this.DateStart = DateStart;
                this.DateEnd = DateEnd;
                this.LeaseParams = LeaseParams;
                this.LandlordId = LandlordId;
                this.BrokerId = BrokerId;
            }

            var api = {
                base: $resource(WizioConfig.baseAPIURL + '/lease')
            };

            // Lease.buildNew = function(data){
            //     firstName: data.firstName,
            //     lastName: data.lastName,
            //     email: data.email,
            // }

            Lease.api = api;

            return Lease;
        }
    ]);
