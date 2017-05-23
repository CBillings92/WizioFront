angular.module('VrPlayerApp')
    .factory('VrPlayerFct', [
        'WizioConfig',
        '$resource',
        function(WizioConfig, $resource) {

            function maxFloorPlanHeight() {

            }

            return {
                calculate: {
                    maxFloorPlanHeight: maxFloorPlanHeight
                }
            }
    }])
