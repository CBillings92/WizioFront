angular.module('SharedServiceApp')
    .factory('SearchFct', [
        function() {
            var concealAddress = function() {
                for (i = 0; i < data.length; i++) {
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
            var search = function(searchInstance, callback) {
                searchInstance.send(function(response) {
                    console.dir(response);
                    var data = concealAddress(response);
                    console.dir(data);
                });
            };

            return {
                search: search
            }
        }
    ]);
