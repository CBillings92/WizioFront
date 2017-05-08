angular.module('AccountApp').controller('DashboardCtrl', [
    '$scope',
    '$resource',
    '$q',
    'TokenSvc',
    'LoadingSpinnerFct',
    'WizioConfig',
    'ModalBuilderFct',
    'AWSFct',
    'DashboardFct',
    function($scope, $resource, $q, TokenSvc, LoadingSpinnerFct, WizioConfig, ModalBuilderFct, AWSFct, DashboardFct) {
        // set flags
        $scope.currentview = 'share';
        $scope.emailToInvite = null;
        $scope.apartments = null;
        $scope.loading = false;

        // short hand the factory function for ease of use
        var createModal = ModalBuilderFct.buildModalWithController;

        // get the user from session storage
        var user = TokenSvc.decode();
        var subsid = user.Subscriptions[0].id;
        if(subsid === 2 || subsid === 6 || subsid === 8 || subsid === 10) {
            TokenSvc.deleteToken();
            window.location.replace('https://www.wizio.co');
        }

        $scope.phoneNumber = user.phoneNumber;
        // console.log(user);

        // get whether the user has access to invite others
        $scope.inviteAccess = user.Subscriptions[0].UserSubscriptions_Migration.subscription_manager;

        // get all active listings for this user
        $scope.activelistings = user.ActiveListings;

        // create tour functionailty - button click
        $scope.createTour = function() {
            createModalWorkFlow().then(function(response) {}).catch(function(err) {
            });
        };

        /*
            FIRST - CREATE MODAL TO CAPTURE APARTMENT ADDRESS AND UNIT number
            SECOND - CREATE MODAL TO ASK IF THEY'LL BE UPLOADING A FLOOR plan
            THIRD - IF NO FLOOR PLAN, TERMINATE MODAL workflow
            THIRD - IF FLOOR PLAN, CREATE MODAL TO GET FLOOR PLAN file
            FOURTH - SAVE UNIT AND UPLOAD FLOOR PLAN IF APPLICABLE
        */
        function createModalWorkFlow() {
            return $q(function(resolve, reject) {
                var createUnitModalConfig = {
                    size: 'md',
                    templateUrl: WizioConfig.PhotographerApp.Views.CreateUnitModal,
                    controller: 'CreateUnitModalCtrl',
                    modalData: {}
                };
                var uploadFloorPlanDecisionModalConfig = {
                    size: 'md',
                    templateUrl: WizioConfig.PhotographerApp.Views.UploadFloorPlanDescision,
                    controller: 'UploadFloorPlanDecisionCtrl',
                    modalData: null
                };
                var uploadFloorPlanModalConfig = {
                    size: 'md',
                    templateUrl: WizioConfig.PhotographerApp.Views.UploadFloorPlan,
                    controller: 'UploadFloorPlanCtrl',
                    modalData: null
                };
                var addPhotosModalConfig = {
                    size: 'lg',
                    templateUrl: 'public/app/modules/photographerapp/upload-tool/upload-tool-modal.html',
                    controller: 'UploadPageNewCtrl',
                    modalData: {}
                };

                // GET APARTMENT ADDRESS AND UNIT NUMBER MODAL
                createModal(createUnitModalConfig).then(function(state) {

                    // CREATE A FLOOR PLAN? MODAL
                    uploadFloorPlanDecisionModalConfig.modalData = state;
                    return createModal(uploadFloorPlanDecisionModalConfig);
                }).then(function(state) {
                    if (state.upload_floor_plan_flag) {
                        // UPLOAD FLOOR PLAN MODAL - WILL CREATE UNIT TOO
                        uploadFloorPlanModalConfig.modalData = state;
                        return createModal(uploadFloorPlanModalConfig);
                    } else {
                        // CREATE ONLY THE UNIT - WITH NO FLOOR PLAN
                        return DashboardFct.tour.create.unit(state.address, state.floorPlanModel, false);
                    }
                })
                .then(function(response){
                    addPhotosModalConfig.modalData = response;
                    return createModal(addPhotosModalConfig);
                })
                .catch(function(err) {
                    alert('in catch');
                    return reject(err);
                });
            });
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

              });
          });
      };
        $scope.$on('searchReturned', function(event, results) {
            LoadingSpinnerFct.hide('account-dashboard-search-loader');
            var apartments = [];
            for (var i = 0; i < results.length; i++) {
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
            });
        });
        $scope.$on('searchInitiated', function(event, name) {
            $scope.loading = true;
        });
        $scope.inviteUser = function() {
            var user = TokenSvc.decode();
            var userSubscriptions = user.Subscriptions[0].UserSubscriptions_Migration;
            var data = {
                emailOfInvitee: $scope.emailOfInvitee,
                UserId: user.id,
                BusinessId: userSubscriptions.BusinessId || userSubscriptions.BusinessPubId,
                SubscriptionId: userSubscriptions.SubscriptionId || userSubscriptions.SubscriptionPubId,
                firstName: user.firstName,
                lastName: user.lastName
            };
            $resource(WizioConfig.baseAPIURL + 'subscription/invite').save(data).$promise.then(function(response) {
                alert('User Invited');
            });
        };

        var apiurl = WizioConfig.baseAPIURL;

        $scope.saveProfilePhoto = function() {

            var fileChooser = document.getElementById('file-chooser');
            //grab the first file in the file array (our floorplan)
            var file = fileChooser.files[0];
            //check if the file exists
            if (file) {
                var key = 'profile-photos/' + user.firstName + '_' + user.lastName + '_' + user.id + '.png';
                // file, key, bucket, region
                AWSFct.s3.profilePhotos.uploadphoto(file, key, false).then(function(response) {

                    key = AWSFct.utilities.modifyKeyForEnvironment(key);
                    $resource(apiurl + 'user/update-user-profile-photo').save({
                        awsProfilePhotoUrl: "https://cdn.wizio.co/" + key,
                        id: user.id
                    }, function(response) {});
                });

            } else {
                alert('please select a valid file');
            }
        };

        $scope.savePhoneNumber = function() {
            var phoneNumberInput = {};
            phoneNumberInput.value = document.getElementById('phone-input');

            if (phoneNumberInput.value) {
                $resource(apiurl + 'user/update-user-phone-number' )
                .save({phoneNumber: phoneNumberInput.value, id: user.id }, function(response){
                    // $scope.phoneNumber = phoneNumberInput.value;
                    alert("Your phone number has been updated to: " + phoneNumberInput.value);
                    // user = TokenSvc.decode();
                });
            }

        };

    }
]);
