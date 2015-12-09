angular.module('SharedServiceApp')
.service('ApartmentClaimGetSetSvc', [
    '$sessionStorage',
    function($sessionStorage){
        var dataStore = [];
        var set = function(data, sessionStorageVar){
            if(sessionStorageVar){
                console.dir(sessionStorageVar);
                console.dir($sessionStorage.sessionStorageVar);
                if($sessionStorage[sessionStorageVar]){
                    console.dir("IN HERE");
                    $sessionStorage[sessionStorageVar].push = data;
                    dataStore.push(data);
                } else {
                    $sessionStorage[sessionStorageVar] = [];
                    $sessionStorage[sessionStorageVar] = data;
                    dataStore.push(data);
                }
                return;
            }
            dataStore.push(data);
            return;
        };
        var get = function(sessionStorageVar){
            if(sessionStorageVar){
                return $sessionStorage[sessionStorageVar];
            }
            if(dataStore.length === 0){
                return [];
            }
            return dataStore[0];
        };
        var reset = function(sessionStorageVar){
            if(sessionStorageVar){
                delete $sessionStorage[sessionStorageVar];
                dataStore = [];
                return;
            }
            dataStore = [];
            return;
        };

        return {
            set: set,
            get: get,
            reset: reset
        };

    }
]);
