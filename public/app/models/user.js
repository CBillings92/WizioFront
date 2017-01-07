angular.module('Models')
    .factory('UserModel',[ function() {
        //the user object we base other user objects on.
        //utilize var newUser = Object.create(userDataToCreate);
        var User = {
            init: init
        }

        //initialize new user objects
        function init(userObj) {
            this.firstName = userObj.firstName;
            this.lastName = userObj.lastName;
            this.email = userObj.email;
            this.password = userObj.password;
            this.accountType = userObj.accountType;
        }

        function resetPassword() {
            //handle password change
        }

        function saveNewUser() {

        }

        function modifyCurrentUser() {

        }

        return User;
    }]);
