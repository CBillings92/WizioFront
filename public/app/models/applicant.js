angular.module('Models')
    .factory('ApplicantModel', [
        '$resource',
        'WizioConfig',
        function($resource, WizioConfig) {
            function Applicant(UserId, ApplicationId, owner, applicationStatus, applicantStatus) {
                if (!(this instanceof Applicant)) {
                    return new Applicant(UserId, ApplicationId, owner, applicationStatus, applicantStatus);
                }
                this.UserId = UserId;
                this.ApplicationId = ApplicationId;
                this.owner = owner;
                this.applicationStatus = applicationStatus;
                this.applicantStatus = applicantStatus;
            }
            Applicant.prototype.setStatus = function(newStatus) {
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
                        break;
                    default:

                }
            };
            Applicant.prototype.setStatus = function(newStatus) {
                switch (newStatus) {
                    case 1:
                        this.status = "Approved";
                        break;
                    case 2:
                        this.status = "Rejected";
                        break;
                    case 1:
                        this.status = "Pending";
                        break;
                    default:
                        //TODO add value here
                }
            };
            Applicant.prototype.setOwner = function(callback) {
                var app = this;
                return $resource(WizioConfig.baseAPIURL + 'application/applicant/setowner').save(app, function(response) {
                    return callback(response);
                });
            };
            Applicant.prototype.delete = function(callback) {
                var app = this;
                return $resource(WizioConfig.baseAPIURL + '/application/applicant').remove(app, function(response) {
                    return callback(response);
                });
            };

            Applicant.build = function buildApplicant(data) {
                    console.dir(data);
                    return new Applicant(
                        data.UserId,
                        data.ApplicationId,
                        data.ApplicationOwner,
                        data.applicationStatus,
                        data.applicantStatus
                    );
                };
                // Applicant.prototype.API = function API(callback){
                //     var app = this;
                //     return {
                //         update: $resource('WizioConfig.baseAPIURL' + '/application/applicant/:ApplicationId/:UserId',
                //         {ApplicationId: app.ApplicationId, UserId: app.UserId})
                //         .save(app, function(response){
                //             return callback(response);
                //         }),
                //         save: $resource('WizioConfig.baseAPIURL' + '/application/applicant').save(app, function(response){
                //             return callback(response);
                //         }),
                //         delete: $resource('WizioConfig.baseAPIURL' + '/application/applicant').remove(app, function(response){
                //             return callback(response);
                //         }),
                //         setOwner: $resource('WizioConfig.baseAPIURL' + '/application/applicant/setowner').save(app, function(response){
                //             return callback(response);
                //         })
                //     };
                // };
                // Applicant.prototype.FLEXAPI = function FLEXAPI(action, urlParams, callback){
                //     var app = this;
                //     return {
                //         base: $resource('WizioConfig.baseAPIURL' + 'applicant')[action](app, function(response){
                //             return callback(response);
                //         }),
                //         oneParam: $resource('WizioConfig.baseAPIURL' + 'applicant/:firstParam', urlParams)[action](app, function(response){
                //             return callback(response);
                //         }),
                //         twoParam: $resource('WizioConfig.baseAPIURL' + 'applicant/:firstParam/:secondParam', urlParams)[action](app, function(response){
                //             return callback(response);
                //         }),
                //     }
                // };
            return Applicant;
        }
    ]);
