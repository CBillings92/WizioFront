angular.module('SharedServiceApp')
    .factory('SearchFct', [
        '$sessionStorage',
        '$rootScope',
        'ApartmentModel',
        'SearchModel',
        function($sessionStorage, $rootScope, ApartmentModel, SearchModel) {
            var concealAddress = function(response) {
                for (i = 0; i < response.length; i++) {
                    var left = Math.floor((response[i].concatAddr.charCodeAt(5) / 19) + 4);
                    var right = Math.floor((response[i].concatAddr.charCodeAt(3) / 19) + 4);
                    var houseNumInt = parseInt((response[i].concatAddr).replace(/(^\d+)(.+$)/i, '$1'));
                    var houseNumLow = houseNumInt - left;
                    if (houseNumInt < 15) {
                        houseNumLow = 1;
                    }
                    var houseNumHigh = houseNumInt + right;
                    var houseNumRange = houseNumLow.toString() + "-" + houseNumHigh.toString();
                    response[i].hiddenAddress = houseNumRange + response[i].concatAddr.replace(/^\d+/, '');
                }
                return response;
            };
            var search = function(data, filters, callback){
                //build new apartment instance
                var apartmentInstance = ApartmentModel.build(data);
                //get get Geocode Data
                apartmentInstance.getGeocodeData(function(response){
                    //set topLevelType for search
                    var topLevelType = null;
                    if(apartmentInstance.apartmentData.topLevelType){
                        topLevelType = apartmentInstance.apartmentData.topLevelType;
                    }
                    //create a new search object
                    var newSearchInstance = new SearchModel(apartmentInstance, topLevelType, filters);
                    //send this new search instance to the backend
                    newSearchInstance.send(function(response) {
                        var data = concealAddress(response);
                        $sessionStorage.apartmentSearch = response;
                        $rootScope.$broadcast('searchFinished', response);
                        callback('done');
                    });
                });
            };

            return {
                search: search,
                concealAddress: concealAddress
            }
        }
    ]);
