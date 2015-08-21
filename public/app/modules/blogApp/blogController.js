angular.module('BlogApp')
.controller('blogctrl', [
'$scope',
function($scope){
$scope.blogData = [{id:1}, {id:2}];
}]);
