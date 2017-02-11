angular.module('AccountApp').controller('DashboardCtrl', [
    '$scope',
    '$resource',
    '$q',
    'TokenSvc',
    'LoadingSpinnerFct',
    'WizioConfig',
    'ModalBuilderFct',
    'AWSFct',
    function($scope, $resource, $q, TokenSvc, LoadingSpinnerFct, WizioConfig, ModalBuilderFct, AWSFct) {
        // set flags
        $scope.emailToInvite = null;
        $scope.apartments = null;
        $scope.loading = false;

        var createModal = ModalBuilderFct.buildComplexModal;

        // get the user from session storage
        var user = TokenSvc.decode();

        // get whether the user has access to invite others
        $scope.inviteAccess = user.Subscriptions[0].UserSubscriptions.subscription_manager;

        // get all active listings for this user
        $scope.activelistings = TokenSvc.decode().ActiveListings;

        // create tour functionailty - button click
        $scope.createTour = function() {
            createModalWorkFlow()
            .then(saveUnitAndFloorPlan)
            .then(function(response) {})
            .catch(function(err){
                console.dir(err);
            })
        }
        function saveUnitAndFloorPlan(state) {
            var apiurl = WizioConfig.baseAPIURL;
            //send apartemnt address and unit number to the backend
            LoadingSpinnerFct.show("floorplanUpload");
            noFloorPlan = false;
            // if there is no file on the state, then there is no floor plan
            if (state.upload_floor_plan_flag) {
                noFloorPlan = true;
            };
            $resource(apiurl + 'unit').save({
                apartmentAddress: state.address,
                floorPlanModel: state.floorPlanModel,
                user: TokenSvc.decode(),
                noFloorPlan: noFloorPlan
            }, function(response) {
                if (response.message) {
                    alert("Apartment already created! Search for this apartment in your account's search bar, or search for it after selecting Modify Existing Tours on your account page");
                    LoadingSpinnerFct.hide("floorplanUpload");
                    return;
                } else {

                    var key = response.SubscriptionApartment.pubid + '/floorplan.png';

                    if (noFloorPlan) {
                        // stop the loading spinner
                        LoadingSpinnerFct.hide('floorplanUpload');

                        // reset form displays
                        $scope.formSubmitted = false;
                        alert('Unit created without a floorplan. Please click ok to continue.');
                        return;
                    } else {
                        AWSFct.s3.equirectPhotos.uploadFloorPlanFile(state.file, key)
                        .then(function(response){
                            LoadingSpinnerFct.hide('floorplanUpload');
                            alert('finished upload');
                        })
                        // saveFloorPlanToS3(key).then(function(response) {
                        //     $scope.formSubmitted = false;
                        //     alert('finished');
                        //     $uibModalInstance.close('finished');
                        // }).catch(function(err) {
                        //     alert(err);
                        //     $scope.formSubmitted = false;
                        // });
                    }
                }
            });
        }
        function createModalWorkFlow() {
            return $q(function(resolve, reject) {
                /*
                    Create the Create Unit Modal - gets the address information
                    THEN create the Upload Floor Plan Decision modal - Gets whether user
                         will upload a floor plan.
                    THEN if the user chooses to upload a floor plan, display upload floor plan modal
                         if the user chooses not to upload a floor plan, save the unit and end
                    THEN save unit and floor plan
                */
                createModal('md', WizioConfig.PhotographerApp.Views.CreateUnitModal, 'CreateUnitModalCtrl', {})
                .then(function(state) {
                    return createModal('md', WizioConfig.PhotographerApp.Views.UploadFloorPlanDescision, 'UploadFloorPlanDescisionCtrl', state);
                }).then(function(state) {
                    if(state.upload_floor_plan_flag) {
                        return createModal('md', WizioConfig.PhotographerApp.Views.UploadFloorPlan, 'UploadFloorPlanCtrl', state)
                    } else {
                        return resolve(state);
                    }
                }).then(function(state) {
                    return resolve(state);
                })
                .catch(function(err){
                    alert('in catch')
                    return reject(err);
                })
            })
        }
        $scope.changeApartment = function() {
            ModalBuilderFct.buildComplexModal('lg', 'public/app/modules/photographerapp/upload/upload.view.html', 'UploadPageCtrl', {});
        }
        $scope.$on('searchReturned', function(event, results) {
            LoadingSpinnerFct.hide('account-dashboard-search-loader')
            var apartments = [];
            console.dir(results);
            for (var i = 0; i < results.length; i++) {
                console.dir(results[i]);
                apartments.push(results[i].Apartment);
            }
            $scope.apartments = apartments;
            $scope.loading = false;
        });
        $scope.$on('Unit-Activated', function(event, results) {
            $scope.activelistings.push({
                pubid: results.pubid,
                Apartment: {
                    concatAddr: results.apartment.concatAddr,
                    unitNum: results.apartment.unitNum
                }
            })
        });
        $scope.$on('searchInitiated', function(event, name) {
            $scope.loading = true;
        });
        $scope.inviteUser = function() {
            var user = TokenSvc.decode();
            var userSubscriptions = user.Subscriptions[0].UserSubscriptions;
            var data = {
                emailOfInvitee: $scope.emailOfInvitee,
                UserId: user.id,
                BusinessId: userSubscriptions.BusinessId || userSubscriptions.BusinessPubId,
                SubscriptionId: userSubscriptions.SubscriptionId || userSubscriptions.SubscriptionPubId,
                firstName: user.firstName,
                lastName: user.lastName
            };
            console.dir(data);
            $resource(WizioConfig.baseAPIURL + 'subscription/invite').save(data).$promise.then(function(response) {
                alert('User Invited');
            })
        }
    }
]);
