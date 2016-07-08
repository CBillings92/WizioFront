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
        'ModalBuilderFct',
        'DashboardFactory',
        function($scope, $state, $resource, $q, TokenSvc, ModalSvc, lodash, AssignmentModel, WizioConfig, ApplicationModel, FlexGetSetSvc, BrokerageModel, ModalBuilderFct, DashboardFactory) {
            //get loggedin user
            var user = TokenSvc.decode();
            $scope.user = user;
            var typeOfUser = typeof(user.Brokerages) == 'undefined' ? 'PropertyManager' : 'Brokerage';
            $scope.currentTab = 'UnitList';

            var businessNameEncoded;
            $scope.windowLocationOrigin = window.location.origin;
            //for copy to clipboard button - from the clipboard.js library
            new Clipboard('.clipboard');

            setUnitListTab();
            setShareApiTab();
            $scope.funcs = {
                editApartment: editApartment,
                viewSharedApartments: viewSharedApartments,
                changeTab: changeTab,
                shareListing: shareListing,
                shareAllListings: shareAllListings
            };

            //calculate the typeof user so you don't need to keep rewriting this
            function setUnitListTab() {
                var applicationIds = [];
                var data = {};
                if (user.userType === 3) {
                    data.id = user.Brokerages[0].id;
                } else {
                    data.id = user.PropertyManager[0].id;
                }
                $resource(WizioConfig.baseAPIURL + 'apartment/pm/:id', {
                    id: '@id'
                }).query(data, function(result) {
                    $scope.units = result;
                });
            }

            function setShareApiTab() {
                if (user.userType === 2) {
                    businessNameEncoded = user.PropertyManager[0].businessName.replace(/\s/g, '') || 'byowner';
                    $scope.businessNameEncoded = user.PropertyManager[0].businessName.replace(/\s/g, '') || 'byowner';
                    $scope.apikey = user.PropertyManager[0].Apiaccess.apikey;
                } else {
                    businessNameEncoded = user.Brokerages[0].businessName.replace(/\s/g, '');
                    $scope.businessNameEncoded = user.Brokerages[0].businessName.replace(/\s/g, '');
                    $scope.apikey = user.Brokerages[0].Apiaccess.apikey;
                }
            }
            //changing the tab on the dashboard LL unit list
            function changeTab(tab) {
                //if apikey is active, get apartments for API, else display error modal
                var apiaccess;
                if (typeOfUser === "PropertyManager") {
                    apiaccess = user.PropertyManager[0].Apiaccess;
                    if (apiaccess === null || apiaccess === 0) {
                        displayAPIModal();
                    } else {
                        setShareApiTab();
                        getApartmentsForApiShare();
                        $scope.currentTab = tab;
                    }
                } else {
                    apiaccess = user.Brokerage[0].Apiaccess;
                    if (typeOfUser === "Brokerage") {
                        if (apiaccess === null || apiaccess === 0) {
                            displayAPIModal();
                        } else {
                            setShareApiTab();
                            getApartmentsForApiShare();
                            $scope.currentTab = tab;
                        }
                    }
                }
            }

            function getApartmentsForApiShare() {
                DashboardFactory.getApartmentsForApiShare()
                    .then(function(result) {
                        $scope.apartmentsForApi = result;
                        return;
                    })
                    .catch(function(err) {

                    });
            }
            //helper function - just displays no API access error to user in modal
            function displayAPIModal() {
                ModalBuilderFct.buildSimpleModal(
                        'Cancel',
                        'OK',
                        'No API Access Key Found',
                        "It appears you don't have access to our beta API. If you feel that this is in error, or would like access to the API, please contact Devon@wizio.co"
                    )
                    .then(function(result) {
                        return result;
                    });
            }

            function viewSharedApartments() {
                var views = WizioConfig.UnitViewsURL + 'sharedapartments.modal.view.html';
                var controller = "SharedApartmentsCtrl";
                var apartmentsSharedModalDefaults = ModalBuilderFct.buildComplexModal('lg', views, controller);
                BrokerageModel.getSharedApartments(user.Brokerages[0].id)
                    .then(function() {

                    });
            }

            function shareListing(index) {
                var modalOptionsShareListing = {
                    closeButtonText: "Close",
                    actionButtonText: "OK",
                    headerText: "Share This Listing",
                    bodyText: 'Copy and paste this URL: ' + window.location.origin + '/#/listing/' + businessNameEncoded + '/' + $scope.units[index].Leases[0].id
                };
                ModalSvc.showModal({}, modalOptionsShareListing).then(function(response) {});
            }

            function shareAllListings() {
                var view = WizioConfig.UnitViewsURL + 'sharelistings.modal.view.html';
                var controller = 'ShareListingsCtrl';
                BrokerageModel.getAllBrokerages()
                    .then(function(response) {
                        var modalData = response;
                        response.PropertyManagerId = user.PropertyManager[0].id;
                        var shareListingsModalDefaults = ModalBuilderFct.buildComplexModal('lg', view, controller, modalData);
                        ModalSvc.showModal(shareListingsModalDefaults, {})
                            .then(function(modalResult) {

                            });
                    });
            }

            $scope.add_tenants = function(val) {
                var addTenantsModalDefaults = ModalBuilderFct.buildComplexModal(
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
                        var viewApplicantsModalDefaults = ModalBuilderFct.buildComplexModal(
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
            //navigate to applicants page. indexNum comes from HTML form
            //form should contain applications for apartments.



            $scope.viewLeads = function(apartmentIndex) {
                var passingData = [$scope.units[apartmentIndex].Leases[0].Leads,
                    $scope.units[apartmentIndex].concatAddr,
                    $scope.units[apartmentIndex].unitNum
                ];

                var viewLeadsModal = ModalBuilderFct.buildComplexModal('lg', WizioConfig.ApplicationFormViewsURL + 'leadslist.html', 'LeadsListCtrl', passingData);

                ModalSvc.showModal(viewLeadsModal, {})
                    .then(function(result) {});
            };
        }
    ]);
