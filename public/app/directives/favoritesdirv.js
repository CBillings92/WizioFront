angular.module('Directives')
.directive('FavoritesDirv',[
    'FavoritesFct',
    function(FavoritesFct){
        return {
            restrict: 'A',
            link: function($scope, $attrs, $element, $controller){
                
            }
        };
    }
]);
