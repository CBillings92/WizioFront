describe('Auth Factory', function() {
    var AuthFct;
    beforeEach(module('MainApp', function($provide) {

    }));

    beforeEach(inject(function (_AuthFct_) {
        AuthFct = _AuthFct_;

        spyOn(signOn,'signOn');
    }))
});
