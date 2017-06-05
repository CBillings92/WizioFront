angular.module('TourApp').directive('tourAppDir', [
    'WizioConfig',
    function(WizioConfig) {
        return {
            templateUrl: WizioConfig.directives.tour.view,
            scope: {
                showcontrols: '=',
                showcontactinfo: '=',
                showpoweredby: '=',
            },
            controller: WizioConfig.directives.tour.controller,
            restrict: 'EA'
        }
    }
])
