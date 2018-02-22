angular.module("PropertyApp").factory("PropertyAppFct", [
  "$q",
  "$resource",
  "WizioConfig",
  function($q, $resource, WizioConfig) {
    function init(PropertyUUID) {
      return $q(function(resolve, reject) {
        var data1 = {
          Apartment: {
            concatAddr: ""
          },
          tours: [
            {
              unitNum: 1,
              activeListingUUID: "1"
            },
            {
              unitNum: 2,
              activeListingUUID: "2"
            },
            {
              unitNum: 3,
              activeListingUUID: "3"
            }
          ]
        };
        var data2 = [{}, {}, {}];
      });
    }

    return {
      init: init
    };
  }
]);
