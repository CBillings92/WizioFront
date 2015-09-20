angular.module('SharedFactoriesApp')
    .factory('geocoder', [
        '$q',
        function($q) {
            //function which takes an address
            var getLatLong = function(address) {
                //stire $q's defer method in local variable deferred
                var deferred = $q.defer();
                //some magical google code to create a new Geocoder object
                var geocoder = new google.maps.Geocoder();
                //geocode passed in address, then utilize callback function to handle asynch results
                geocoder.geocode({
                    'address': address
                }, function(results, status) {
                    //if google maps geocodes successfully resolve promise passing lat/long data through it
                    if (status === google.maps.GeocoderStatus.OK) {
                        deferred.resolve(results[0].geometry.location);
                    }
                });
                //return the deferred promise.
                return deferred.promise;
            };
            console.log(getLatLong);
            return {
                getLatLong: getLatLong
            };
        }
    ])
    .factory('sendresetpassemail', [
        '$resource',
        function($resource) {
            return $resource("http://localhost:4000/api/user/forgotpassword");
        }

    ])
    .factory('updatepassword', [
        '$resource',
        function($resource) {
            return $resource("http://localhost:4000/api/user/updatepassword");
        }
    ])
    .factory('Search', [
        '$resource',
        function($resource) {
            return $resource("http://localhost:4000/api/search/:flag/:searchString", {
                flag: "@flag",
                searchString: "@searchString"
            });
        }
    ])
    .factory('registration', [
        '$resource',
        function($resource) {
            return $resource("http://localhost:4000/api/user/registration");
        }
    ]);
