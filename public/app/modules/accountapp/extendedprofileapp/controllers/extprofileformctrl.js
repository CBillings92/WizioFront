angular.module('AccountApp')
    .controller('ExtProfileFormCtrl', [
        '$scope',
        '$state',
        'ProfileModel',
        'FlexGetSetSvc',
        'TokenSvc',
        function($scope, $state, ProfileModel, FlexGetSetSvc, TokenSvc) {
            $scope.profile = {};
            var loadedProfile = FlexGetSetSvc.get(null, "ExtendedProfile");
            console.dir(loadedProfile);
            console.dir(typeof(loadedProfile));
            if(typeof(loadedProfile) != 'undefined' && loadedProfile){
                console.dir("HI");
                $scope.editing = true;
                $scope.profile = loadedProfile;
            }
            $scope.selectOptions = {
                employmentStatus: ["Full Time Employed", "Part Time Employed", "Not Employed"],
                studentStatus: ["Full Time Student", "Part Time Student", "Not A Student"],
                yesno: ["Yes", "No"],
                studentTypes: ["Undergraduate", "Graduate"],
                maritalStatus: ["Married", "Not Married"]
            };
            $scope.yesNoContainer = {};
            $scope.submitProfile = function(){
                var UserId = TokenSvc.decode().id;
                $scope.profile.UserId = UserId;
                if($state.current.name === 'Account.Profile.Edit'){
                    console.dir($scope.profile);
                    ProfileModel.api.oneParam.save({id: $scope.profile.id}, $scope.profile, function(response){

                    });
                } else if($state.current.name === 'Account.Profile.Create'){
                    var profile = ProfileModel.build($scope.profile);
                    ProfileModel.api.oneParam.save(null, profile, function(response){
                        alert("DONE");
                    });
                }

            };

            /*var profile = {
                UserID: user.id,
                annualIncome: $scope.annualIncome,
                currentEmployer1: $scope.currentEmployer1,
                currentEmployerLOE1: $scope.currentEmployerLOE1,
                currentEmployerPosition1: $scope.currentEmployerPosition1,
                currentEmployer2: $scope.currentEmployer2,
                currentEmployerLOE2: $scope.currentEmployerLOE2,
                currentEmployerPosition2: $scope.currentEmployerPosition2,
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
            };*/
        }
    ]);
