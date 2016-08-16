angular.module('AccountApp')
    .factory('ManageAcctFct', [
        'UserModel',
        'BusinessModel',
        '$q',
        function(UserModel, BusinessModel, $q) {

        var createAccount = createAccount;

        function createAccount(userData) {
            var newUser = Object.create(UserModel);
            newUser.init(userData);
            return newUser;
        }
        function createBusiness(businessData){
            var newBusiness = Object.create(BusinessModel);
            newBusiness.init(businessData);
            return newBusiness;
        }
        function setupNewBusiness(user, business) {
            var user = createUser(user);
            var business = createBusiness(business);

            return new $q(function(resolve, reject) {
                // business.api.setup(user, business)
                // .then(function(response){
                //     resolve(response);
                // })
                // .catch(function(error) {
                //     reject(error);
                // })
            });
        }

        return {
            createAccount: createAccount,
            createBusiness: createBusiness,
            setupNewBusiness: setupNewBusiness
        }
    }])
