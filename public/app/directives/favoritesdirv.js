angular.module('Directives')
.directive('closeModalDirv', [function($modalInstance) {
     return {
      restrict: 'AE',
      scope: false,
      template: '<button type="button" class="close" data-dismiss="modal" data-toggle="modal" ng-click="closeModal()" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
      link: function(scope, element, attrs){
      }
  };
}])
.directive('currency', ['$filter', function ($filter) {
    return {
        require: 'ngModel',
        scope: false,
        link: function (elem, $scope, attrs, ngModel) {
            ngModel.$formatters.push(function (val) {
                return $filter('currency')(val);
            });
            ngModel.$parsers.push(function (val) {
                return val.replace(/[\$,]/, '');
            });
        }
    };
}]);
