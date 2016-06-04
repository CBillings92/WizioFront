angular.module('AccountApp')
    .factory('DashboardFactory', [
        '$state',
        'TokenSvc',
        'DashboardResources',
        'lodash',
        function DashboardFactory($state, TokenSvc, DashboardResources, lodash){
            var user = TokenSvc.decode();
            function routeToAccount(){
                var userType = user.userType;
                var params = {};
                var options = {};
                options = $state.current.name === "Account.Dashboard" ? {location: false} : {};
                switch (userType) {
                    case 0:
                        $state.go('Account.Dashboard.PropertyManager', params, options);
                        break;
                    case 1:
                        $state.go('Account.Dashboard.Tenant', params, options);
                        break;
                    case 2:
                        $state.go('Account.Dashboard.PropertyManager', params, options);
                        break;
                    case 3:
                        $state.go('Account.Dashboard.Broker', params, options);
                        break;
                    default:
                        return null;
                }
            }
            function getApartmentsForApiShare(){
                //get the API key of the user for the request
                var apikey = getAPIKey();
                return new $q(function(resolve, reject) {
                    //build the parameters for the request
                    var param1 = "vrapi/";
                    var param2 = ":apikey";
                    //make the request go to /api/vrapi/:apikey
                    DashboardResources.vrapi(param1, param2)
                        //feed the :apikey in the query the users api key
                        .query({apikey: apikey})
                        //turn this into a promise object to call then and catch
                        .$promise()
                        .then(function(result){
                            resolve(lodash.uniqBy(result, "ApartmentId"));
                        })
                        .catch(function(result){

                        });
                    /*$resource(WizioConfig.baseAPIURL + 'vrapi/:apikey', {apikey: '@apikey'})
                    .query({apikey:$scope.apikey}, function (response) {
                        return resolve(lodash.uniqBy(response, 'ApartmentId'));
                    });
                    */
                });
            }
            function getAPIKey() {
                if(typeOfUser === "Brokerage"){
                    return user.Brokerages[0].Apiaccess.apikey;
                } else {
                    return user.PropertyManager[0].Apiaccess.apikey;
                }
            }
            return {
                routeToAccount: routeToAccount,
                getApartmentsForApiShare: getApartmentsForApiShare,
                getAPIKey: getAPIKey
            };
        }
    ]);
