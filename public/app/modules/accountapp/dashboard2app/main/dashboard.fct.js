angular.module('AccountApp').factory('DashboardFct', [
    'WizioConfig',
    '$resource',
    '$q',
    'TokenSvc',
    'AWSFct',
    'ModalBuilderFct',
    'LoadingSpinnerFct',
    function(WizioConfig, $resource, $q, TokenSvc, AWSFct, ModalBuilderFct, LoadingSpinnerFct) {
        var api = WizioConfig.baseAPIURL;

        // CREATE THE UNIT
        function createUnit(address, unitNum, noFloorPlan) {
            return $q(function(resolve, reject) {
                var dataToBePassed = {
                    apartmentAddress: address,
                    floorPlanModel: unitNum,
                    user: TokenSvc.decode(),
                    noFloorPlan: noFloorPlan,
                    token: TokenSvc.getToken()
                };
                $resource(api + 'unit').save(dataToBePassed, function(createdUnit) {
                    if (createdUnit.message) {
                        ModalBuilderFct.buildSimpleModal(
                            "",
                            "OK",
                            "Error",
                            'Apartment already created! Search for this apartment in your account search section or modify it in your Modify Existing Tour section.'
                        ).then(function(result) {
                            return;
                        });

                        LoadingSpinnerFct.hide('create-unit-floor-plan-spinner');
                        return reject(createdUnit);
                    } else {
                        activateListing(createdUnit.Apartment.pubid)
                        .then(function(activeListing){
                            var data = {
                                activeListing : activeListing,
                                Apartment : createdUnit.Apartment,
                                SubscriptionApartment: createdUnit.SubscriptionApartment
                            }
                            return resolve(data);
                        })
                    }
                });
            });
        }

        // UPLOAD THE FLOOR PLAN
        function uploadFloorPlan(subscriptionApartmentPubId, floorPlanFile) {
            return $q(function(resolve, reject) {
                var key = subscriptionApartmentPubId + '/floorplan.png';
                AWSFct.s3.equirectPhotos.uploadFloorPlanFile(floorPlanFile, key).then(function(response) {
                    ModalBuilderFct.buildSimpleModal(
                        "",
                        "OK",
                        "Success",
                        'Finished Upload!'
                    ).then(function(result) {
                        return;
                    });
                    resolve('success');
                })
            });
        }

        function activateListing(apartmentPubId) {
            return $q(function(resolve, reject){
                var user = TokenSvc.decode();
                var subscription = user.Subscriptions[0];
                var data = {
                    Apartment: {
                        pubid: apartmentPubId
                    },
                    User: {
                        id: user.id,
                        email: user.email
                    },
                    Subscription: {
                        pubid: subscription.pubid
                    },
                    UserSubscriptions: {
                        pubid: user.Subscriptions[0].UserSubscriptions_Migration.pubid
                    }
                };
                $resource(WizioConfig.baseAPIURL + 'activelisting')
                .save(data, function(activeListing) {
                    // apartment.newlyActive = true
                    return resolve(activeListing);
                })
            })
        }

        // WORKFLOW FOR CREATING THE UNIT AND UPLOADING A FLOOR PLAN
        function createTourAndFloorPlanWorkflow(address, unitNum, file) {
            return $q(function(resolve, reject) {
                var createdUnit;
                createUnit(address, unitNum, true)
                .then(function(data) {
                    createdUnit = data;
                    return uploadFloorPlan(data.SubscriptionApartment.pubid, file);
                })
                .then(function(response){
                    resolve(createdUnit);
                })
                .catch(function(error) {
                    ModalBuilderFct.buildSimpleModal(
                        "",
                        "OK",
                        "ERROR",
                        'Please try again.'
                    ).then(function(result) {
                        return;
                    });
                    return reject(error);
                });
            })
        }

        function getActiveListings() {
            return $q(function(resolve, reject){
                var userid = TokenSvc.decode().id;
                $resource(WizioConfig.baseAPIURL + 'activelisting/user/:userid',{userid: '@userid'})
                .query({userid: userid}, function(response){
                    resolve(response);
                });
            })
        }
        return {
            tour: {
                create: {
                    unit: createUnit,
                    floorPlan: uploadFloorPlan
                }
            },
            workflow: {
                createTourAndFloorPlan: createTourAndFloorPlanWorkflow
            },
            get: {
                activelistings: getActiveListings
            }
        };
    }
]);
