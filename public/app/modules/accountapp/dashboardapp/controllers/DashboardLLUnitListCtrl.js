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
            //get the user for things
            var user = TokenSvc.decode();
            //for copy to clipboard button - from the clipboard.js library
            new Clipboard('.clipboard');
            //calculate the typeof user so you don't need to keep rewriting this
            var typeOfUser = typeof(user.Brokerages) == 'undefined' ? 'PropertyManager' : 'Brokerage';
            $scope.currentTab = 'UnitList';
            //changing the tab on the dashboard LL unit list
            $scope.changeTab = function changeTab(tab) {
                //if the user ISN'T A BROKERAGE
                if(typeOfUser === "PropertyManager") {
                    //if the API access key is not active
                    if(user.PropertyManager[0].Apiaccess.active === 0){
                        //FIXME - trent - actionable - modal is needed
                        alert('No API Access If you feel this is in error, or you would like to request API access please contact Devon@wizio.co.');
                        return;
                    }
                } else if(user.Brokerages[0].Apiaccess.active === 0){
                    //FIXME - trent - actionable - modal is needed
                        alert('No API Access. If you feel this is in error, or you would like to request API access please contact Devon@wizio.co.');
                        return;
                } else {
                    DashboardFactory.getApartmentsForApiShare()
                        .then(function(result){
                            $scope.apartmentsForApi = result;
                            $scope.currentTab = tab;
                            return;
                        })
                        .catch(function(err){

                        });
                /*    getApartmentsForExternalApi()
                    .then(function(response){
                        $scope.apartmentsForApi = response;
                    });

                    */
                }
                return;
            };
            //FIXME - trent - actionable - can we move this into a factory
            /*
                Send a request to the Wizio API to get the apartments for the vrapi
                These are the apartment ID's/URL's for the Iframes that the user would copy to clipboard and paste on their own site

                FIXME - trent - brainstorm - this should be as simple as calling something like
                    MyFactory.getApartmentsForExternalApi(typeOfUser)
                        .then(function(results){
                        ...
                    })
            */
            function getApartmentsForExternalApi(){
                $scope.apikey = null;
                //grab the api key
                //this is a ridiculous way to handle the API key... can we simplify this?
                if(typeOfUser === "Brokerage"){
                    $scope.apikey = user.Brokerages[0].Apiaccess.apikey;
                } else {
                    $scope.apikey = user.PropertyManager[0].Apiaccess.apikey;
                }
                //FIXME - trent - actionable - should be housed not in a controller
                return new $q(function(resolve, reject) {
                    $resource(WizioConfig.baseAPIURL + 'vrapi/:apikey', {apikey: '@apikey'})
                    .query({apikey:$scope.apikey}, function (response) {
                        return resolve(lodash.uniqBy(response, 'ApartmentId'));
                    });
                });
            }
            $scope.apiApartments = [1, 2];
            // $scope.user.userType = TokenSvc.decode();
            $scope.user = user;
            function viewAPIPanel(){

            }
            function viewSharedApartments(){
                var views = WizioConfig.UnitViewsURL + 'sharedapartments.modal.view.html';
                var controller = "SharedApartmentsCtrl";
                var apartmentsSharedModalDefaults = ModalBuilderFct.build('lg', views, controller);
                BrokerageModel.getSharedApartments(user.Brokerages[0].id)
                    .then(function(){

                    });
            }
            var businessNameEncoded;
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
                        var shareListingsModalDefaults = ModalBuilderFct.build('lg', view, controller, modalData);
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
                var addTenantsModalDefaults = ModalBuilderFct.build(
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
                        var viewApplicantsModalDefaults = ModalBuilderFct.build(
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

                var viewLeadsModal = ModalBuilderFct.build('lg', WizioConfig.ApplicationFormViewsURL + 'leadslist.html', 'LeadsListCtrl', passingData);

                ModalSvc.showModal(viewLeadsModal, {})
                    .then(function(result) {});
            };
        }
    ]);
