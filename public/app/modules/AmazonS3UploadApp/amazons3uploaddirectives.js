angular.module('AmazonS3UploadApp')
    .directive('file', function() {
        console.log("The AWS upload directive is being loaded");
        return {
            restrict: 'AE',
            scope: {
                file: '@'
            },
            link: function(scope, el, attrs) {
                el.bind('change', function(event) {
                    var files = event.target.files;
                    var file = files[0];
                    scope.file = file;
                    scope.$parent.file = file;
                    scope.$apply();
                });
            }
        };
    });
