angular.module('SharedFactoriesApp')
    .factory('Auth', [
        '$state',
        '$localStorage',
        '$http',
        'registration',
        function($state, $localStorage, $http, createacct) {
            function urlBase64Decode(str) {
                var output = str.replace('-', '+').replace('_', '/');
                switch (output.length % 4) {
                    case 0:
                        break;
                    case 2:
                        output += '==';
                        break;
                    case 3:
                        output += '=';
                        break;
                    default:
                        throw 'Illegal base 64 string!';
                }
                return window.atob(output);
            }

            function getClaimsFromToken() {
                var token = $localStorage.token;
                var user = {};
                if (typeof token !== 'undefined') {
                    if (token.value) {
                        var encoded = token.split('.')[1];
                        user = JSON.parse(urlBase64Decode(encoded));
                    }

                }
                return user;
            }

            var tokenClaims = getClaimsFromToken();

            return {
                signup: function(data, success, error) {
                    registration.save(null, data, function(status, data) {
                        console.log(data);
                    });
                },
                signin: function(data, success, error) {
                    $http.post("http://localhost:4000/api/user/authenticate", data)
                        .success(success).error(error);
                },
                logout: function(success) {
                    tokenClaims = {};
                    delete $localStorage.token;
                    success();
                },
                getTokenClaims: function() {
                    var token = $localStorage.token;

                    var user = {};
                    if (typeof token !== 'undefined') {
                        if (token) {
                            var encoded = token.split('.')[1];
                            console.dir(encoded);
                            user = JSON.parse(urlBase64Decode(encoded));
                        }

                    }
                    console.dir(user);
                    return user;
                }
            };
        }
    ])
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
    ]);
