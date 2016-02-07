angular.module('Directives')
.directive('favoritesDirv',[
    'FavoritesFct',
    function(FavoritesFct){
        return {
            restrict: 'A',
            link: function($scope, $attrs, $element, $controller){

            }
        };
    }
]);
