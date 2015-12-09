angular.module('UnitApp')
    .service('UnitObjectSvc', [
        function() {
            var Apartment = function(address, unitNum, beds, baths, livingSpaces, maxResidency, costPerMonth, renovated, pets, youtubeVRID) {
                this.address = address;
                this.unitNum = unitNum;
                this.beds = beds;
                this.baths = baths;
                this.livingSpaces = livingSpaces;
                this.maxResidency = maxResidency;
                this.costPerMonth = costPerMonth;
                this.renovated = renovated;
                this.pets = pets;
                this.youtubeVRID = youtubeVRID;
            };
            Apartment.prototype.saveToDB = function() {

            };

        }
    ])
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
                var searchStringFound = false;
                if (googleAPIDataRaw.length !== 0) {
                    searchStringFound = findSearchString(apartmentAddress, googleAPIDataRaw);
                }

                //if no match found, send address to google API to get get GeocodeData
                if (searchStringFound === false) {
                    getGeocodeData(apartmentAddress, function(err, data) {
                        if (err) {
                            //handle error
                            return callback("no address info found", null);
                        }
                        //this builds an apartment object for storing in DB
                        var apartmentObj = lodashParseAPIData(data, apartmentParams);

                        return callback(null, apartmentObj);
                    });
                } else {
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
                //search for the search string in the smart search google API results
                var googleAPIData = lodash.filter(googleAPIDataRaw.data.results, function(item) {
                    return item.formatted_address === searchString;
                });
                //if there was no search string match found, search for it in
                //different object. Google API stores it in two different ways
                if (googleAPIData.length === 0) {
                    googleAPIData = lodash.filter(googleAPIDataRaw.data.results, function(item) {
                        return item['formatted address'] === searchString;
                    });
                }
                //if the search string wasn't found return false
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
                function filterComponents(stringToFind) {
                    return lodash.filter(addressComponents, function(item) {
                        return item.types[0] === stringToFind;
                    });
                }

                function checkExistance(data, keyName) {
                    if (data && data.length > 0) {
                        apartmentObj[keyName] = parseData(data);
                    }
                }

                var streetNumber = filterComponents("street_number");
                var street = filterComponents("route");
                var locality = filterComponents("locality");
                var administrative_area_level_3 = filterComponents("administrative_area_level_3");
                var state = filterComponents("state");
                var neighborhood = filterComponents("neighborhood");
                var zip = filterComponents("zip");

                if (streetNumber && streetNumber.length > 0 && street.length > 0) {
                    apartmentObj.street = parseData(streetNumber) + " " + parseData(street);
                }
                checkExistance(street, "route");
                checkExistance(neighborhood, "neighborhood");
                checkExistance(locality, "locality");
                checkExistance(administrative_area_level_3, "administrative_area_level_3");
                checkExistance(zip, "zip");

                //HANDLE LATITUDE AND LONGITUDE
                //convert the google API data geometry object that contains the
                //latitude and logitude into an array
                var coords = null;
                var latitude = null;
                var longitude = null;

                if (googleAPIData[0].geometry.hasOwnProperty('location')) {
                    coords = lodash.values(googleAPIData[0].geometry.location);

                } else if (googleAPIData[0].geometry.hasOwnProperty('viewport')) {

                    if (googleAPIData[0].geometry.viewport.hasOwnProperty('northeast')) {
                        coords = lodash.values(googleAPIData[0].geometry.viewport.northeast);

                    } else if (googleAPIData[0].geometry.viewport.hasOwnProperty('northwest')) {
                        coords = lodash.values(googleAPIData[0].geometry.viewport.northwest);

                    } else if (googleAPIData[0].geometry.viewport.hasOwnProperty('southeast')) {
                        coords = lodash.values(googleAPIData[0].geometry.viewport.southeast);

                    } else if (googleAPIData[0].geometry.viewport.hasOwnProperty('southwest')) {
                        coords = lodash.values(googleAPIData[0].geometry.viewport.southwest);
                    }
                }

                //store latitude and longitude onto the apartmetn after converting
                //it to a number and forcing only 6 decimal places
                //check if latitude and longitude are strings or numbers.
                //if not numbers or strings, ignore latitude and longitude

                //Dear Cameron, I didn't understand why these conditionals were
                //neccessary, they where breaking the lat long, so I fixed them
                //I wanted to remove them though.
                if ((typeof coords[0]) === (typeof 'Hello') || (typeof coords[0]) === (typeof 3.14)) {
                    latitude = parseFloat(coords[0].toFixed(6));
                    apartmentObj.latitude = latitude;
                }
                if ((typeof coords[1]) === (typeof 'Hello') || (typeof coords[1]) === (typeof 3.14)) {
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
