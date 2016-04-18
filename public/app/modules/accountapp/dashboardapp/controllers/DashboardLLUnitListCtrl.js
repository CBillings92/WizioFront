//Dashboard controller for the landllord app
angular.module('AccountApp')
    .controller('DashboardLLUnitListCtrl', [
        '$scope',
        '$state',
        '$resource',
        '$q',
        'TokenSvc',
        'ModalSvc',
        'lodash',
        'AssignmentModel',
        'WizioConfig',
        'ApplicationModel',
        'FlexGetSetSvc',
        'BrokerageModel',
        function($scope, $state, $resource, $q, TokenSvc, ModalSvc, lodash, AssignmentModel, WizioConfig, ApplicationModel, FlexGetSetSvc, BrokerageModel) {
            //reusable function for creating modalDefaults for ModalSvc
            new Clipboard('.clipboard');
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
            $scope.currentTab = 'UnitList';
            $scope.changeTab = function changeTab(tab) {
                $scope.currentTab = tab;
                return;
            };
            function getApartmentsForExternalApi(){
                $resource(WizioConfig.baseAPIURL + 'vrapi')
            }
            $scope.apiApartments = [1, 2];
            var user = TokenSvc.decode();
            // $scope.user.userType = TokenSvc.decode();
            $scope.user = user;
            function viewAPIPanel(){

            }
            function viewSharedApartments(){
                var views = WizioConfig.UnitViewsURL + 'sharedapartments.modal.view.html';
                var controller = "SharedApartmentsCtrl";
                var apartmentsSharedModalDefaults = modalDefaults('lg', views, controller);
                BrokerageModel.getSharedApartments(user.Brokerages[0].id)
                    .then(function(){

                    });
            }
            var businessNameEncoded = null;
            if(user.userType === 2){
                businessNameEncoded = user.PropertyManager[0].businessName.replace(/\s/g, '') || 'byowner';
            } else {
                businessNameEncoded = user.Brokerages[0].businessName.replace(/\s/g, '');
            }
            // if(user.userType === 2){
            //     $resource(WizioConfig.baseAPIURL + '/apartment/pm/:id', {id: '@id'}).query({id: user.PropertyManager[0].id}, function(result){
            //         $scope.units = result;
            //     });
            // }
            //get apartments associated with user
            var userId = TokenSvc.decode().id;
            var applicationIds = [];
            var data = {};
            if(user.userType === 3){
                data.id = user.Brokerages[0].id;
            } else {
                data.id = user.PropertyManager[0].id;
            }
            $resource(WizioConfig.baseAPIURL + 'apartment/pm/:id', {
                id: '@id'
            }).query(data, function(result) {
                $scope.units = result;
            });
            $scope.shareListing = function(index) {
                var modalOptionsShareListing = {
                    closeButtonText: "Close",
                    actionButtonText: "OK",
                    headerText: "Share This Listing",
                    bodyText: 'Copy and paste this URL: ' + window.location.origin + '/#/listing/' + businessNameEncoded + '/' + $scope.units[index].Leases[0].id
                };
                ModalSvc.showModal({}, modalOptionsShareListing).then(function(response) {
                });
            };
            function shareAllListings() {
                var view = WizioConfig.UnitViewsURL + 'sharelistings.modal.view.html';
                var controller = 'ShareListingsCtrl';
                BrokerageModel.getAllBrokerages()
                    .then(function(response){
                        var modalData = response;
                        response.PropertyManagerId = user.PropertyManager[0].id;
                        var shareListingsModalDefaults = modalDefaults('lg', view, controller, modalData);
                        ModalSvc.showModal(shareListingsModalDefaults, {})
                        .then(function(modalResult){

                        });
                    });
            }
            $scope.shareAllListings = shareAllListings;


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
            $scope.editApartment = function(apartmentIndex) {
                FlexGetSetSvc.set($scope.units[apartmentIndex], 'ApartmentToEdit', 'ApartmentToEdit');
                $state.go('Unit.Edit');
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

            function editApartment(apartmentIndex) {
                FlexGetSetSvc.set($scope.units[apartmentIndex], 'UnitToEdit', 'UnitToEdit');
                $state.go('Unit.Edit');
            }
            $scope.functions = {
                editApartment: editApartment,
                viewSharedApartments: viewSharedApartments
            };
            //navigate to applicants page. indexNum comes from HTML form
            //form should contain applications for apartments.

            $scope.viewLeads = function(apartmentIndex) {
                var passingData = [$scope.units[apartmentIndex].Leases[0].Leads,
                    $scope.units[apartmentIndex].concatAddr,
                    $scope.units[apartmentIndex].unitNum
                ];

                var viewLeadsModal = modalDefaults('lg', WizioConfig.ApplicationFormViewsURL + 'leadslist.html', 'LeadsListCtrl', passingData);

                ModalSvc.showModal(viewLeadsModal, {})
                    .then(function(result) {});
            };
        }
    ]);
