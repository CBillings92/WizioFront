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
