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
        'FlexGetSetSvc',
        function($scope, $state, TokenSvc, ModalSvc, lodash, AssignmentModel, WizioConfig, ApplicationModel, FlexGetSetSvc) {
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
            AssignmentModel.api().twoParam.query({
                param1: 'user',
                param2: userId
            }, function(response) {
                $scope.assignments = response;

                for (var i = 0; i < $scope.assignments.length; i++) {
                    if ($scope.assignments[i].Apartment.Applications.length !== 0) {
                        applicationIds = lodash.pluck($scope.assignments[i].Apartment.Applications, 'ApplicationId');
                    }
                    //group the individual application objects by the ApplicationId
                    var groupedApplications = lodash.groupBy($scope.assignments[i].Apartment.Applications, 'ApplicationId');
                    // reassign the Applications key on the returned object
                    $scope.assignments[i].Apartment.Applications = groupedApplications;
                    //get the number of applications
                    $scope.assignments[i].Apartment.Applications.numberOf = Object.keys(groupedApplications).length;
                }
                $scope.noTenants = true;
            });

            $scope.add_tenants = function(val) {
                var addTenantsModalDefaults = modalDefaults(
                    'md',
                    WizioConfig.AccountDashboardViewsURL + 'AddTenantsToLeaseForm.html',
                    'AddTenantsToLeaseCtrl',
                    $scope.assignments[val]
                );

                ModalSvc.showModal(addTenantsModalDefaults, {}).then(function(result) {});
            };
            //navigate to editApartments form
            $scope.editApartments = function(apartmentIndex) {
                FlexGetSetSvc.set($scope.assignments[apartmentIndex].Apartment, 'ApartmentToEdit', 'ApartmentToEdit');
                $state.go('');
            };
            //go to claimApartments form
            $scope.claimApartments = function() {
                $state.go('Unit.Claim');
            };
            //indexNum comes fromt HTML form
            //open email now modal. Shoud allow landlords to select who to email
            //and provide pre-made emails to send.
            $scope.emailNow = function(apartmentIndex) {
                ModalSvc.showModal(addTenantsModalDefaults, {}).then(function(result) {

                });

            };

            $scope.createListing = function(apartmentIndex) {
                var ApartmentId = $scope.assignments[apartmentIndex].id;
                FlexGetSetSvc.set(ApartmentId, 'NewLeaseApartmentId', 'NewLeaseApartmentId');
                $state.go('Account.Lease.Create');
            };

            $scope.editListing = function(apartmentIndex) {
                FlexGetSetSvc.set($scope.assignments[apartmentIndex].Apartment, 'EditCurrentListing', 'EditCurrentListing');
                $state.go('Account.Lease.Edit');
            };

            //navigate to applicants page. indexNum comes from HTML form
            //form should contain applications for apartments.
            $scope.viewApplicants = function(apartmentIndex) {
                ApplicationModel.api.oneParam.save({
                        param1: 'ApplicationIdsWithProfiles'
                    },
                    applicationIds,
                    function(response) {
                        var viewApplicantsModalDefaults = modalDefaults(
                            'lg',
                            WizioConfig.ApplicationFormViewsURL + 'ApplicationOverview.html',
                            'ApplicationOverviewCtrl',
                            response
                        );
                    });

                ModalSvc.showModal(viewApplicantsModalDefaults, {}).then(function(result) {
                    switch (result) {
                        case "VIEW-DETAILS":
                            $state.go('Account.Dashboard.Application');
                            break;
                        default:

                    }
                });
            };
        }
    ]);
