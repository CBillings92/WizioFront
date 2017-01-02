angular.module('Models')
.factory('SearchModel', [
    '$resource',
    'WizioConfig',
    function($resource, WizioConfig){
        function Search(UnitInstance, topLevelType, filters, user){
            this.unitInstance = UnitInstance;
            this.topLevelType = topLevelType || null;
            this.filters = filters || null;
            this.User = user || null;
        }
        Search.prototype.send = function(callback){

            var data = this;
            return $resource(WizioConfig.baseAPIURL + "search/new",
            {},
            {
                save: {
                    method: 'POST',
                    isArray: true
                }
            }
        ).save(this, function(data){
                return callback(data);
            });
        };

        Search.build = function(data){
            return new Search(
                data.UnitInstance,
                data.filters,
                data.User
            );
        };

        return Search;
    }
]);
