angular.module('Models')
.factory('DescriptionModel', [
    '$sessionStorage',
    '$resource',
    'lodash',
    'TokenSvc',
    'WizioConfig',
    function($sessionStorage, $resource, lodash, TokenSvc, WizioConfig){
        function Description(UserId, ApartmentId, DescriptionText){
            this.UserId = UserId || null;
            this.ApartmentId = ApartmentId || null;
            this.description = DescriptionText;
            this.upvotes = 0;
            this.downvotes = 0;
        }

        Description.prototype.api = function(){
            return $resource(WizioConfig.baseAPIURL + "description");
        };
        Description.prototype.getAssociatonData = function(ApartmentId){
            this.UserId = TokenSvc.decode().id;
            if(ApartmentId){
                this.ApartmentId = ApartmentId;
            }
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
