angular.module('UnitApp')
.service('UnitCreateSvc', [
    'geocoder',
    'lodash',
    'FlexGetSetSvc',
    function(geocoder, lodash, FlexGetSetSvc){
        var getGeocodeData = function(address, callback) {
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                console.dir(status);
                if (status == google.maps.GeocoderStatus.OK) {
                    return callback(null, results);
                } else {
                    return callback({message: "No Google API Address found"}, null);
                }
            });
        };
        var parseGeocodeData = function(apartmentAddress, apartmentParams, callback){
            //look for the apartmentAddress from the google API data.
            console.dir(FlexGetSetSvc.get());
            var googleAPIData = lodash.filter(FlexGetSetSvc.get().data.results, function(item){
                return item.formatted_address === apartmentAddress;
            });
            console.dir(googleAPIData);
            googleAPIData = lodash.filter(FlexGetSetSvc.get().data.results, function(item){
               return item['formatted address'] === apartmentAddress;
           });
           console.dir(googleAPIData);

            console.dir(apartmentAddress);
            console.dir(apartmentParams);
            console.dir(apartmentObj);
            //Used to select between long_name and short_name in the googleAPI data
            function parseData(array) {
                console.dir(array);
                if (array[0].long_name) {
                    return array[0].long_name;
                } else if (array[0].short_name) {
                    return array[0].short_name;
                } else {
                    return "na";
                }
            }

            //set empty apartmentObj object. Will store apartment info
            var apartmentObj = {};
            console.dir(apartmentObj);





            if(apartmentParams){
                console.dir(apartmentObj);
                for(var prop in apartmentParams){
                    apartmentObj[prop] = apartmentParams[prop];
                    console.dir(apartmentObj);
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

            apartmentObj.state = parseData(state);
            apartmentObj.zip = parseData(zip);

            //convert the google API data geometry object that contains the
            //latitude and logitude into an array
            var coords = lodash.values(googleAPIData[0].geometry.location);

            //store latitude and longitude onto the apartmetn after converting
            //it to a number and forcing only 6 decimal places
            var latitude = parseFloat(coords[0].toFixed(6));
            var longitude = parseFloat(coords[1].toFixed(6));
            apartmentObj.latitude = latitude;
            apartmentObj.longitude = longitude;
            console.dir(apartmentObj);

            return callback(apartmentObj);
        };
    return {
        parseGeocodeData: parseGeocodeData
    };
    }
]);
