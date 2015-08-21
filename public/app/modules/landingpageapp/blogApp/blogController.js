angular.module('BlogApp')
.controller('BlogCtrl', [
'$scope',
function($scope){
$scope.blogData = 'hey';
console.log($scope.blogData);
}
//blog data has three attributes: content, date and author
]);
