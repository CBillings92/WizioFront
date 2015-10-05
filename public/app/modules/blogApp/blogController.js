angular.module('BlogApp')
    .controller('BlogCtrl', [
        '$scope',
        function($scope) {
            $scope.blogData = [{
                id: 1
            }, {
                id: 2
            }];
        }
    ]);
