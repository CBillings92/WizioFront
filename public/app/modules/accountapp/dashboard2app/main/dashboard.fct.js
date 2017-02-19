angular.module('AccountApp')
    .factory('DashboardFct', [
        'WizioConfig',
        '$resource',
        '$q',
        'TokenSvc',
        'AWSFct',
        function (WizioConfig, $resource, $q, TokenSvc, AWSFct){
            var api = WizioConfig.baseAPIURL;

            // CREATE THE UNIT
            function createUnit(address, unitNum, noFloorPlan) {
                return $q(function(resolve, reject){
                    var dataToBePassed = {
                        apartmentAddress: address,
                        floorPlanModel: unitNum,
                        user: TokenSvc.decode(),
                        noFloorPlan: noFloorPlan,
                        token: TokenSvc.getToken()
                    };
                    $resource(api + 'unit').save(dataToBePassed, function(response){
                        if(response.message) {
                            alert("Apartment already created! Search for this apartment in your account search section or modify it in your Modify Existing Tour section.");
                            LoadingSpinnerFct.hide("floorplanUpload");
                            return reject(response);
                        } else {
                            return resolve(response);
                        }
                    });
                });
            }

            // UPLOAD THE FLOOR PLAN
            function uploadFloorPlan(subscriptionApartmentPubId, floorPlanFile) {
                return $q(function(resolve, reject){
                    var key = subscriptionApartmentPubId + '/floorplan.png';
                    AWSFct.s3.equirectPhotos.uploadFloorPlanFile(floorPlanFile, key)
                    .then(function(response){
                        alert('finished upload');
                        resolve('success');
                    })
                });
            }

            // WORKFLOW FOR CREATING THE UNIT AND UPLOADING A FLOOR PLAN
            function createTourAndFloorPlanWorkflow(address, unitNum, file) {
                return $q(function(response){
                    createUnit(
                        address,
                        unitNum,
                        true
                    )
                    .then(function(response){
                        return uploadFloorPlan(
                            response.SubscriptionApartment.pubid,
                            file
                        )
                    })
                    .then(function(response){
                        LoadingSpinnerFct.hide('floorplanUpload');
                        return resolve(response);
                    })
                    .catch(function(error){
                        alert('error');
                        LoadingSpinnerFct.hide('floorplanUpload');
                        return reject(error);
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
                }
            };
        }
    ]);
