angular.module('UnitApp')
    .service('UnitCreateSvc', [
        'lodash',
        'FlexGetSetSvc',
        function(lodash, FlexGetSetSvc) {
            //exposed to angular application.
            //sends address to Google API for geocoding
            var getGeocodeData = function(address, callback) {
                //create a new geocoder object
                var geocoder = new google.maps.Geocoder();
                //geocode an address
                geocoder.geocode({
                    'address': address
                }, function(results, status) {
                    //if it returns OK, send back results in callback
                    if (status == google.maps.GeocoderStatus.OK) {
                        return callback(null, results);
                    } else {
                        return callback({
                            message: "No Google API Address found"
                        }, null);
                    }
                });
            };
            var addressSearchType = function(searchString, callback) {
                //search type is final description of search type that will be returned
                var searchType = null;
                //the raw googleAPIData that is stored in the flex gettersetter
                var gooogleAPIDataRaw = FlexGetSetSvc.get();
                //converts the type of googleAPI search data to an array
                //ex: postal code, or [neighborhood, locality]
                var googleAPIDataTypeARR = lodash.values(googleAPIDataRaw.data.results.types);
                if (googleAPIDataTypeARR.length === 1) {
                    searchType = googleAPIDataTypeARR[0];
                    return callback(searchType);
                } else {
                    return callback(searchType);
                }
            };
            var parseGeocodeData = function(apartmentAddress, apartmentParams, callback) {
                //get raw data from Smart Search stored in FlexGetSetSvc
                var googleAPIDataRaw = FlexGetSetSvc.get();
                //check if search string matches any google API raw data passed
                //from the smart search feature. False if no match. google API
                //Data object returned if match found
                var searchStringFound = findSearchString(apartmentAddress, googleAPIDataRaw);
                //if no match found, send address to google API to get get GeocodeData
                if (searchStringFound === false) {
                    console.dir("MODIFIED SEARCH");
                    getGeocodeData(apartmentAddress, function(err, data) {
                        if (err) {
                            //handle error
                        }
                        var apartmentObj = lodashParseAPIData(data, apartmentParams);
                        return callback(null, apartmentObj);
                    });
                } else {
                    console.dir("NON MODIFIED SEARCH");
                    var apartmentObj = lodashParseAPIData(searchStringFound, apartmentParams);
                    return callback(null, apartmentObj);
                }
            };
            //HELPER FUNCTIONS
            //findSearchString: Check if the search string exists in the
            //google API data (see if the user modified the smart search suggestion)
            // IF the user modified the search suggestion and no match found -
            // RETURN false
            //else RETURN TRUE
            function findSearchString(searchString, googleAPIDataRaw) {
                var googleAPIData = lodash.filter(googleAPIDataRaw.data.results, function(item) {
                    return item.formatted_address === searchString;
                });
                if (googleAPIData.length === 0) {
                    googleAPIData = lodash.filter(googleAPIDataRaw.data.results, function(item) {
                        return item['formatted address'] === searchString;
                    });
                }
                switch (googleAPIData.length) {
                    case 0:
                        return false;

                    default:
                        return googleAPIData;

                }
            }
            //Used to select between long_name and short_name in the googleAPI data
            function parseData(array) {
                if (typeof array[0].long_name != 'undefined') {
                    return array[0].long_name;
                } else if (typeof array[0].short_name != 'undefined') {
                    return array[0].short_name;
                } else {
                    return "na";
                }
            }

            function lodashParseAPIData(googleAPIData, apartmentParams) {
                //set empty apartmentObj object. Will store apartment info
                var apartmentObj = {};
                console.dir(googleAPIData);
                apartmentObj.topLevelType = googleAPIData[0].types[0];

                //if apartment parameters are passed in for apartment creation
                //append them to apartmentObj for being returned.
                if (apartmentParams) {
                    for (var prop in apartmentParams) {
                        apartmentObj[prop] = apartmentParams[prop];
                    }
                }
                //store the google API formatted address on the apartment
                var addressComponents = googleAPIData[0].address_components;
                //how the data is structured
                apartmentObj.formattedAddress = googleAPIData[0].formatted_address;
                //search for street_number in google API data
                var streetNumber = lodash.filter(addressComponents, function(item) {
                    return item.types[0] === "street_number";
                });
                //search for street in google API data
                var street = lodash.filter(addressComponents, function(item) {
                    return item.types[0] === "route";
                });
                //search for locality in google API data
                var locality = lodash.filter(addressComponents, function(item) {
                    return item.types[0] === "locality";
                });
                var administrative_area_level_3 = lodash.filter(addressComponents, function(item) {
                    return item.types[0] === "administrative_area_level_3";
                });
                var state = lodash.filter(addressComponents, function(item) {
                    return item.types[0] === "administrative_area_level_1";
                });
                var zip = lodash.filter(addressComponents, function(item) {
                    return item.types[0] === "postal_code";
                });
                var neighborhood = lodash.filter(addressComponents, function(item) {
                    return item.types[0] === "neighborhood";
                });
                if (streetNumber.length > 0 && street.length > 0) {
                    apartmentObj.street = parseData(streetNumber) + " " + parseData(street);
                }
                if (neighborhood.length > 0) {
                    apartmentObj.neighborhood = parseData(neighborhood);
                }
                if (locality.length > 0) {
                    apartmentObj.locality = parseData(locality);
                }
                if (administrative_area_level_3.length > 0) {
                    apartmentObj.administrative_area_level_3 = parseData(administrative_area_level_3);
                }
                if(zip.length > 0){
                    apartmentObj.zip = parseData(zip);
                }

                //HANDLE LATITUDE AND LONGITUDE
                //convert the google API data geometry object that contains the
                //latitude and logitude into an array
                var coords = lodash.values(googleAPIData[0].geometry.location);

                //store latitude and longitude onto the apartmetn after converting
                //it to a number and forcing only 6 decimal places
                var latitude = null;
                var longitude = null;
                //check if latitude and longitude are strings or numbers.
                //if not numbers or strings, ignore latitude and longitude
                if(typeof coords[0] === String || typeof coords[0] === Number){
                    latitude = parseFloat(coords[0].toFixed(6));
                    apartmentObj.latitude = latitude;
                }
                if(typeof coords[1] === String || typeof coords[0] === Number){
                    longitude = parseFloat(coords[1].toFixed(6));
                    apartmentObj.longitude = longitude;
                }
                return apartmentObj;
            }

            //return functions 
            return {
                getGeocodeData: getGeocodeData,
                addressSearchType: addressSearchType,
                parseGeocodeData: parseGeocodeData

            };
        }
    ]);
