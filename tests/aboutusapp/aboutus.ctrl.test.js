describe('calculator', function(){
    beforeEach(module('MainApp'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe('sum', function() {
        it('should be 2', function () {
            var $scope;
            var controller = $controller('AboutListCtrl', {$scope: $scope});
            console.dir(controller);
            // expect($scope.test).toBe(2);
        });
    });
});
