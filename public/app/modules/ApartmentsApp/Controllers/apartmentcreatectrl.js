angular.module('ApartmentsApp')
    .controller('CreateApartmentCtrl', [
        '$scope',
        '$sessionStorage',
        '$rootScope',
        '$state',
        'geocoder',
        'lodash',
        'ApartmentsResource',
        //Pass $scope into the function as a way to allow our code to work when utilizing minification.
        //See the last 3 sections of this site. Starts with: "The benefit to the longhand version is that..." https://thinkster.io/egghead/scope-vs-scope/
        function($scope, $sessionStorage, $rootScope, $state, geocoder, lodash, ApartmentsResource) {
            //save sessionStorage variable into $scope.$storage for sessionStorage

            $scope.$storage = $sessionStorage;
            //Array to hold all states in states drop down
            $scope.states = [
                'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU',
                'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN',
                'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK',
                'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA',
                'WV', 'WI', 'WY'
            ];
            //Array for number of beds drop down
            $scope.numBeds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
            //Function that adds apartment to the database through RESTful API
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

            $scope.addApartment = function() {
                //Build out the address by pulling values in text inputs from HTML
                //Appending spaces between each variable and storing it in local address variable
                var address = $scope.street + ' ' + $scope.city + ' ' + $scope.state + ' ' + $scope.zip;
                //Call latitude function (written below) and pass this newly created address variable into it
                latitude(address);

                //Create apartment object that will get sent through request body and stored in database
                var apartmentObj = {
                    street: $scope.street,
                    unitNum: $scope.unitNum,
                    city: $scope.city,
                    state: $scope.state,
                    zip: $scope.zip,
                    beds: $scope.beds,
                    baths: $scope.baths,
                    livingSpaces: $scope.livingRooms,
                    maxResidency: $scope.maxResidency,
                    costPerMonth: $scope.costPerMonth,
                    renovated: $scope.renovated,
                    pets: $scope.petPolicy,
                    youtubeVRID: $scope.youtubeVRID
                };

                function latitude(address) {
                    //storing passed in address into a local variable address
                    address = "175 Amory Street Jamaica Plain MA 02130";

                    var geocoder = new google.maps.Geocoder();
                    geocoder.geocode({
                        'address': address
                    }, function(results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            //console log the results from GoogleAPI so we can see
                            //console.dir(trial);
                            console.dir(results[0]);
                            console.dir(results[0].address_components[0].types[0]);
                            //how the data is structured
                            var streetNumber = lodash.filter(results[0].address_components, function(item) {
                                return item.types[0] === "street_number";
                            });
                            var street = lodash.filter(results[0].address_components, function(item) {
                                return item.types[0] === "route";
                            });

                            var locality = lodash.filter(results[0].address_components, function(item) {
                                return item.types[0] === "locality";
                            });
                            var administrative_area_level_3 = lodash.filter(results[0].address_components, function(item) {
                                return item.types[0] === "administrative_area_level_3";
                            });
                            var state = lodash.filter(results[0].address_components, function(item) {
                                return item.types[0] === "administrative_area_level_1";
                            });
                            var zip = lodash.filter(results[0].address_components, function(item) {
                                return item.types[0] === "postal_code";
                            });
                            var neighborhood = lodash.filter(results[0].address_components, function(item) {
                                return item.types[0] === "neighborhood";
                            });
                            console.dir(streetNumber + " " + street);
                            if (streetNumber.length > 0 && street.length > 0) {
                                apartmentObj.street = parseData(streetNumber) + " " + parseData(street);
                            }
                            console.dir(neighborhood);
                            if (neighborhood.length > 0) {
                                apartmentObj.neighborhood = parseData(neighborhood);
                            }
                            if (locality.length > 0) {
                                apartmentObj.locality = parseData(locality);
                            }
                            if (administrative_area_level_3.length > 0) {
                                apartmentObj.administrative_area_level_3 = parseData(administrative_area_level_3);
                            }
                            console.dir(state);
                            apartmentObj.state = parseData(state);
                            console.dir(zip);
                            apartmentObj.zip = parseData(zip);
                            apartmentObj.concatAddress = results[0].formatted_address;
                            apartmentObj.latitude = parseFloat(results[0].geometry.location.G.toFixed(6));
                            apartmentObj.longitude = parseFloat(results[0].geometry.location.K.toFixed(6));
                            console.dir(apartmentObj);
                            //save apartment to database using apartment factory
                            ApartmentsResource.save({action: 'save'}, apartmentObj, function(data, status) {
                                $scope.apartment = data;
                                console.dir(data);
                                $state.go('MyAccount');
                            });
                        }
                    });
                }

                //reset the apartment creation form scopes.
                $scope.street = '';
                $scope.city = '';
                $scope.state = '';
                $scope.zipcode = '';
            };
        }
    ]);
