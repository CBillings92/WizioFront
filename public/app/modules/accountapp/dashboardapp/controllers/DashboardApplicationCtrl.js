angular.module('AccountApp')
    .controller('DashboardApplicationCtrl', [
        '$scope',
        'ApplicationResource',
        'TokenSvc',
        'lodash',
        'ModalSvc',
        'WizioConfig',
        function($scope, ApplicationResource, TokenSvc, lodash, ModalSvc, WizioConfig) {
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

                            })
                        } else {
                            ApplicationResource.flex.save({
                                item: 'user',
                                action: 'remove'
                            }, dataPasser, function(data, status) {
                                $scope.applications.splice(value);
                                alert("Removed from application");
                            });
                        };
                    })
                }

            };
        }
    ]);
