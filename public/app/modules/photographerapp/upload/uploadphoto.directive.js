angular.module('Directives')
    .directive('uploadPhotoDirv', [
        function(){
            return {
                restrict: 'E',
                templateUrl: 'public/app/modules/photographerapp/upload/uploadphoto.directive.view.html',
                link: function(scope, elem, attrs){
                    console.dir(document.getElementById('file-chooser'));
                }
            }
        }
    ])
