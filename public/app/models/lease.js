angular.module('Models')
    .factory('LeaseModel', [
        '$resource',
        '$q',
        'TokenSvc',
        'FlexGetSetSvc',
        'WizioConfig',
        function($resource, $q, TokenSvc, FlexGetSetSvc, WizioConfig) {
            function Lease(id, dateStart, dateEnd, snowRemoval, smoking, pets,
                electricIncluded, heatIncluded, hotWaterIncluded, waterSewerIncluded,
                gasIncluded, cableIncluded, internetIncluded, trashRemoval,
                monthsRentFree, lastMonthsRentNeeded, firstMonthsRentNeeded,
                brokerFeeNeeded, newKeyFeeNeeded, securityDeposit, secDepositNeeded,
                monthlyRent, brokerFeeAmount, newKeyFeeAmount, Description, wifi) {
                this.leaseData = {
                    id: id,
                    dateStart: dateStart,
                    dateEnd: dateEnd,
                    snowRemoval: snowRemoval,
                    smoking: smoking,
                    pets: pets,
                    electricIncluded: electricIncluded,
                    heatIncluded: heatIncluded,
                    hotWaterIncluded: hotWaterIncluded,
                    waterSewerIncluded: waterSewerIncluded,
                    gasIncluded: gasIncluded,
                    cableIncluded: cableIncluded,
                    internetIncluded: internetIncluded,
                    trashRemoval: trashRemoval,
                    monthsRentFree: monthsRentFree,
                    lastMonthsRentNeeded: lastMonthsRentNeeded,
                    firstMonthsRentNeeded: firstMonthsRentNeeded,
                    brokerFeeNeeded: brokerFeeNeeded,
                    newKeyFeeNeeded: newKeyFeeNeeded,
                    securityDeposit: securityDeposit,
                    secDepositNeeded: secDepositNeeded,
                    monthlyRent: monthlyRent,
                    brokerFeeAmount: brokerFeeAmount,
                    newKeyFeeAmount: newKeyFeeAmount,
                    Description: Description,
                    wifiIncluded: wifi
                };
            }
            function noParamRequest() {
                var requestType = noParamRequest.Arguments[0];
                var body = noParamRequest.Arguments[1] === 'undefined' ? {} : noParamRequest.Arguments[1];
                return $q(function(resolve, reject) {
                    switch (requestType) {
                        case "post":
                            $resource(
                                WizioConfig.baseAPIURL + '/lease'
                            )[requestType](
                                body,
                                function(result) {
                                    resolve(result);
                                });
                            break;
                        default:
                        $resource(
                            WizioConfig.baseAPIURL + '/lease'
                        )[requestType](
                            function(result) {
                                resolve(result);
                            });
                    }
                });
            }

            function getRequest() {
                var apiString = "";
                var apiResourceObj = {};
                var paramObj = {};
                /*
                    start at 1 to get only the parameters that make it into the
                    API string. The first argument is the method.
                */
                console.dir(getRequest.arguments);
                for (var i = 1; i < getRequest.arguments.length; i++) {
                    apiString += "/:param" + i.toString();
                    apiResourceObj['param' + i.toString()] = '@param' + i.toString();
                    paramObj['param' + i.toString()] = getRequest.arguments[i];
                }
                return $q(function(resolve, reject) {
                    var request = $resource(
                        WizioConfig.baseAPIURL +
                        'lease' +
                        apiString,
                        paramObj
                    );
                    console.dir(request);
                    request[getRequest.arguments[0]](paramObj, function(result) {
                        console.dir(result);
                        resolve(result);
                    });
                });
            }

            function postRequest() {
                var apiString = "";
                var apiResourceObj = {};
                var paramObj = {};
                var requestBody = postRequest.Arguments.length - 1;
                /*
                    start at 1 to get only the parameters that make it into the
                    API string. The first argument is the method.
                */
                for (var i = 1; i < getRequest.Arguments.length; i++) {
                    apiString += "/:param" + i.toString();
                    apiResourceObj['param' + i.toString()] = '@param' + i.toString();
                    paramObj['param' + i.toString()] = getRequest.Arguments[i];
                }
                return $q(function(resolve, reject) {
                    $resource(
                        WizioConfig.baseAPIURL +
                        'lease' +
                        apiString,
                        paramObj
                    )[getRequest.Arguments[0]](paramObj, requestBody, function(result) {
                        resolve(result);
                    });
                });
            }

            function api(method) {
                return $q(function(resolve, reject) {
                    console.dir(api.arguments);
                    console.dir(api.arguments.length);
                    if (api.arguments.length === 1) {

                    } else if (method === 'get') {
                        getRequest.apply(this, api.arguments)
                            .then(function(result) {
                                resolve(result);
                            });
                    } else if (method === "post") {
                        postRequest.apply(this, api.arguments)
                            .then(function(result) {
                                resolve(result);
                            });
                    } else {
                        console.error("improper request type made at lease");
                    }
                });
            }
            //store these functions on each new Lease's object prototype
            Lease.prototype.setAssociationData = function() {
                this.leaseData.UserId = TokenSvc.decode().id;
                this.leaseData.PropertyManagerId = TokenSvc.decode().PropertyManagerId;
                this.leaseData.ApartmentId = FlexGetSetSvc.get('NewLeaseApartmentId');
                return;
            };
            Lease.prototype.create = function(callback) {
                var data = this;
                $resource(WizioConfig.baseAPIURL + 'lease').save(data, function(response) {
                    callback(response);
                });
            };
            Lease.prototype.update = function(callback) {
                $resource(WizioConfig.baseAPIURL + 'lease/:id', {
                    id: '@id'
                }).save({
                        id: this.leaseData.id
                    },
                    this.leaseData,
                    function(response) {
                        callback(response);
                    });
            };



            Lease.build = function(data) {
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
                    data.waterSewerIncluded,
                    data.gasIncluded,
                    data.cableIncluded,
                    data.internetIncluded,
                    data.trashRemoval,
                    data.monthsRentFree,
                    data.lastMonthsRentNeeded,
                    data.firstMonthsRentNeeded,
                    data.brokerFeeNeeded,
                    data.newKeyFeeNeeded,
                    data.securityDeposit,
                    data.secDepositNeeded,
                    data.monthlyRent,
                    data.brokerFeeAmount,
                    data.newKeyFeeAmount,
                    data.Description,
                    data.wifiIncluded
                );
            };

            Lease.api = api;
            return Lease;
        }
    ]);
