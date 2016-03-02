//Dashboard controller for the landllord app
angular.module('AccountApp')
    .controller('DashboardLLUnitListCtrl', [
        '$scope',
        '$state',
        '$resource',
        'TokenSvc',
        'ModalSvc',
        'lodash',
        'AssignmentModel',
        'WizioConfig',
        'ApplicationModel',
        'FlexGetSetSvc',
        function($scope, $state, $resource, TokenSvc, ModalSvc, lodash, AssignmentModel, WizioConfig, ApplicationModel, FlexGetSetSvc) {

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
            var user = TokenSvc.decode();
            var businessNameEncoded = user.PropertyManager[0].businessName.replace(/\s/g, '') || 'byowner';
            // if(user.userType === 2){
            //     $resource(WizioConfig.baseAPIURL + '/apartment/pm/:id', {id: '@id'}).query({id: user.PropertyManager[0].id}, function(result){
            //         $scope.units = result;
            //     });
            // }
            //get apartments associated with user
            var userId = TokenSvc.decode().id;
            var applicationIds = [];
            $resource(WizioConfig.baseAPIURL + 'apartment/pm/:id', {
                id: '@id'
            }).query({
                id: user.PropertyManager[0].id || user.Brokerage[0].id
            }, function(result) {
                console.dir(result);
                $scope.units = result;
            });
            $scope.shareListing = function(index) {
                    var modalOptionsShareListing = {
                        closeButtonText: "Close",
                        actionButtonText: "OK",
                        headerText: "Share This Listing",
                        bodyText: 'Copy and paste this URL: beta.wizio.co/listing/' + businessNameEncoded + '/' + $scope.units[index].Leases[0].id
                    };
                    ModalSvc.showModal({}, modalOptionsShareListing).then(function(response) {
                        console.dir(response);
                    });
                };
                // AssignmentModel.api().twoParam.query({
                //     param1: 'user',
                //     param2: userId
                // }, function(response) {
                //     $scope.assignments = response;
                //
                //     for (var i = 0; i < $scope.assignments.length; i++) {
                //         if ($scope.assignments[i].Apartment.Applications.length !== 0) {
                //             applicationIds = lodash.pluck($scope.assignments[i].Apartment.Applications, 'ApplicationId');
                //         }
                //         //group the individual application objects by the ApplicationId
                //         var groupedApplications = lodash.groupBy($scope.assignments[i].Apartment.Applications, 'ApplicationId');
                //         // reassign the Applications key on the returned object
                //         $scope.assignments[i].Apartment.Applications = groupedApplications;
                //         //get the number of applications
                //         $scope.assignments[i].Apartment.Applications.numberOf = Object.keys(groupedApplications).length;
                //     }
                //     $scope.noTenants = true;
                // });

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
            //open email now modal. Shoud allow property managers to select who to email
            //and provide pre-made emails to send.
            $scope.emailNow = function(apartmentIndex) {

                ModalSvc.showModal(addTenantsModalDefaults, {}).then(function(result) {

                });

            };

            $scope.createListing = function(apartmentIndex) {
                var ApartmentId = $scope.units[apartmentIndex].id;
                FlexGetSetSvc.set(ApartmentId, 'NewLeaseApartmentId', 'NewLeaseApartmentId');
                $state.go('Account.Lease.Create');
            };

            $scope.editListing = function(apartmentIndex) {
                FlexGetSetSvc.set($scope.units[apartmentIndex], 'EditCurrentListing', 'EditCurrentListing');
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
                            WizioConfig.ApplicationFormViewsURL + 'ApplicationOverviewModal.html',
                            'ApplicationOverviewCtrl',
                            response
                        );
                        ModalSvc.showModal(viewApplicantsModalDefaults, {}).then(function(result) {
                            switch (result) {
                                case "VIEW-DETAILS":
                                    $state.go('Account.Dashboard.Application');
                                    break;
                                default:

                            }
                        });
                    });
            };
            //navigate to applicants page. indexNum comes from HTML form
            //form should contain applications for apartments.
            $scope.viewLeads = function(apartmentIndex) {
                console.dir($scope.units);
                // function(response) {
                //     var viewApplicantsModalDefaults = modalDefaults(
                //         'lg',
                //         WizioConfig.ApplicationFormViewsURL + 'ApplicationOverviewModal.html',
                //         'ApplicationOverviewCtrl',
                //         response
                //     );
                //     ModalSvc.showModal(viewApplicantsModalDefaults, {}).then(function(result) {
                //         switch (result) {
                //             case "VIEW-DETAILS":
                //                 $state.go('Account.Dashboard.Application');
                //                 break;
                //             default:
                //
                //         }
                //     });
                // });
        };
    }]);
