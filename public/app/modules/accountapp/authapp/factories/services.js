angular.module('AccountApp')
.service('AuthCreateUserSvc', [
    function(){
        var createUser = function(user, userType){
            user = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            };
            if (userType.usertype === "tenant") {
                user.userType = 1;
            } else if (userType.usertype === "realtor") {
                user.userType = 2;
            } else if (userType.usertype === "broker") {
                user.userType = 3;
            }
            return user;
        };

        return {
            CreateUser: createUser
        };
    }
]);
