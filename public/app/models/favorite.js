angular.module('Models')
.factory('FavoriteModel', [
    '$sessionStorage',
    '$resource',
    'lodash',
    'WizioConfig',
    function($sessionStorage, $resource, lodash, WizioConfig){
        function Description(UserId, ApartmentId, DescriptionText){
            this.UserId = UserId;
            this.ApartmentId = ApartmentId;
        }

        Description.api = function(){
            return $resource(WizioConfig.baseAPIURL + "favorite");
        };

        Description.build = function(data){
            return new Description(
                data.UserId,
                data.ApartmentId
            );
        };

        return Description;
    }
]);
