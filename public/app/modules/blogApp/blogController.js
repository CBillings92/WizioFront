angular.module('blogApp')
.controller('blogCtrl', [
'$scope',
function($scope){
$scope.blogData = [{id:1}, {id:2}];
}]);
