angular.module('SharedServiceApp')
    .service('ApartmentGetSetSvc', [
        '$sessionStorage',
        '$stateParams',
        'UnitResource',
        'lodash',
        'SearchFct',
        function($sessionStorage, $stateParams, UnitResource, lodash, SearchFct) {
            var apartmentSelected = null;
            var sessionStorageVarContainer = [];
            var queryApartment = function(apartmentURLID) {
                return new Promise(function(resolve, reject) {
                    UnitResource.get({
                        id: apartmentURLID
                    }, function(apartmentResponse) {
                        response = SearchFct.formatSearchResults([apartmentResponse]);
                        console.dir(response);
                        resolve(response);
                    });
                });
            };
            // accepts a string as a sessionStorage variable if you want to
            //save the data to sessionStorage associated with that name
            var set = function(apartment, sessionStorageVar) {
                //save data to sessionStorage with dynamic variable name
                console.dir(apartment);
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
                    queryApartment(apartmentURLID)
                        .then(function(response) {
                            callback(response);
                        });
                } else {
                    return apartmentSelected;
                }

            };
            var reset = function() {
                apartmentSelected = null;
            };
            //this is really for making sure we're loading the right apartment data
            //for a few different cases. User navigates to an apartment, leaves page open
            // and then navigates to a different apartment on a different tab or page
            //directly

            var checkApartment = function(callback) {
                var apartmentURLID = $stateParams.id;
                var apartmentInSession = $sessionStorage.apartmentSelected;
                console.dir(apartmentInSession);
                console.dir(apartmentInSession.apartmentData);
                console.dir(apartmentURLID == apartmentInSession.apartmentData.id);
                //check if there is an apartment in session
                if (!apartmentInSession) {
                    //if no apartment in session, make API call
                    queryApartment(apartmentURLID)
                        .then(function(response) {
                            // SearchFct.formatSearchResults()
                            callback(response);
                        });
                } else {
                    //if the current apartment ID matches the ID in session
                    if (apartmentURLID === apartmentInSession.apartmentData.id) {
                        console.dir(apartmentInSession);
                        //return apartment in session.
                        return callback(apartmentInSession);
                    } else {
                        queryApartment(apartmentURLID)
                            .then(function(response) {
                                callback(response);
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
