angular.module('SellerApp')
    .controller('ProfileFormCtrl', [
        '$scope',
        '$modal',
        '$state',
        'ApartmentGetSetSvc',
        'AuthFct',
        'ProfileResource',
        'ApplicationResource',
        function($scope, $modal, $state, ApartmentGetSetSvc, AuthFct, ProfileResource, ApplicationResource) {
            //get apartment information
            $scope.apartment = ApartmentGetSetSvc.get('apartmentApplyingTo');
            var apartment = $scope.apartment;
            //get user information
            var user = AuthFct.getTokenClaims();
            console.dir(user);
            //for ng-repeat on profile form for emails. Check # of bedrooms
            $scope.apply = function() {
                var currentState = $state.current.name;
                var profile = {
                    UserID: user.id,
                    annualIncome: $scope.annualIncome,
                    currentEmployer1: $scope.currentEmployer1,
                    currentEmployerLOE1: $scope.currentEmployerLOE1,
                    currentEmployerPosition1: $scope.currentEmployerPosition1,
                    currentEmployer2: $scope.currentEmployer2,
                    currentEmployerLOE2: $scope.currentEmployerLOE2,
                    currentEmployerPosition: $scope.currentEmployerPosition,
                    previousEmployer1: $scope.previousEmployer1,
                    previousEmployerLOE1: $scope.previousEmployerLOE1,
                    previousEmployerPosition1: $scope.previousEmployerPosition1,
                    previousEmployer2: $scope.previousEmployer2,
                    previousEmployerLOE2: $scope.previousEmployerLOE2,
                    previousEmployerPosition2: $scope.previousEmployerPosition2,
                    creditScore: $scope.creditScore,
                    pets: $scope.pets,
                    petType: $scope.petType,
                    age: $scope.age,
                    maritalStatus: $scope.maritalStatus,
                    emergencyContact: $scope.emergencyContact,
                    phoneNumber: $scope.phoneNumber,
                    socialSecurityNumber: $scope.socialSecurityNumber,
                    currentBank: $scope.currentBank,
                    currentTenancyAddress: $scope.currentTenancyAddress,
                    currentPM: $scope.currentPM,
                    currentPMContact: $scope.currentPMContact,
                    previousTenancyAddress: $scope.previousTenancyAddress,
                    previousPM: $scope.previousPM,
                    previousPMContact: $scope.previousPMContact,
                    employmentStatus: $scope.employmentStatus,
                    desiredMoveInDate: $scope.desiredMoveInDate
                };
                console.dir(currentState);
                //collect emails from form.
                if (currentState === "Profile.Edit") {
                    alert('hurr');
                } else if (currentState === "Profile.Create") {
                    
                    $scope.appicationEmails = [];
                    var modalInstance = $modal.open({
                        templateUrl: 'public/app/modules/buyerapp/profileapp/viewtemplates/profilesavemodal.html',
                        controller: 'ProfileSaveModalCtrl',
                        size: 'md',
                        resolve: {
                            apartment: function() {
                                return apartment;
                            }
                        }
                    });
                    modalInstance.result.then(function(result) {
                        //Could probably utilize async on front end here...
                        console.dir(profile);
                        profile.annualIncome = "123";
                        if (result === "saveAndApply") {

                            ProfileResource.save(profile, function(status, data) {
                                $state.go('Application.New');
                            });
                        } else if (result === "save") {
                            ProfileResource.save(profile, function(status, data) {

                            });
                        }
                    }, function() {
                        console.dir("IN MODAL DISMISSED");
                    });
                }

                /*ApplicationResource.save(function(status, data){

                });*/
            };
        }
    ]);
