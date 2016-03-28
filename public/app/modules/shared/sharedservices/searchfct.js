angular.module('SharedServiceApp')
    .factory('SearchFct', [
        '$sessionStorage',
        '$rootScope',
        'ApartmentModel',
        'SearchModel',
        'DescriptionModel',
        'LeaseModel',
        'lodash',
        function($sessionStorage, $rootScope, ApartmentModel, SearchModel, DescriptionModel, LeaseModel, lodash) {
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
            var formatSearchResults = function(response) {
                var formattedApartmentArray = [];
                var apt;
                for (var i = 0; i < response.length; i++) {
                    apt = response[i];
                    var newApartment = ApartmentModel.build(apt);
                    newApartment.concealAddress();
                    formattedApartmentArray.push(newApartment);
                    if(apt.Descriptions && apt.Descriptions.length !== 0){
                        formattedApartmentArray[i].Description = DescriptionModel.build(apt.Descriptions[0]);
                    }
                    if (apt.Leases && apt.Leases.length !== 0) {
                        formattedApartmentArray[i].Lease = LeaseModel.build(apt.Leases[0]);
                    }
                    if (apt.Media && apt.Media.length !== 0) {
                        formattedApartmentArray[i].Media = lodash.groupBy(apt.Media, "type");
                    }
                }
                return formattedApartmentArray;
            };
            var search = function(data, filters, callback) {
                //build new apartment instance
                var apartmentInstance = ApartmentModel.build(data);
                //get get Geocode Data
                apartmentInstance.getGeocodeData()
                    .then(function(response) {
                        //set topLevelType for search
                        var topLevelType = null;
                        if (apartmentInstance.apartmentData.topLevelType) {
                            topLevelType = apartmentInstance.apartmentData.topLevelType;
                        }
                        //create a new search object
                        var newSearchInstance = new SearchModel(apartmentInstance, topLevelType, filters);
                        //send this new search instance to the backend
                        newSearchInstance.send(function(response) {
                            var formattedSearchResults = formatSearchResults(response);
                            $sessionStorage.apartmentSearch = formattedSearchResults;
                            $rootScope.$broadcast('searchFinished', formattedSearchResults);
                            return callback('done');
                        });
                    });
            };

            return {
                search: search,
                concealAddress: concealAddress,
                formatSearchResults: formatSearchResults
            };
        }
    ]);
