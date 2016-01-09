angular.module('AccountApp')
.controller('DashboardLLUnitListCtrl', [
    '$scope',
    '$state',
    'TokenSvc',
    'ModalSvc',
    'lodash',
    'AssignmentModel',
    'WizioConfig',
    'ApplicationModel',
    function ($scope, $state, TokenSvc, ModalSvc, lodash, AssignmentModel, WizioConfig, ApplicationModel) {
        //reusable function for creating modalDefaults for ModalSvc
        var modalDefaults = function(size, templateUrl, controller, modalData) {
            return {
                backdrop: true,
                keyboard: true,
                modalFade: true,
                size: size,
                templateUrl: templateUrl,
                controller: controller,
                resolve: {
                    modalData: function() {
                        return modalData;
                    }
                }
            };
        };
        //get apartments associated with user
        var userId = TokenSvc.decode().id;
        var applicationIds = [];
        AssignmentModel.api().twoParam.query({param1:'user', param2:userId}, function(response){
            $scope.assignments = response;
            for(var i = 0; i < $scope.assignments.length; i++){
                if($scope.assignments[i].Apartment.Applications.length != 0){
                    applicationIds.push($scope.assignments[i].Apartment.Applications[0].ApplicationId);
                }
                //group the individual application objects by the ApplicationId
                var groupedApplications = lodash.groupBy($scope.assignments[i].Apartment.Applications, 'ApplicationId');
                // reassign the Applications key on the returned object
                $scope.assignments[i].Apartment.Applications = groupedApplications;
                //get the number of applications
                $scope.assignments[i].Apartment.Applications.numberOf = Object.keys(groupedApplications).length;
            }
            $scope.noTenants = true;
            console.dir($scope.assignments);
        });

        $scope.add_tenants = function(val){
            var addTenantsModalDefaults = modalDefaults(
                'md',
                WizioConfig.AccountDashboardViewsURL + 'AddTenantsToLeaseForm.html',
                'AddTenantsToLeaseCtrl',
                $scope.assignments[val]
            );

            ModalSvc.showModal(addTenantsModalDefaults, {}).then(function(result){

            });

        };

        //navigate to editApartments form
        $scope.editApartments = function(){

        };
        //go to claimApartments form
        $scope.claimApartments = function(){
            $state.go('Unit.Claim');
        };
        //indexNum comes fromt HTML form
        //open email now modal. Shoud allow landlords to select who to email
        //and provide pre-made emails to send.
        $scope.emailNow = function(apartmentIndex){

        };

        //navigate to applicants page. indexNum comes from HTML form
        //form should contain applications for apartments.
        $scope.viewApplicants = function(apartmentIndex){
            console.dir(applicationIds);
            ApplicationModel.api.oneParam.save({param1: 'ApplicationIdsWithProfiles'}, applicationIds, function(response){
                console.dir(response);
                var viewApplicantsModalDefaults = modalDefaults(
                    'lg',
                    WizioConfig.ApplicationFormViewsURL + 'ApplicationOverview.html',
                    'ApplicationOverviewCtrl',
                    $scope.assignments[apartmentIndex]
                );

                ModalSvc.showModal(viewApplicantsModalDefaults, {}).then(function(result){
                    console.dir(result);
                });
            })
        };

    }
]);
