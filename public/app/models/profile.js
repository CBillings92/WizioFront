angular.module('Models')
.factory('ProfileModel', [
    '$sessionStorage',
    '$resource',
    'lodash',
    'WizioConfig',
    function($sessionStorage, $resource, lodash, WizioConfig){
        function Profile(
            UserId,
            currentEmployer1,
            currentEmployerLOE1,
            currentEmployerPosition1,
            currentEmployer2,
            currentEmployerLOE2,
            currentEmployerPosition2,
            creditScore,
            pets,
            dateOfBirth,
            maritalStatus,
            emergencyContactName,
            emergencyContactPhone,
            emergencyContactRelationship,
            phoneNumber,
            currentAddress,
            currentPMName,
            currentPMContact,
            employmentStatus,
            studentStatus,
            studentSchool,
            studentType,
            studentMajor
        ){
            this.UserId = UserId;
            this.currentEmployer1 = currentEmployer1;
            this.currentEmployerLOE1 = currentEmployerLOE1;
            this.currentEmployerPosition1 = currentEmployerPosition1;
            this.currentEmployer2 = currentEmployer2;
            this.currentEmployerLOE2 = currentEmployerLOE2;
            this.currentEmployerPosition2 = currentEmployerPosition2;
            this.creditScore = creditScore;
            this.pets = pets;
            this.dateOfBirth = dateOfBirth;
            this.maritalStatus = maritalStatus;
            this.emergencyContactName = emergencyContactName;
            this.emergencyContactPhone = emergencyContactPhone;
            this.emergencyContactRelationship = emergencyContactRelationship;
            this.phoneNumber = phoneNumber;
            this.currentAddress = currentAddress;
            this.currentPMName = currentPMName;
            this.currentPMContact = currentPMContact;
            this.employmentStatus = employmentStatus;
            this.studentStatus = studentStatus;
            this.studentSchool = studentSchool;
            this.studentType = studentType;
            this.studentMajor = studentMajor;
        }

        Profile.prototype.api = function(){
            return $resource(WizioConfig.baseAPIURL + 'profile/:id', {id: '@id'});
        };
        Profile.api = function(){
            return $resource(WizioConfig.baseAPIURL + 'profile/:id', {id: '@id'});
        };

        Profile.build = function(data){
            return new Profile(
                data.UserId,
                data.currentEmployer1,
                data.currentEmployerLOE1,
                data.currentEmployerPosition1,
                data.currentEmployer2,
                data.currentEmployerLOE2,
                data.currentEmployerPosition2,
                data.creditScore,
                data.pets,
                data.dateOfBirth,
                data.maritalStatus,
                data.emergencyContactName,
                data.emergencyContactPhone,
                data.emergencyContactRelationship,
                data.phoneNumber,
                data.currentAddress,
                data.currentPMName,
                data.currentPMContact,
                data.employmentStatus,
                data.studentStatus,
                data.studentSchool,
                data.studentType,
                data.studentMajor
            );
        };


        return Profile;
    }
]);
