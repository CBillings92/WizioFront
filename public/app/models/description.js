angular.module('Models')
.factory('DescriptionModel', [
    '$sessionStorage',
    '$resource',
    'lodash',
    'WizioConfig',
    function($sessionStorage, $resource, lodash, WizioConfig){
        function Description(UserId, ApartmentId, DescriptionText){
            this.UserId = UserId;
            this.ApartmentId = ApartmentId;
            this.description = DescriptionText;
            this.upvotes = 0;
            this.downvotes = 0;
        }

        Description.prototype.api = function(){
            return $resource(WizioConfig.baseAPIURL + "description");
        };

        Description.build = function(data){
            return new Description(
                data.UserId,
                data.ApartmentId,
                data.DescriptionText
            );
        };

        return Description;
    }
]);
