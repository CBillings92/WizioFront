angular.module('SharedServiceApp')
    .service('ApartmentGetSetSvc', [
        '$sessionStorage',
        '$stateParams',
        'UnitResource',
        'lodash',
        function($sessionStorage, $stateParams, UnitResource, lodash) {
            var apartmentSelected = null;
            var sessionStorageVarContainer = [];
            // accepts a string as a sessionStorage variable if you want to
            //save the data to sessionStorage associated with that name
            var set = function(apartment, sessionStorageVar) {
                //save data to sessionStorage with dynamic variable name
                if (sessionStorageVar) {
                    $sessionStorage[sessionStorageVar] = apartment;
                }
                apartmentSelected = apartment;
            };
            //accepts string as argument that is the name of the variable
            //in session storage that you want to retrieve
            var get = function(sessionStorageVar) {
                if (sessionStorageVar) {
                    apartmentSelected = $sessionStorage[sessionStorageVar];
                    return apartmentSelected;
                    //if there is no apartmentSelected session storage variable
                    //and no apartmentSelected then pull data from database
                } else if (apartmentSelected === null || apartmentSelected.id !== $stateParams.id) {
                    UnitResource.get({
                        id: apartmentURLID
                    }, function(data) {
                        apartmentSelected = data;
                        $sessionStorage[sessionStorageVar] = data;
                        callback(apartmentSelected);
                    });
                } else {
                    return apartmentSelected;
                }

            };
            var reset = function() {
                apartmentSelected = null;
            };
            var checkApartment = function(callback) {
                var apartmentURLID = $stateParams.id;
                var apartmentInSession = $sessionStorage.apartmentSelected;
                //check if there is an apartment in session
                if (!apartmentInSession) {
                    //if no apartment in session, make API call
                    UnitResource.get({
                        id: apartmentURLID
                    }, function(data) {
                        apartmentSelected = data;
                        callback(apartmentSelected);
                    });
                } else {
                    //if the current apartment ID matches the ID in session
                    if(apartmentURLID == apartmentInSession.id){
                        //return apartment in session.
                        return callback(apartmentInSession);
                    } else {
                        UnitResource.get({
                            id: apartmentURLID
                        }, function(data) {
                            apartmentSelected = data;
                            callback(apartmentSelected);
                        });
                    }
                }

            };
            return {
                set: set,
                get: get,
                reset: reset,
                checkApartment: checkApartment,
            };
        }
    ]);
