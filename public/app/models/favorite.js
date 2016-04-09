angular.module('Models')
.factory('FavoriteModel', [
    '$sessionStorage',
    '$resource',
    'lodash',
    'WizioConfig',
    function($sessionStorage, $resource, lodash, WizioConfig){
        function Favorite(UserId, ApartmentId){
            this.UserId = UserId;
            this.ApartmentId = ApartmentId;
        }

        Favorite.api = function(){
            return $resource(WizioConfig.baseAPIURL + "favorite");
        };
        Favorite.findByUser = function(){
            return $resource(WizioConfig.baseAPIURL + "favorite/findbyuser", {},
            {
                save:
                {
                    method: 'POST',
                    isArray: true
                }
            });
        };

        Favorite.build = function(data){
            return new Favorite(
                data.UserId,
                data.ApartmentId
            );
        };

        return Favorite;
    }
]);
