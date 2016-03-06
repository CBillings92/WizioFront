angular.module('AccountApp')
    .controller('DashboardApplicationCtrl', [
        '$scope',
        'ApplicationResource',
        'ApplicationModel',
        'TokenSvc',
        'lodash',
        'ModalSvc',
        'WizioConfig',
        function($scope, ApplicationResource, ApplicationModel, TokenSvc, lodash, ModalSvc, WizioConfig) {
            var modalDefaults = function(templateUrl, controller, modalData) {
                return {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    templateUrl: templateUrl,
                    controller: controller,
                    resolve: {
                        modalData: function() {
                            return modalData;
                        }
                    }
                };
            };
            //get user object from token
            var user = TokenSvc.decode();
            //get all ApplicationIds on the user object
            var applicationIdArray = lodash.pluck(user.applications, "ApplicationId");
            //call api and send applicationIds to retrieve applictions for display
            ApplicationResource.findByAppIds.save(applicationIdArray, function(data, status) {
                //if applicaitons were found
                if (data.length !== 0) {
                    //grop the applications by ApplicationId
                    var buildingApplications = lodash.groupBy(data, "ApplicationId");
                    $scope.applications = lodash.values(buildingApplications);
                    console.dir($scope.applications);
                    if ($scope.applications.length > 0) {
                        $scope.applicationsExist = true;
                        console.dir($scope.applications);
                    }
                } else {
                    $scope.applicationsExist = false;
                }
            });
            $scope.changeOwner = function(value){
                var selectOwnerModalDefaults = {
                    backdrop: true,
                    keyboard: true,
                    modalFade: true,
                    size: 'md',
                    templateUrl: WizioConfig.ApplicationFormViewsURL + "NewOwnerSelectModal.html",
                    controller: 'NewOwnerSelectModalCtrl',
                    resolve: {
                        modalData: function() {
                            return $scope.applications[value];
                        }
                    }
                };
                ModalSvc.showModal(selectOwnerModalDefaults, {}).then(function(response){

                });
            };
            $scope.deleteApplication = function(value){
                var modalOptions = {
                    closeButtonText: "Cancel",
                    actionButtonText: "Delete Application",
                    headerText: "Deleting Application",
                    bodyText: "This will delete the entire application and remove yourself and all other applicants from the apartment. Are you sure you want to proceed?"
                };
                ModalSvc.showModal({}, modalOptions).then(function(result){
                    ApplicationModel.api.oneParam.remove({
                        param1: $scope.applications[value][0].ApplicationId,
                    }, function(data, status) {
                        $scope.applications.splice(value);
                        alert("Removed from application");
                    });
                });
            };
            $scope.removeFromApplication = function(value) {
                var dataPasser = {
                    ApplicationId: $scope.applications[value][0].ApplicationId,
                    concatAddr: $scope.applications[value][0].Apartment.concatAddr,
                    UserId: user.id,
                };
                if (user.id === $scope.applications[value][0].ApplicationOwner) {
                    var modalOptions = {
                        closeButtonText: "Delete Application",
                        actionButtonText: "Select a New Owner",
                        headerText: "Deleting Applicant",
                        bodyText: "Would you like to delete the entire application or select a new application owner for the remaining applicants?"
                    };
                    $scope.applications[value].removeCurrentUser = true;
                    var selectOwnerModalDefaults = {
                        backdrop: true,
                        keyboard: true,
                        modalFade: true,
                        size: 'md',
                        templateUrl: WizioConfig.ApplicationFormViewsURL + "NewOwnerSelectModal.html",
                        controller: 'NewOwnerSelectModalCtrl',
                        resolve: {
                            modalData: function() {
                                return $scope.applications[value];
                            }
                        }
                    };
                    ModalSvc.showModal({}, modalOptions).then(function(response) {
                        console.dir(response);
                        if (response === "ok") {
                            ModalSvc.showModal(selectOwnerModalDefaults, {}).then(function(response){

                            });
                        } else {
                            ApplicationResource.flex.save({
                                item: 'user',
                                action: 'remove'
                            }, dataPasser, function(data, status) {
                                $scope.applications.splice(value);

                                var userRemovedModalOptions = {
                                    closeButtonText: "Close",
                                    actionButtonText: "OK",
                                    headerText: "User Removal",
                                    bodyText: 'You have been removed from this application. Thanks for using Wizio!'
                                };
                                ModalSvc.showModal({}, userRemovedModalOptions)
                                    .then(function(result) {});
                            });
                        }
                    });
                } else {
                    var modalOptionsDeleteApp = {
                        closeButtonText: "Delete Application",
                        actionButtonText: "Select a New Owner",
                        headerText: "Deleting Applicant",
                        bodyText: "Would you like to delete the entire application or select a new application owner for the remaining applicants?"
                    };

                    ModalSvc.showModal({}, modalOptionsDeleteApp).then(function(response) {
                        console.dir(response);
                        if (response === "ok") {
                            ApplicationResource.flex.save({
                                item: 'user',
                                action: 'remove'
                            }, dataPasser, function(data, status) {
                                $scope.applications.splice(value);
                                alert("Removed from application");
                            });
                        } else {
                        }
                    });
                }

            };
        }
    ]);
