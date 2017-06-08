angular.module('VrPlayerApp').directive('vrPlayerDir', [
    'WizioConfig',
    function(WizioConfig) {
        return {templateUrl: WizioConfig.directives.vrplayer.main.view, controller: 'VrPlayerCtrl', restrict: 'EA'}
    }
])
