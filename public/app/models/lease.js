angular.module('Models')
    .factory('LeaseModel', [
        '$resource',
        'WizioConfig',
        function($resource, WizioConfig) {
            function Lease(leaseID, dateStart, dateEnd, snowRemoval, smoking, pets, electricIncluded, heatIncluded, hotWaterIncluded, waterIncluded, gasIncluded, cableIncluded, internetIncluded, trashRemoval, monthsRentFree, lastMonthsRentNeeded, firstMonthsRentNeeded, brokerFeeNeeded, newKeyFeeNeeded, securityDeposit, secDepositNeeded, monthlyRent, newKeyFeeAmount, brokerFeeAmount) {
                this.leaseID =leaseID;
                this.dateStart =dateStart;
                this.dateEnd =dateEnd;
                this.snowRemoval =snowRemoval;
                this.smoking =smoking;
                this.pets =pets;
                this.electricIncluded =electricIncluded;
                this.heatIncluded =heatIncluded;
                this.hotWaterIncluded =hotWaterIncluded;
                this.waterIncluded =waterIncluded;
                this.gasIncluded =gasIncluded;
                this.cableIncluded =cableIncluded;
                this.internetIncluded =internetIncluded;
                this.trashRemoval =trashRemoval;
                this.monthsRentFree =monthsRentFree;
                this.lastMonthsRent =lastMonthsRent;
                this.firstMonthsRent =firstMonthsRent;
                this.brokerFeeNeeded =brokerFeeNeeded;
                this.newKeyFeeNeeded =newKeyFeeNeeded;
                this.securityDeposit =securityDeposit;
                this.secDepositNeeded = secDepositNeeded;
                this.monthlyRent =monthlyRent;
                this.newKeyFeeAmount =newKeyFeeAmount;
                this.brokerFeeAmount =brokerFeeAmount;
            }

            var api = {
                base: $resource(WizioConfig.baseAPIURL + 'lease')
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
