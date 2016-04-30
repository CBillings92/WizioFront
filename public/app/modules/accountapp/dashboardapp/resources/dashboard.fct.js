angular.module('AccountApp')
    .factory('DashboardFactory', [
        '$state',
        'TokenSvc',
        function DashboardFactory($state, TokenSvc){
            function routeToAccount(){
                var userType = TokenSvc.decode().userType;
                var params = {};
                var options = {};
                options = $state.current.name === "Account.Dashboard" ? {location: false} : {};
                switch (userType) {
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
            return {
                routeToAccount: routeToAccount
            };
        }
    ]);
