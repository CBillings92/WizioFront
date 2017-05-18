angular.module('FlyOutMenuApp').directive('flyOutMenuDir', function() {
    return {
        templateUrl: 'public/app/modules/flyout-menu/flyout-menu.html', controller: 'FlyOutMenuCtrl',
        // scope: {
        //     selectPhoto: '=selectPhoto',
        //     buttonAction: '=buttonAction'
        // },
        restrict: 'EA'
    };
});
