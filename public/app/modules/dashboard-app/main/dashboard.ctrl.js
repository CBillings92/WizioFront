angular.module('DashboardApp').controller('DashboardCtrl', [
    '$scope',
    '$resource',
    '$q',
    'TokenSvc',
    'LoadingSpinnerFct',
    'WizioConfig',
    'ModalBuilderFct',
    'AWSFct',
    'DashboardFct',
    'StorageApp',
    '$state',
    'lodash',
    function($scope, $resource, $q, TokenSvc, LoadingSpinnerFct, WizioConfig, ModalBuilderFct, AWSFct, DashboardFct, StorageApp, $state, lodash) {
        $state.go('Account.Dashboard.ShareTour');
        $scope.state = 'Account.Dashboard.ShareTour';

        $scope.viewActiveTours = 1;
        $scope.changeTourListView = function () {
           $scope.viewActiveTours = !$scope.viewActiveTours;
           return;
        }
        // set flags
        // $scope.currentview = 'share';
        $scope.emailToInvite = null;
        $scope.apartments = null;
        $scope.loading = false;
        // get the user from session storage
        var user = TokenSvc.decode();
        var subsid = user.Subscriptions[0].id;
        if(subsid === 6 || subsid === 10 || subsid === 17) {
            TokenSvc.deleteToken();
            window.location.replace('https://www.wizio.co');
        }
        // FIXME: Move ShareTour/ActiveListings/InactiveListings code into own app
        // get active listings for logged in user
        DashboardFct.get.activelistings()
        .then(function(tours){
            return parseTours(tours);
        });

        $scope.$on('ActiveListingsUpdated', function(ev, data){
            DashboardFct.get.activelistings()
            .then(function(tours){
                return parseTours(tours);
            });
        })

        function parseTours(tours) {
            StorageApp.store('ActiveListings', tours);
            $scope.orderedTours = lodash.groupBy(tours, 'isActive')
            $scope.inactiveListings = $scope.orderedTours[false];
            $scope.activeListings = $scope.orderedTours[true];
            return;
        }
        // short hand the factory function for ease of use
        var createModal = ModalBuilderFct.buildModalWithController;

        // get the user from session storage
        var user = TokenSvc.decode();

        $scope.phoneNumber = user.phoneNumber;

        // get whether the user has access to invite others
        $scope.inviteAccess = user.Subscriptions[0].UserSubscriptions_Migration.subscription_manager;

        // create tour functionailty - button click
        $scope.createTour = function() {
            createModalWorkFlow()
                .then(function(response) {})
                .catch(function(err) {})
        }

        $scope.changeState = function (state) {

            $state.go('Account.Dashboard.' + state);
            $scope.state = 'Account.Dashboard.' + state;
        }

        /*
            FIRST - CREATE MODAL TO CAPTURE APARTMENT ADDRESS AND UNIT number
            SECOND - CREATE MODAL TO ASK IF THEY'LL BE UPLOADING A FLOOR plan
            THIRD - IF NO FLOOR PLAN, TERMINATE MODAL workflow
            THIRD - IF FLOOR PLAN, CREATE MODAL TO GET FLOOR PLAN file
            FOURTH - SAVE UNIT AND UPLOAD FLOOR PLAN IF APPLICABLE
        */
        function createModalWorkFlow() {
            return $q(function(resolve, reject) {
                // accept address modal
                var createUnitModalConfig = {
                    size: 'md',
                    templateUrl: WizioConfig.PhotographerApp.Views.CreateUnitModal,
                    controller: 'CreateUnitModalCtrl',
                    modalData: {}
                };
                // upload a floorplan? modal
                var uploadFloorPlanDecisionModalConfig = {
                    size: 'md',
                    templateUrl: WizioConfig.PhotographerApp.Views.UploadFloorPlanDescision,
                    controller: 'UploadFloorPlanDecisionCtrl',
                    modalData: null
                }
                // choose floorplan file
                var uploadFloorPlanModalConfig = {
                    size: 'md',
                    templateUrl: WizioConfig.PhotographerApp.Views.UploadFloorPlan,
                    controller: 'UploadFloorPlanCtrl',
                    modalData: null
                }
                // add photos modal
                var addPhotosModalConfig = {
                    size: 'lg',
                    templateUrl: 'public/app/modules/photographerapp/upload-tool/upload-tool-modal.html',
                    controller: 'UploadPageNewCtrl',
                    modalData: {}
                }

                // GET APARTMENT ADDRESS AND UNIT NUMBER MODAL
                createModal(createUnitModalConfig)
                    .then(function(state) {
                        // Assign modal data
                        uploadFloorPlanDecisionModalConfig.modalData = state;
                        // CREATE A FLOOR PLAN? MODAL
                        return createModal(uploadFloorPlanDecisionModalConfig);
                })
                .then(function(state) {
                    if (state.upload_floor_plan_flag) {
                        // UPLOAD FLOOR PLAN MODAL - WILL CREATE UNIT TOO
                        uploadFloorPlanModalConfig.modalData = state;
                        return createModal(uploadFloorPlanModalConfig);
                    } else {
                        // CREATE ONLY THE UNIT - WITH NO FLOOR PLAN
                        return DashboardFct.tour.create.unit(state.address, state.floorPlanModel, false)
                    }
                })
                .then(function(response){
                    addPhotosModalConfig.modalData = response;
                    return createModal(addPhotosModalConfig)
                })
                .catch(function(err) {
                    ModalBuilderFct.buildSimpleModal(
                        "",
                        "OK",
                        "Error",
                        'There has been an error, please try again.'
                    ).then(function(result) {
                        return;
                    });
                    return reject(err);
                })
            })
        }
        $scope.modifyExistingTour = function() {
            var searchModifyModalConfig = {
              size: 'lg',
              templateUrl: 'public/app/modules/photographerapp/upload/upload.view.html',
              controller: 'UploadPageCtrl',
              modalData: {}
            };
            var uploadTourPageModalConfig = {
              size: 'lg',
              templateUrl: 'public/app/modules/photographerapp/upload-tool/upload-tool-modal.html',
              controller: 'UploadPageNewCtrl',
              modalData: {}
            };
            createModal(searchModifyModalConfig)
            .then(function(data){
              uploadTourPageModalConfig.modalData = data;
              createModal(uploadTourPageModalConfig)
              .then(function(response){

              })
            })
        }

        $scope.$on('Unit-Activated', function(event, results) {
            $scope.activelistings.push({
                pubid: results.pubid,
                Apartment: {
                    concatAddr: results.apartment.concatAddr,
                    unitNum: results.apartment.unitNum
                }
            })
        });

    }
]);
