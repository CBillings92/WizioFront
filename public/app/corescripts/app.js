//CREATE ALL TOP LEVEL APPS (create, not start)
angular.module('AboutUsApp', []);
angular.module('AdminPanelApp', []);
angular.module('AccountApp', []);
angular.module('AmazonS3UploadApp', []);
angular.module('ApplicationApp', []);
angular.module('AuthApp', []);
angular.module('BlogApp', []);
angular.module('CampaignApp', []);
angular.module('LandingPageApp', []);
angular.module('NavbarApp', []);
angular.module('SellerApp', []);
angular.module('SharedControllersApp', []);
angular.module('SharedFactoryApp', []);
angular.module('SharedServiceApp', []);
angular.module('UnitApp', []);


//LOAD 'MainApp' ANGULAR module
//LOAD ALL TOP LEVEL APPLICATIONS INTO MAIN APP
angular.module('MainApp', [
        //change to UnitApp
        'AdminPanelApp',
        'AccountApp',
        'AmazonS3UploadApp',
        'ApplicationApp',
        'AuthApp',
        'AboutUsApp',
        'BlogApp',
        'LandingPageApp',
        'CampaignApp',
        'NavbarApp',
        'SellerApp',
        'SharedControllersApp',
        'SharedFactoryApp',
        'SharedServiceApp',
        'UnitApp',
        'ui.router',
        'ngFacebook',
        'ngStorage',
        'ngResource',
        'ngLodash',
        'ui.bootstrap',
        'angular-jwt'
    ])
    .config(["$facebookProvider", "$sceDelegateProvider", function($facebookProvider, $sceDelegateProvider) {
        $facebookProvider.setAppId('439701646205204');
        $sceDelegateProvider.resourceUrlWhitelist([
          // Allow same origin resource loads.
          'self',
          // Allow loading from our assets domain.  Notice the difference between * and **.
          'https://youtu.be/**',
          'https://www.youtube.com/watch?v=**',
          'https://www.youtube.com/watch?v=*&feature=youtu.be',
          'http://www.youtube.com/embed/**'
        ]);
    }])
    //ON APP START AND DURING APP RUN
    .run([
        '$rootScope',
        '$state',
        '$http',
        '$localStorage',
        '$window',
        '$facebook',
        'jwtHelper',
        'AuthFct',
        'TokenSvc',
        function($rootScope, $state, $http, $localStorage, $window, $facebook, jwtHelper, AuthFct, TokenSvc) {

            //FACEBOOK SDK
            // Load the Facebook SDK asynchronously
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            //HELPER FUNCTION
            //handle facebook authentication on initial application launch
            //get the login status of the user
            //--if they are "connected", get their user information and send
            //----that to the server to search for credentials and get a token
            //--if they are "not authorized" set variables for authentication
            function facebookAuth(){
                $facebook.getLoginStatus().then(function(fbLoginStatus){
                    console.dir(fbLoginStatus);
                    switch(fbLoginStatus.status){
                        case "not authorized":
                            $rootScope.isLoggedIn = false;
                            $rootScope.authObjects.facebookConnected = false;
                            break;
                        case "connected":
                            $rootScope.authObjects.facebookConnected = true;
                            $facebook.api('/me').then(function(user){
                                //tell the server it's a facebook login with
                                //facebook: true
                                var fbData = {
                                    user: user,
                                    fbLoginStatus: fbLoginStatus,
                                    facebook: true
                                };
                                AuthFct.signin(fbData, function(data, status){
                                    console.dir(data);
                                    console.dir(status);
                                    //do stuff with data?
                                    if(status === 403){
                                        $rootScope.isLoggedIn = false;
                                        return;
                                    }
                                    $rootScope.isLoggedIn = true;
                                    return;
                                });
                            });
                            break;
                        default:
                            $rootScope.isLoggedIn = false;
                            $rootScope.authObjects.facebookConnected = false;
                    }
                });
            }

            //IF user is not authorized, assign isLoggedIn to false
                //this will be over written later if they are a standard user
            //if user is connected, get user information and pass to server
                //server will check if user exists in DB if not create user
                //Server will send back Wizio Token
                //Front end will store facebook token expiry in localStorage
            //anytime user makes a request at a protected path
                //1: Check if user is authenticated in front end
                //2: Check if the Facebook auth token expired
                //3: Send token and request to DB if hasn't expired.


            //set container object for auth objects
            $rootScope.authObjects = {
                facebookConnected: false
            };

            var tokenIsExp = TokenSvc.checkExp();
            var token = TokenSvc.getToken();

            console.dir(token);
            //if no token exists, assign isLoggedIn to false
            //if token is expired, assign isLoggedIn to false
            //else, assign isLoggedInto to true
            if (token === 'No Token') {
                //if no token, check if user is logged into facebook
                facebookAuth();
            } else if (tokenIsExp) {
                TokenSvc.deleteToken();
                facebookAuth();
            } else {
                $rootScope.userType = TokenSvc.decode().userType;
                $rootScope.isLoggedIn = true;
            }



            //Watch for angular app state changes
            $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

                var requireLogin = null;
                var requestedStateUserType = null;
                //HELPER FUNCTION: Check if user is connected with facebook
                function checkFBConnection(){
                    consoe.dir("why");
                    if($rootScope.authObjects.facebookConnected === true){
                        facebookAuth();
                    }
                }
                //HELPER FUNCTION: Check if to-state requires login and if so
                //what userType it requires for access.
                function assignToStateReqs(){
                    if (toState && toState.data.requireLogin === true) {
                        requireLogin = true;
                        requestedStateUserType = toState.data.userType;
                        return;
                    } else {
                        requireLogin = false;
                        return;
                    }
                }
                //HELPER FUNCTION: Check token expiry. If expired, delete token
                function checkTokenExpiry(){
                    if (TokenSvc.checkExp()) {
                        TokenSvc.deleteToken();
                    }
                }

                //Assign to-state requirements
                //---assign requireLogin and user
                assignToStateReqs();
                //Check if token is expired
                checkTokenExpiry();

                //get token object from service
                var token = TokenSvc.getToken();
                var user = TokenSvc.decode();
                //if state requires login, if token exists, if its expired, login
                if(requireLogin === true){

                    switch(token){
                        case 'No Token':
                            alert('Please login');
                            event.preventDefault();
                            checkFBConnection();
                        break;
                        default:
                            $rootScope.isLoggedIn = true;
                            if(user.userType === requestedStateUserType || user.userType === 0){
                                return;
                            } else {
                                alert('Access Denied');
                                event.preventDefault();
                                return;
                            }
                    }
                } else {
                    if(token === 'No Token' || token === null || token === 'undefined'){
                        $rootScope.isLoggedIn = false;
                    } else {
                        $rootScope.isLoggedIn = true;
                    }
                    return;
                }
            });
        }
    ]);
