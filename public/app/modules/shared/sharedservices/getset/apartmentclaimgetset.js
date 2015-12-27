angular.module('SharedServiceApp')
    //service used for the Apartment Claim process for landlords
    //Standard getter and setter methods found elsewhere. However stores
    //multiple objects received from the google API in a sessionStorage variable
    //instead of just one at a time
    .service('ApartmentClaimGetSetSvc', [
        '$sessionStorage',
        function($sessionStorage) {
            //store
            var dataStore = [];
            /*
                data is the results of a google Geocding api Search
                sessionStorageVar = STRING --- name of the variable to be set in session storage
            */
            var set = function(data, sessionStorageVar) {
                /*
                    if a session storage variable name was passed in, check to see
                    if that variable has been set yet in session storage. If so, push
                    data into it. Otherwise create the variable than push.
                */
                console.dir($sessionStorage[sessionStorageVar]);
                if (typeof($sessionStorage[sessionStorageVar]) != 'undefined' && $sessionStorage[sessionStorageVar] && sessionStorageVar) {
                    $sessionStorage[sessionStorageVar].push(data);
                    dataStore.push(data);
                    return;
                } else {
                    $sessionStorage[sessionStorageVar] = [];
                    $sessionStorage[sessionStorageVar].push(data);
                    dataStore.push(data);
                    return;
                }
            };
            var get = function(sessionStorageVar) {
                if (sessionStorageVar) {
                    return $sessionStorage[sessionStorageVar];
                }
                if (dataStore.length === 0) {
                    return [];
                }
                return dataStore[0];
            };
            var reset = function(sessionStorageVar) {
                if (sessionStorageVar) {
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
