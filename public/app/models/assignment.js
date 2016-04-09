angular.module('Models')
    .factory('AssignmentModel', [
        '$resource',
        'WizioConfig',
        function($resource, WizioConfig) {
            function Assignment(UserId, ApartmentId) {
                this.UserId = UserId;
                this.ApartmentId = ApartmentId;
            }

            Assignment.api = function(){
                return {
                    base: $resource(WizioConfig.baseAPIURL + '/assignment'),
                    oneParam: $resource(WizioConfig.baseAPIURL + '/assignment/:param1', {param1: "@param1"}),
                    twoParam: $resource(WizioConfig.baseAPIURL + '/assignment/:param1/:param2', {param1: "@param1", param2: "@param2"}, {}, {
                        get: {
                            method: 'GET',
                            isArray: true
                        }
                    })
                };
            };

            Assignment.build = function(data){
                return new Apartment(
                    data.UserId,
                    data.ApartmentId
                );
            };

            return Assignment;
        }
    ]);
