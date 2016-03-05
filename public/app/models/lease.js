angular.module('Models')
    .factory('LeaseModel', [
        '$resource',
        'TokenSvc',
        'FlexGetSetSvc',
        'WizioConfig',
        function($resource, TokenSvc, FlexGetSetSvc, WizioConfig) {
            function Lease(id, dateStart, dateEnd, snowRemoval, smoking, pets,
                electricIncluded, heatIncluded, hotWaterIncluded, waterIncluded,
                gasIncluded, cableIncluded, internetIncluded, trashRemoval,
                monthsRentFree, lastMonthsRentNeeded, firstMonthsRentNeeded,
                brokerFeeNeeded, newKeyFeeNeeded, securityDeposit, secDepositNeeded,
                monthlyRent, brokerFeeAmount, newKeyFeeAmount, Description) {
                this.leaseData = {
                    id: id,
                    dateStart : dateStart,
                    dateEnd : dateEnd,
                    snowRemoval : snowRemoval,
                    smoking : smoking,
                    pets : pets,
                    electricIncluded : electricIncluded,
                    heatIncluded : heatIncluded,
                    hotWaterIncluded : hotWaterIncluded,
                    waterIncluded : waterIncluded,
                    gasIncluded : gasIncluded,
                    cableIncluded : cableIncluded,
                    internetIncluded : internetIncluded,
                    trashRemoval : trashRemoval,
                    monthsRentFree : monthsRentFree,
                    lastMonthsRentNeeded : lastMonthsRentNeeded,
                    firstMonthsRentNeeded : firstMonthsRentNeeded,
                    brokerFeeNeeded : brokerFeeNeeded,
                    newKeyFeeNeeded : newKeyFeeNeeded,
                    securityDeposit : securityDeposit,
                    secDepositNeeded : secDepositNeeded,
                    monthlyRent : monthlyRent,
                    brokerFeeAmount : brokerFeeAmount,
                    newKeyFeeAmount : newKeyFeeAmount,
                    Description: Description
                };
            }

            var api = {
                base: $resource(WizioConfig.baseAPIURL + 'lease')
            };
            //store these functions on each new Lease's object prototype
            Lease.prototype.setAssociationData = function(){
                this.leaseData.UserId = TokenSvc.decode().id;
                this.leaseData.PropertyManagerId = TokenSvc.decode().PropertyManagerId;
                this.leaseData.ApartmentId = FlexGetSetSvc.get('NewLeaseApartmentId');
                return;
            };
            Lease.prototype.create = function(callback){
                var data = this;
                $resource(WizioConfig.baseAPIURL + 'lease').save(data, function(response){
                    callback(response);
                });
            };
            Lease.prototype.update = function(callback){
                $resource(WizioConfig.baseAPIURL + 'lease/:id', {id: '@id'}).save(
                    {id: this.leaseData.id},
                    this.leaseData,
                    function(response){
                        callback(response);
                    });
            };



            Lease.build = function(data){
                return new Lease(
                        data.id,
                        data.dateStart,
                        data.dateEnd,
                        data.snowRemoval,
                        data.smoking,
                        data.pets,
                        data.electricIncluded,
                        data.heatIncluded,
                        data.hotWaterIncluded,
                        data.waterIncluded,
                        data.gasIncluded,
                        data.cableIncluded,
                        data.internetIncluded,
                        data.trashRemoval,
                        data.monthsRentFree,
                        data.lastMonthsRent,
                        data.firstMonthsRent,
                        data.brokerFeeNeeded,
                        data.newKeyFeeNeeded,
                        data.securityDeposit,
                        data.secDepositNeeded,
                        data.monthlyRent,
                        data.brokerFeeAmount,
                        data.newKeyFeeAmount,
                        data.Description
                );
            };

            Lease.api = api;
            console.dir(Lease);
            return Lease;
        }
    ]);
