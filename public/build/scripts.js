angular.module("AboutUsApp",[]),angular.module("AccountApp",[]),angular.module("AmazonS3UploadApp",[]),angular.module("ApplicationApp",[]),angular.module("AuthApp",[]),angular.module("BlogApp",[]),angular.module("CampaignApp",[]),angular.module("LandingPageApp",[]),angular.module("NavbarApp",[]),angular.module("SellerApp",[]),angular.module("SharedControllersApp",[]),angular.module("SharedFactoryApp",[]),angular.module("SharedServiceApp",[]),angular.module("UnitApp",[]),angular.module("MainApp",["AccountApp","AmazonS3UploadApp","ApplicationApp","AuthApp","AboutUsApp","BlogApp","LandingPageApp","CampaignApp","NavbarApp","SellerApp","SharedControllersApp","SharedFactoryApp","SharedServiceApp","UnitApp","ui.router","ngFacebook","ngStorage","ngResource","ngLodash","ui.bootstrap","angular-jwt"]).config(function(e){e.setAppId("439701646205204")}).run(["$rootScope","$state","$http","$localStorage","$window","$facebook","jwtHelper","AuthFct","TokenSvc",function(e,t,o,a,n,r,i,l,s){function c(){r.getLoginStatus().then(function(t){switch(t.status){case"not authorized":e.isLoggedIn=!1,e.authObjects.facebookConnected=!1;break;case"connected":e.authObjects.facebookConnected=!0,r.api("/me").then(function(o){var a={user:o,fbLoginStatus:t,facebook:!0};l.signin(a,function(t,o){return 403===o?void(e.isLoggedIn=!1):void(e.isLoggedIn=!0)})});break;default:e.isLoggedIn=!1}})}!function(e,t,o){var a,n=e.getElementsByTagName(t)[0];e.getElementById(o)||(a=e.createElement(t),a.id=o,a.src="//connect.facebook.net/en_US/sdk.js",n.parentNode.insertBefore(a,n))}(document,"script","facebook-jssdk"),e.authObjects={};var u=s.checkExp(),p=s.getToken();p?u?(s.deleteToken(),c()):(e.userType=s.decode().userType,e.isLoggedIn=!0):c(),e.$on("$stateChangeStart",function(o,a,n,r,i){var l=null;return p=s.getToken(),u=s.checkExp(),l=a&&a.hasOwnProperty("requireLogin")&&a.data.requireLogin===!0?!0:!1,u&&s.deleteToken(),l!==!0||p?p?e.isLoggedIn=!0:(e.authObjects.facebookConnected&&c(),e.isLoggedIn=!1):(o.preventDefault(),e.authObjects.facebookConnected&&c(),e.isLoggedIn=!1,t.go("Login"))})}]),angular.module("MainApp").constant("WizioConfig",{baseAPIURL:"http://172.16.0.3:4000/api/",modulesURL:"public/app/modules",AuthViewsURL:"public/app/modules/authapp/viewtemplates/",ApplicationViewsURL:"public/app/modules/applicationapp/viewtemplates/",ApplicationFormViewsURL:"public/app/modules/applicationapp/viewtemplates/",BlogViewsURL:"public/app/modules/blogApp/viewtemplates/",BuyerViewsURL:"public/app/modules/AccountApp/viewtemplates/",BuyerDashboardViewsURL:"public/app/modules/AccountApp/dashboard/viewtemplates/",CampaignMainViewsURL:"public/app/modules/CampaignApp/main/",CampaignVideoUploadViewsURL:"public/app/modules/CampaignApp/videouploadapp/viewtemplates/",landingPageAppViewsURL:"public/app/modules/LandingPageApp/viewtemplates/",NavbarViewsURL:"public/app/modules/navbarapp/viewtemplates/",AccountViewsURL:"public/app/modules/AccountApp/main/",AccountDashboardViewsURL:"public/app/modules/AccountApp/dashboardapp/viewtemplates/",AccountAuthViewsURL:"public/app/modules/AccountApp/authapp/viewtemplates/",UnitViewsURL:"public/app/modules/UnitApp/viewtemplates/"}),angular.module("MainApp").config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","WizioConfig",function(e,t,o,a,n){var r={templateUrl:n.NavbarViewsURL+"Navbar.html",controller:"NavbarCtrl"},i={requireLogin:!0},l={requireLogin:!1};e.state("LandingPage",{url:"/",views:{maincontent:{templateUrl:n.landingPageAppViewsURL+"landingpage.html",controller:"LandingPageCtrl"}},data:l}).state("Blog",{"abstract":!0,views:{navbar:r,maincontent:{templateUrl:"public/app/modules/BlogApp/viewtemplates/blogMain.html",controller:"BlogMainCtrl"}},data:l}).state("Blog.List",{url:"/blog",views:{BlogMain:{templateUrl:"public/app/modules/BlogApp/viewtemplates/blogDetail.html",controller:"BlogListCtrl"}}}).state("Blog.Detail",{url:"/blog/:articleUrl",views:{}}).state("About",{url:"/about",views:{navbar:r,maincontent:{templateUrl:"public/app/modules/aboutUsApp/viewtemplates/aboutUs.html",controller:"AboutListCtrl"}},data:l}).state("Styleguide",{url:"/about/styleguide",views:{navbar:r,maincontent:{templateUrl:"public/viewtemplates/public/styleguide.html"}},data:l}).state("Login",{url:"/login",views:{navbar:r,maincontent:{templateUrl:n.AccountAuthViewsURL+"Login.html",controller:"AuthLoginCtrl"}},data:l}).state("SendResetEmail",{url:"/sendresetpassemail",views:{navbar:r,maincontent:{templateUrl:n.AccountAuthViewsURL+"sendResetEmail.html",controller:"AuthLoginCtrl"}},data:l}).state("UpdatePassword",{url:"/resetpassword/:token",views:{navbar:r,maincontent:{templateUrl:n.AccountAuthViewsURL+"resetPassword.html",controller:"AuthLoginCtrl"}},data:l}).state("Account",{url:"/account","abstract":!0,views:{navbar:r,maincontent:{templateUrl:n.AccountViewsURL+"AccountMain.html",controller:"AccountMainCtrl"}},data:i}).state("Account.Dashboard",{"abstract":!0,views:{AccountMain:{templateUrl:n.AccountDashboardViewsURL+"DashboardMain.html",controller:"DashboardMainCtrl"}}}).state("Account.Create",{url:"/create",views:{AccountMain:{templateUrl:n.AccountAuthViewsURL+"/AuthCreateAcctForm.html",controller:"AuthCreateAcctCtrl"}},data:l}).state("Account.Dashboard.Main",{url:"/dashboard",views:{topHorizontal:{templateUrl:n.AccountDashboardViewsURL+"DashboardUserInfo.html",controllerProvider:function(e){return 1==e.userType,"DashboardUserInfoCtrl"}}},data:i}).state("sellerDashboard",{url:"/brokerInfo",views:{navbar:r,maincontent:{templateUrl:"public/viewtemplates/public/brokerAddInfo.html",controller:"brokerAddInfoCtrl"}},data:i}).state("Profile",{url:"/profile","abstract":!0,views:{navbar:r,maincontent:{templateUrl:"public/app/modules/AccountApp/profileapp/viewtemplates/profilemain.html"}},data:i}).state("Profile.",{url:"/",views:{profilepage:{templateUrl:"public/app/modules/AccountApp/profileapp/viewtemplates/profileform.html",controller:"ProfileFormCtrl"}},data:i}).state("Profile.Edit",{url:"/edit",views:{profilepage:{templateUrl:"public/app/modules/AccountApp/profileapp/viewtemplates/profileform.html",controller:"ProfileFormCtrl"}},data:i}).state("Application",{url:"/application",views:{navbar:r,maincontent:{templateUrl:"public/app/modules/applicationapp/applicationmain.html"}},"abstract":!0,data:i}).state("Application.New",{url:"/new",views:{ApplicationPage:{templateUrl:"public/app/modules/applicationapp/applicationformapp/viewtemplates/applicationform.html",controller:"ApplicationFormCtrl"}}}).state("Application.Edit",{url:"/edit",views:{ApplicationPage:{templateUrl:"public/app/modules/applicationapp/applicationformapp/viewtemplates/applicationform.html",controller:"ApplicationFormCtrl"}}}).state("Unit",{url:"/unit",views:{navbar:r,maincontent:{templateUrl:n.UnitViewsURL+"UnitMain.html"}},"abstract":!0}).state("Unit.",{url:"/create",views:{UnitMain:{templateUrl:n.UnitViewsURL+"UnitCreate.html",controller:"UnitCreateCtrl"}}}).state("Unit.Details",{url:"/details/:id",views:{UnitMain:{templateUrl:n.UnitViewsURL+"unitDetailsPage.html",controller:"UnitDetailCtrl"}},data:l}).state("Unit.Display",{url:"/display",views:{UnitMain:{templateUrl:n.UnitViewsURL+"unitDisplay.html",controller:"UnitDisplayCtrl"}}}).state("Campaign",{url:"/campaign","abstract":!0,views:{navbar:r,maincontent:{templateUrl:n.CampaignMainViewsURL+"CampaignMain.html",controller:"CampaignMainCtrl"}}}).state("Campaign.VideoUpload",{"abstract":!0,views:{CampaignMain:{templateUrl:n.CampaignVideoUploadViewsURL+"/VideoUploadMain.html",controller:"VideoUploadMainCtrl"}}}).state("Campaign.VideoUpload.Main",{url:"/apartmentshare",views:{MainContent1:{templateUrl:n.CampaignVideoUploadViewsURL+"/VideoUploadSplash.html",controller:"VideoUploadSplashCtrl"}}}).state("Campaign.VideoUpload.Form",{url:"/form",views:{VideoUploadMain:{templateUrl:n.CampaignVideoUploadViewsURL+"/VideoUploadForm.html",controller:"VideoUploadFormCtrl"}}}),t.otherwise("/"),a.interceptors.push(["$q","$location","$localStorage","$injector","TokenSvc",function(e,t,o,a,n){return{request:function(e){return e.headers=e.headers||{},e.headers.searchCheck?(delete e.headers.searchCheck,e):(n.getToken()&&(e.headers.Authorization=n.getToken()),e)},response:function(e){return e.data.token?(n.storeToken(e.data.token),e):e},responseError:function(t){return 401!==t.status&&403!==t.status||(n.deleteToken(),!t.data.facebook)?(a.get("$state").transitionTo("Login"),e.reject(t)):e.reject(t)}}}])}]),angular.module("AmazonS3UploadApp").controller("AmazonS3UploadCtrl",["$scope","$http","$state",function(e,t,o){e.sizeLimit=5368709120,e.uploadProgress=0,e.creds={},e.upload=function(){AWS.config.update({accessKeyId:"AKIAIPGWV5OFR73P3VLQ",secretAccessKey:"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"}),AWS.config.region="us-east-1";var t=new AWS.S3({params:{Bucket:"wiziouservideos"}});if(e.file){var o=Math.round(parseInt(e.file.size));if(o>e.sizeLimit)return toastr.error("Sorry, your attachment is too big. <br/> Maximum "+e.fileSizeLabel()+" file attachment allowed","File Too Large"),!1;var a=e.uniqueString()+"-"+e.file.name,n={Key:a,ContentType:e.file.type,Body:e.file,ServerSideEncryption:"AES256"};t.putObject(n,function(t,o){return t?(toastr.error(t.message,t.code),!1):(toastr.success("File Uploaded Successfully","Done"),void setTimeout(function(){e.uploadProgress=0,e.$digest()},1e4))}).on("httpUploadProgress",function(t){e.uploadProgress=Math.round(t.loaded/t.total*100),e.$digest()})}else toastr.error("Please select a file to upload")},e.fileSizeLabel=function(){return Math.round(e.sizeLimit/1073741824)+"GB"},e.uniqueString=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=0;8>o;o++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}}]),angular.module("AmazonS3UploadApp").directive("file",function(){return{restrict:"AE",scope:{file:"@"},link:function(e,t,o){t.bind("change",function(t){var o=t.target.files,a=o[0];e.file=a,e.$parent.file=a,e.$apply()})}}}),angular.module("UnitApp").factory("UnitResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"apartment/:id",{id:"@id"})}]),angular.module("UnitApp").service("UnitCreateSvc",["lodash","FlexGetSetSvc",function(e,t){function o(t,o){var a=e.filter(o.data.results,function(e){return e.formatted_address===t});switch(0===a.length&&(a=e.filter(o.data.results,function(e){return e["formatted address"]===t})),a.length){case 0:return!1;default:return a}}function a(e){return"undefined"!=typeof e[0].long_name?e[0].long_name:"undefined"!=typeof e[0].short_name?e[0].short_name:"na"}function n(t,o){var n={};if(n.topLevelType=t[0].types[0],o)for(var r in o)n[r]=o[r];var i=t[0].address_components;n.formattedAddress=t[0].formatted_address;var l=e.filter(i,function(e){return"street_number"===e.types[0]}),s=e.filter(i,function(e){return"route"===e.types[0]}),c=e.filter(i,function(e){return"locality"===e.types[0]}),u=e.filter(i,function(e){return"administrative_area_level_3"===e.types[0]}),p=(e.filter(i,function(e){return"administrative_area_level_1"===e.types[0]}),e.filter(i,function(e){return"postal_code"===e.types[0]})),d=e.filter(i,function(e){return"neighborhood"===e.types[0]});l.length>0&&s.length>0&&(n.street=a(l)+" "+a(s)),d.length>0&&(n.neighborhood=a(d)),c.length>0&&(n.locality=a(c)),u.length>0&&(n.administrative_area_level_3=a(u)),p.length>0&&(n.zip=a(p));var m=null,g=null,f=null;return t[0].geometry.hasOwnProperty("location")?m=e.values(t[0].geometry.location):t[0].geometry.hasOwnProperty("viewport")&&(t[0].geometry.viewport.hasOwnProperty("northeast")?m=e.values(t[0].geometry.viewport.northeast):t[0].geometry.viewport.hasOwnProperty("northwest")?m=e.values(t[0].geometry.viewport.northwest):t[0].geometry.viewport.hasOwnProperty("southeast")?m=e.values(t[0].geometry.viewport.southeast):t[0].geometry.viewport.hasOwnProperty("southwest")&&(m=e.values(t[0].geometry.viewport.southwest))),("string"==typeof m[0]||"number"==typeof m[0])&&(g=parseFloat(m[0].toFixed(6)),n.latitude=g),("string"==typeof m[1]||"number"==typeof m[1])&&(f=parseFloat(m[1].toFixed(6)),n.longitude=f),n}var r=function(e,t){var o=new google.maps.Geocoder;o.geocode({address:e},function(e,o){return o==google.maps.GeocoderStatus.OK?t(null,e):t({message:"No Google API Address found"},null)})},i=function(o,a){var n=null,r=(t.get(),e.values(googleAPIDataRaw.data.results.types));return 1===r.length?(n=r[0],a(n)):a(n)},l=function(e,a,i){var l=t.get(),s=!1;if(0!==l.length&&(s=o(e,l)),s!==!1){var c=n(s,a);return i(null,c)}r(e,function(e,t){var o=n(t,a);return i(null,o)})};return{getGeocodeData:r,addressSearchType:i,parseGeocodeData:l}}]),angular.module("AccountApp").controller("AccountMainCtrl",["$scope",function(e){}]),angular.module("CampaignApp").controller("CampaignMainCtrl",["$scope",function(e){}]),angular.module("UnitApp").controller("UnitCreateCtrl",["$scope","$sessionStorage","$rootScope","$state","lodash","UnitResource","SmartSearchSvc","UnitCreateSvc","FlexGetSetSvc",function(e,t,o,a,n,r,i,l,s){e.$storage=t,e.numBeds=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],e.getLocation=function(e){return i.smartSearch(e)},e.addUnit=function(){var t=e.apartmentAddress,o={beds:e.beds,baths:e.baths,livingSpaces:e.livingRooms,maxResidency:e.maxResidency,costPerMonth:e.costPerMonth,renovated:e.renovated,pets:e.petPolicy,youtubeVRID:e.youtubeVRID};l.parseGeocodeData(t,o,function(e,t){r.save(t,function(e,t){a.go("Account.Dashboard.Main")})})}}]),angular.module("UnitApp").controller("UnitDetailCtrl",["$scope","$state","$stateParams","$sessionStorage","$modal","lodash","ApartmentGetSetSvc","UnitResource","AuthFct","MapFct","TokenSvc","ProfileResource","FlexGetSetSvc",function(e,t,o,a,n,r,i,l,s,c,u,p,d){var m=function(e,t,o){var a=n.open({templateUrl:e,controller:t,size:o});return a};i.checkApartment(function(t){e.apartment=t;var o=c.makeMap();e.map=new google.maps.Map(document.getElementById("map"),o);c.makeMarkers(e.map)}),e.apply=function(){if(u.checkExp())return u.deleteToken(),t.go("Login");var o=u.decode();if(i.set(e.apartment,"apartmentApplyingTo"),null===o.ProfileId){var a=m("public/viewtemplates/public/createprofilemodal.html","ProfileCreateModalCtrl","md");a.result.then(function(e){t.go("Profile.Create")},function(){})}else p.get({id:o.ProfileId},function(e){if(e){var o=m("public/app/modules/AccountApp/profileapp/viewtemplates/profileexistsmodal.html","ProfileExistsModalCtrl","lg");o.result.then(function(o){switch(o){case"ok":t.go("ApartmentApplication");break;case"edit":d.set(e),t.go("Profile.Edit")}},function(){})}})}}]),angular.module("UnitApp").controller("UnitDisplayCtrl",["$scope","$sessionStorage","$state","lodash","ApartmentGetSetSvc","MapFct",function(e,t,o,a,n,r){function i(){var t=r.makeMap();e.map=new google.maps.Map(document.getElementById("map"),t);r.makeMarkers(e.map);e.openInfoWindow=function(e,t){e.preventDefault(),google.maps.event.trigger(t,"click")}}e.sessionStorage=t,e.apartmentSearch=t.apartmentSearch,0===e.apartmentSearch.length,e.mapshow=!0,i(),e.tabToggle=function(){e.mapshow=!e.mapshow},e.$on("searchFinished",function(t,o){e.apartmentSearch=o,i()}),e.apartmentSelected=function(t){var r=a.find(e.apartmentSearch,{id:t});void 0!==r&&(n.set(r,"apartmentSelected"),o.go("Unit.Details",{id:t}))}}]),angular.module("LandingPageApp").controller("LandingPageCtrl",["$scope","$http","$state","UserRegistrationSvc","ApartmentSearchSvc","SmartSearchSvc","UnitCreateSvc",function(e,t,o,a,n,r,i){e.radioModel={realtor:!1,tenant:!0,broker:!1},e.neighborhoods=["Boston","Allston","Brighton","Jamaica Plain","Back Bay","Beacon Hill"],e.localeButtonClick=function(e){n.searchApartment(e,function(e,t){return o.go("Unit.Display")})},e.goToUploadPage=function(){o.go("Campaign.VideoUpload.Main")},e.search=function(){n.searchApartment(e.searchString,function(e,t){return o.go("Unit.Display")})},e.getLocation=function(e){return r.smartSearch(e)},e.registerUser=function(){var t={firstName:e.firstName,lastName:e.lastName,email:e.email,password:e.password,accountType:"local"};a.saveUser(t,function(e){o.go("Account.Dashboard.Main")})},e.sizeLimit=5368709120,e.uploadProgress=0,e.creds={},e.upload=function(){AWS.config.update({accessKeyId:"AKIAIPGWV5OFR73P3VLQ",secretAccessKey:"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"}),AWS.config.region="us-east-1";var t=new AWS.S3({params:{Bucket:"wiziouservideos"}});if(e.file){var o=Math.round(parseInt(e.file.size));if(o>e.sizeLimit)return toastr.error("Sorry, your attachment is too big. <br/> Maximum "+e.fileSizeLabel()+" file attachment allowed","File Too Large"),!1;var a=e.uniqueString()+"-"+e.file.name,n={Key:a,ContentType:e.file.type,Body:e.file,ServerSideEncryption:"AES256"};t.putObject(n,function(t,o){return t?(toastr.error(t.message,t.code),!1):(toastr.success("File Uploaded Successfully","Done"),void setTimeout(function(){e.uploadProgress=0,e.$digest()},1e4))}).on("httpUploadProgress",function(t){e.uploadProgress=Math.round(t.loaded/t.total*100),e.$digest()})}else toastr.error("Please select a file to upload")},e.fileSizeLabel=function(){return Math.round(e.sizeLimit/1073741824)+"GB"},e.uniqueString=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=0;8>o;o++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}}]),angular.module("ApplicationApp").factory("ApplicationResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"application")}]),angular.module("AboutUsApp").controller("AboutListCtrl",["$scope",function(e){e.members=[{name:"Chris Canal",title:"CEO",picture:"radish.png",twitter:"chriscanal4",linkedin:"chriscanal"},{name:"Cameron Billings",title:"CTO",picture:"radish.png",twitter:"CamBillings_",linkedin:"cameronbillings"},{name:"Devon Billings",title:"COO/CMO",picture:"radish.png",twitter:"dsgrod",linkedin:"dsgrod"},{name:"Trent Duffy",title:"CMS-Cheif of Misc Stuff",picture:"radish.png",twitter:"trentolol",linkedin:"trentduffy"}]}]),angular.module("AboutUsApp").controller("AboutUsCtrl",["$scope",function(e){}]),angular.module("BlogApp").controller("BlogListCtrl",["$scope",function(e){e.articles=[{title:"Local Landlord Shocked to Find Lack of Interest in Apartment",intro:"Sam explained to the Wizio staff-writers that he remains hopeful that his new, candid apartment listing will help him to find a good tenant match.",author:"The Radish",authorPicture:"radish.png",images:["post1_img1.jpg","post1_img2.jpg"]},{title:"Local Landlord Shocked to Find Lack of Interest in Apartment",intro:"Sam explained to the Wizio staff-writers that he remains hopeful that his new, candid apartment listing will help him to find a good tenant match.",author:"The Radish",authorPicture:"radish.png",images:["post1_img1.jpg","post1_img2.jpg"]}]}]),angular.module("BlogApp").controller("BlogMainCtrl",["$scope",function(e){}]),angular.module("NavbarApp").controller("NavbarCtrl",["$rootScope","$scope","$state","$http","ApartmentSearchSvc","AuthFct","SmartSearchSvc",function(e,t,o,a,n,r,i){t.goToLogin=function(){o.go("Login")},t.search=function(){n.searchApartment(t.searchString),o.go("Unit.Display")},t.getLocation=function(e){return i.smartSearch(e)},t.logout=function(e){r.logout()},t.getLocation=function(e){return i.smartSearch(e)},t.createUnit=function(){o.go("Unit.Create")},t.goHome=function(){o.go("LandingPage")},t.goAbout=function(){o.go("About")},t.goBlog=function(e){o.go("Blog.List")},t.goAccoutCreate=function(){o.go("Account.Create")},t.goAccountDashboard=function(){o.go("Account.Dashboard.Main")}}]),angular.module("SharedFactoryApp").factory("GeocoderFct",["$q",function(e){var t=function(t){var o=e.defer(),a=new google.maps.Geocoder;return a.geocode({address:t},function(e,t){t===google.maps.GeocoderStatus.OK&&o.resolve(e[0].geometry.location)}),o.promise};return{getLatLong:t}}]).factory("MapFct",["ApartmentGetSetSvc","$sessionStorage","$stateParams","$state",function(e,t,o,a){var n=function(){var t={zoom:12,center:new google.maps.LatLng(42.3601,-71.0589),mapTypeId:google.maps.MapTypeId.ROADMAP},o=function(e){if(e.constructor!==Array&&(e=[e]),0===e.length)return t;var o=null,a=null;for(i=0;i<e.length;i++)o+=e[i].latitude,a+=e[i].longitude;return o/=e.length,a/=e.length,t={zoom:12,center:new google.maps.LatLng(o,a),mapTypeId:google.maps.MapTypeId.ROADMAP}},n=null;return"Unit.Details"===a.current.name?n=e.get("apartmentSelected"):"Unit.Display"===a.current.name&&(n=e.get("apartmentSearch")),o(n)},r=function(t){function o(e){var o=new google.maps.Marker({map:t,position:new google.maps.LatLng(e.latitude,e.longitude),title:e.street});o.content='<div class="infoWindowContent">'+e.neighborhood+"</div>";var a=new google.maps.InfoWindow;google.maps.event.addListener(o,"click",function(){a.setContent("<h2>"+o.title+"</h2>"+o.content),a.open(t,o)}),n.push(o)}var n=[],r=null;"Unit.Details"===a.current.name?r=e.get("apartmentSelected"):"Unit.Display"===a.current.name&&(r=e.get("apartmentSearch"));var l=function(e){for(Array.isArray(e)||(e=[e]),i=0;i<e.length;i++)o(e[i]);return n};return l(r)};return{makeMap:n,makeMarkers:r}}]),angular.module("SharedFactoryApp").factory("SearchResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"search/",{},{save:{method:"POST",isArray:!0}})}]),angular.module("SharedServiceApp").service("ApartmentSearchSvc",["$rootScope","$sessionStorage","SearchResource","UnitCreateSvc",function(e,t,o,a){function n(n,r){a.parseGeocodeData(n,null,function(a,n){o.save(n,function(o,a){return e.$broadcast("searchFinished",o),t.apartmentSearch=o,r(null,o)})})}return{searchApartment:n}}]).service("UserRegistrationSvc",["$state","AuthRegistrationResource",function(e,t){function o(e,o){t.save(e,function(e){o(e)})}return{saveUser:o}}]).service("TokenSvc",["$localStorage","jwtHelper",function(e,t){var o=function(o){return o?t.decodeToken(o):t.decodeToken(e.token)},a=function(o){return o?t.isTokenExpired(o):e.token?t.isTokenExpired(e.token):!0},n=function(t){return t?(e.token=t,!0):!1},r=function(){return e.token?e.token:!1},i=function(){return e.token?(delete e.token,!0):!1};return{decode:o,checkExp:a,storeToken:n,getToken:r,deleteToken:i}}]).service("SmartSearchSvc",["$http","FlexGetSetSvc",function(e,t){var o=function(o){return e.get("//maps.googleapis.com/maps/api/geocode/json",{headers:{searchCheck:!0},params:{address:o,sensor:!1,components:"country:US|administrative_area:MA"}}).then(function(e){return t.set(e),e.data.results.map(function(e){return e.formatted_address})})};return{smartSearch:o}}]),angular.module("AccountApp").controller("AuthCreateAcctCtrl",["$scope","$state","$facebook","UserRegistrationSvc",function(e,t,o,a){e.setUserObj=function(){var o={firstName:e.firstName,lastName:e.lastName,email:e.email,password:e.password,accountType:"local"};a.saveUser(o,function(e){t.go("Account.Dashboard.Main")})},e.createFacebookUser=function(){o.login().then(function(e){switch(e.status){case"connected":o.api("/me").then(function(e){e.accountType="facebook",a.saveUser(e,function(e){t.go("Account.Dashboard.Main")})});break;case"not_authorized":}})},e.cancel=function(){t.go("Home")}}]),angular.module("AccountApp").controller("AuthCreateAcctModalCtrl",["$scope","$state","$modalInstance","UserRegistrationSvc",function(e,t,o,a){e.setUserObject=function(){var t={firstName:e.firstName,lastName:e.lastName,email:e.email,password:e.password};a.saveUser(t,function(e){o.close("ok")})},e.cancel=function(){"Campaign.VideoUpload.Main"===t.current.name?o.dismiss():t.go("Home")}}]),angular.module("AccountApp").controller("AuthCreateModalCtrl",["$scope","$modalInstance","$state",function(e,t,o){e.ok=function(){t.close("ok")},e.cancel=function(){t.dismiss("cancel")}}]),angular.module("AccountApp").controller("AuthLoginCtrl",["$rootScope","$scope","$state","$localStorage","$stateParams","$facebook","AuthFct","AuthResetPasswordResource","AuthUpdatePasswordResource","TokenSvc",function(e,t,o,a,n,r,i,l,s,c){t.facebookLogin=function(){return e.authObjects.facebookConnected?o.go("Account.Dashboard"):void r.login().then(function(t){"connected"===t.status&&r.api("/me").then(function(t){var o={user:t,facebook:!0};i.signup(o,function(t,o){return 403===o?void(e.isLoggedIn=!1):void(e.isLoggedIn=!0)})})})},t.sendResetEmail=function(){var e={};e.email=t.email,l.save(null,e,function(e,t){o.go("Home")},function(e){})},t.resetPassword=function(){if(t.password===t.passwordConfirm){var e={};e.password=t.password,e.token=n.token,s.save(e,function(e,t){o.go("login")},function(e){o.go("login")})}else t.password="",t.passwordConfirm=""},t.requestLogin=function(){var a={email:t.email,password:t.password};i.signin(a,function(t){e.isLoggedIn=!0,o.go("Account.Dashboard.Main")},function(){e.error="Failed to sign in!",o.go("Login")})}}]),angular.module("AuthApp").factory("AuthFct",["$state","$localStorage","$http","$rootScope","AuthRegistrationResource","AuthLoginResource","TokenSvc",function(e,t,o,a,n,r,i){var l=function(){var e=i.getToken(),t=i.checkExp(e);return e&&!t?!0:!1};return{signup:function(e,t,o){n.save(null,e,function(e,o){t(o)})},signin:function(e,t,o){r.save(e,function(e,o){t(e,o)})},logout:function(o){tokenClaims={},delete t.token,a.isLoggedIn=!1,e.go("LandingPage")},isLoggedin:l}}]),angular.module("AuthApp").factory("AuthLoginResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"user/authenticate")}]).factory("AuthResetPasswordResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"user/forgotpassword")}]).factory("AuthUpdatePasswordResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"user/updatepassword")}]).factory("AuthRegistrationResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"user/registration")}]),angular.module("AccountApp").service("AuthCreateUserSvc",[function(){var e=function(e,t){return e={firstName:e.firstName,lastName:e.lastName,email:e.email,password:e.password},"tenant"===t.usertype?e.userType=1:"realtor"===t.usertype?e.userType=2:"broker"===t.usertype&&(e.userType=3),e};return{CreateUser:e}}]),angular.module("AccountApp").controller("DashboardMainCtrl",["$scope","$timeout","TokenSvc",function(e,t,o){var a=o.decode();t(function(){e.$broadcast("AccountInfoBroadcast",a)})}]),angular.module("AccountApp").controller("DashboardUserInfoCtrl",["$scope",function(e){e.$on("AccountInfoBroadcast",function(t,o){e.accountInfo=o})}]),angular.module("AccountApp").factory("AssignmentResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"assignment")}]),angular.module("AccountApp").controller("ProfileCreateModalCtrl",["$scope","$modalInstance","$state",function(e,t,o){e.ok=function(){t.close("ok")},e.cancel=function(){t.dismiss("cancel")}}]),angular.module("SellerApp").controller("ProfileExistsModalCtrl",["$scope","$modalInstance","$state","ProfileResource","AuthFct","FlexGetSetSvc",function(e,t,o,a,n,r){e.ok=function(){t.close("ok")},e.edit=function(){t.close("edit")},e.cancel=function(){t.dismiss("cancel")}}]),angular.module("AccountApp").controller("ProfileFormCtrl",["$scope","$modal","$state","ApartmentGetSetSvc","AuthFct","ProfileResource","ApplicationResource","TokenSvc","FlexGetSetSvc",function(e,t,o,a,n,r,i,l,s){e.apartment=a.get("apartmentApplyingTo");var c=e.apartment;e.profile=s.get();var u=l.decode();e.apply=function(){var a=o.current.name,n={UserID:u.id,annualIncome:e.annualIncome,currentEmployer1:e.currentEmployer1,currentEmployerLOE1:e.currentEmployerLOE1,currentEmployerPosition1:e.currentEmployerPosition1,currentEmployer2:e.currentEmployer2,currentEmployerLOE2:e.currentEmployerLOE2,currentEmployerPosition2:e.currentEmployerPosition2,previousEmployer1:e.previousEmployer1,previousEmployerLOE1:e.previousEmployerLOE1,previousEmployerPosition1:e.previousEmployerPosition1,previousEmployer2:e.previousEmployer2,previousEmployerLOE2:e.previousEmployerLOE2,previousEmployerPosition2:e.previousEmployerPosition2,creditScore:e.creditScore,pets:e.pets,petType:e.petType,age:e.age,maritalStatus:e.maritalStatus,emergencyContact:e.emergencyContact,phoneNumber:e.phoneNumber,socialSecurityNumber:e.socialSecurityNumber,currentBank:e.currentBank,currentTenancyAddress:e.currentTenancyAddress,currentPM:e.currentPM,currentPMContact:e.currentPMContact,previousTenancyAddress:e.previousTenancyAddress,previousPM:e.previousPM,previousPMContact:e.previousPMContact,employmentStatus:e.employmentStatus,desiredMoveInDate:e.desiredMoveInDate};if("Profile.Edit"===a)e.profile=s.get();else if("Profile.Create"===a){e.appicationEmails=[];var i=t.open({templateUrl:"public/app/modules/AccountApp/profileapp/viewtemplates/profilesavemodal.html",controller:"ProfileSaveModalCtrl",size:"md",resolve:{apartment:function(){return c}}});i.result.then(function(e){"saveAndApply"===e?r.save(n,function(e,t){o.go("Application.New")}):"save"===e&&r.save(n,function(e,t){})},function(){})}}}]),angular.module("AccountApp").controller("ProfileSaveModalCtrl",["$scope","$modalInstance","$state","apartment",function(e,t,o,a){e.apartment=a,e.ok=function(){t.close("saveAndApply")},e.save=function(){t.close("save")},e.cancel=function(){t.dismiss("cancel")}}]),angular.module("SellerApp").factory("ProfileResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"profile/:id",{id:"@id"})}]),angular.module("CampaignApp").controller("VideoUploadMainCtrl",["$scope",function(e){e.$on("ViewTemplatesSelector",function(t,o){e.viewtemplates=o})}]),angular.module("CampaignApp").controller("VideoUploadModalCtrl",["$scope","$modalInstance","SmartSearchSvc","UnitResource","UnitCreateSvc","TokenSvc","AssignmentResource",function(e,t,o,a,n,r,i){e.getLocation=function(e){return o.smartSearch(e)};var l=e.apartmentAddress;e.sizeLimit=5368709120,e.uploadProgress=0,e.creds={},e.upload=function(){n.parseGeocodeData(l,null,function(o,n){a.save(n,function(o,a){var n=o;AWS.config.update({accessKeyId:"AKIAIPGWV5OFR73P3VLQ",secretAccessKey:"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"}),AWS.config.region="us-east-1";var l=new AWS.S3({params:{Bucket:"wiziouservideos"}});if(e.file){var s=Math.round(parseInt(e.file.size));if(s>e.sizeLimit)return toastr.error("Sorry, your attachment is too big. <br/> Maximum "+e.fileSizeLabel()+" file attachment allowed","File Too Large"),!1;var c=r.decode(),u=e.apartmentAddress;u=u.replace(/[^0-9a-zA-Z]/g,"");var p=c.email+"-"+u,d={Key:p,ContentType:e.file.type,Body:e.file,ServerSideEncryption:"AES256"};l.putObject(d,function(o,a){if(o)return toastr.error(o.message,o.code),t.dismiss(),!1;toastr.success("File Uploaded Successfully","Done");var r={email:c.email,apartmentID:n.id,S3VideoID:p};i.save(r,function(e,t){}),setTimeout(function(){e.uploadProgress=0,e.$digest()},1e4),t.close("ok")}).on("httpUploadProgress",function(t){e.uploadProgress=Math.round(t.loaded/t.total*100),e.$digest()})}else toastr.error("Please select a file to upload")})})},e.fileSizeLabel=function(){return Math.round(e.sizeLimit/1073741824)+"GB"},e.uniqueString=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",o=0;8>o;o++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}}]),angular.module("CampaignApp").controller("VideoUploadSplashCtrl",["$scope","$state","$modal","WizioConfig","AuthFct",function(e,t,o,a,n){var r={topHorizontal1:!0,topHorizontal2:!0,mainContent1:!1,mainContent2:!0,bottomHorizontal:!0};e.$emit("ViewTemplatesSelector",r);var i=function(e,t,a){var n=o.open({templateUrl:e,controller:t,size:a});return n};e.uploadVideo=function(){if(n.isLoggedin()){var e=i(a.CampaignVideoUploadViewsURL+"VideoUploadModal.html","VideoUploadModalCtrl","md");e.result.then(function(e){},function(){})}else{var t=i(a.AccountAuthViewsURL+"AuthCreateAcctForm.html","AuthCreateAcctModalCtrl","md");t.result.then(function(e){if("ok"===e){var t=i(a.CampaignVideoUploadViewsURL+"VideoUploadModal.html","VideoUploadModalCtrl","md");t.result.then(function(e){},function(){})}},function(){})}}}]),angular.module("CampaignApp").service("AWSS3UploadSvc",[function(){}]),angular.module("ApplicationApp").controller("ApplicationFormCtrl",[$scope,function(e){}]),
angular.module("SellerApp").controller("dashAccountAppliedCtrl",["$scope",function(e){}]),angular.module("SellerApp").controller("dashAptPostedCtrl",["$scope",function(e){}]),angular.module("SellerApp").controller("dashSellerInfoCtrl.js",["$scope",function(e){e.$on("AccountInfoBroadcast",function(t,o){e.accountInfo=o})}]),angular.module("SharedServiceApp").service("ApartmentGetSetSvc",["$sessionStorage","$stateParams","UnitResource","lodash",function(e,t,o,a){var n=null,r=[],i=function(t,o){o&&(e[o]=t,-1===a.indexOf(r,o)&&r.push(o)),n=t},l=function(a){return a?n=e[a]:null!==n&&n.id===t.id?n:void o.get({id:apartmentURLID},function(e){n=e,callback(n)})},s=function(){n=null},c=function(a){var r=t.id,i=n,l=null;e.apartmentSelected&&(l=e.apartmentSelected.id),null!==i&&i.id===r&&l===r?a(i):l==r?(n=e.apartmentSelected,a(n)):o.get({id:r},function(e){n=e,a(n)})};return{set:i,get:l,reset:s,checkApartment:c}}]),angular.module("SharedServiceApp").service("FlexGetSetSvc",["$sessionStorage","$sessionStorage",function(e,t){var o=[],a=function(t,a){return a?(e[a]=t,o=[],void o.push(t)):(o=[],void o.push(t))},n=function(t){return t?e[t]:0===o.length?[]:o[0]},r=function(t){return t?(delete e[t],void(o=[])):void(o=[])};return{set:a,get:n,reset:r}}]);