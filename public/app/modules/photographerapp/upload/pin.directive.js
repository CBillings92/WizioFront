angular.module('Directives')
    .directive('uploadPinDirv', [
        '$resource',
        'WizioConfig',
        function($resource, WizioConfig) {
            return {
                restrict: 'E',
                scope: {
                    pin: '='
                },
                replace: true,
                templateUrl: 'public/app/modules/photographerapp/upload/pin.directive.view.html',
                link: function(scope, elem, attrs) {
                    // get the pin data from the single pin grabbed in the ng-repeat
                    var pin;
                    pin = scope.pin;

                    // change the style for the pin as needed
                    console.dir(elem);
                    //for removing pins placed already.
                    // elem.addEventListener('click', removePin)
                }
            };
        }
    ]);
