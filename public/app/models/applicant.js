angular.module('Models')
.factory('ApplicantModel', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        function Applicant(UserId, ApplicationId, owner, status){
            if(!(this instanceof Applicant)){
                return new Applicant(UserId, ApplicationId, owner);
            }
            this.UserId = UserId;
            this.ApplicationId = ApplicationId;
            this.owner = owner;
            this.status = status;
        }
        Applicant.prototype.setStatus = function(newStatus){
            var status = this.status;
            switch (newStatus) {
                case 1:
                    status = "Confirmed";
                    break;
                case 2:
                    status = "Rejected";
                    break;
                case 3:
                    status = "Pending";
                default:

            }
        }
        return Applicant;
    }
]);
