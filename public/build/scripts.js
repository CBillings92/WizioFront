angular.module("AboutUsApp",[]),angular.module("AdminPanelApp",[]),angular.module("AccountApp",[]),angular.module("AmazonS3UploadApp",[]),angular.module("ApplicationApp",[]),angular.module("AuthApp",[]),angular.module("BlogApp",[]),angular.module("CampaignApp",[]),angular.module("LandingPageApp",[]),angular.module("NavbarApp",[]),angular.module("SellerApp",[]),angular.module("SharedControllersApp",[]),angular.module("SharedFactoryApp",[]),angular.module("SharedServiceApp",[]),angular.module("UnitApp",[]),angular.module("MainApp",["AdminPanelApp","AccountApp","AmazonS3UploadApp","ApplicationApp","AuthApp","AboutUsApp","BlogApp","LandingPageApp","CampaignApp","NavbarApp","SellerApp","SharedControllersApp","SharedFactoryApp","SharedServiceApp","UnitApp","ui.router","ngFacebook","ngStorage","ngResource","ngLodash","ui.bootstrap","angular-jwt"]).config(function(e){e.setAppId("439701646205204")}).run(["$rootScope","$state","$http","$localStorage","$window","$facebook","jwtHelper","AuthFct","TokenSvc",function(e,t,n,o,a,r,i,l,s){function c(){r.getLoginStatus().then(function(t){switch(t.status){case"not authorized":e.isLoggedIn=!1,e.authObjects.facebookConnected=!1;break;case"connected":e.authObjects.facebookConnected=!0,r.api("/me").then(function(n){var o={user:n,fbLoginStatus:t,facebook:!0};l.signin(o,function(t,n){return 403===n?void(e.isLoggedIn=!1):void(e.isLoggedIn=!0)})});break;default:e.isLoggedIn=!1,e.authObjects.facebookConnected=!1}})}!function(e,t,n){var o,a=e.getElementsByTagName(t)[0];e.getElementById(n)||(o=e.createElement(t),o.id=n,o.src="//connect.facebook.net/en_US/sdk.js",a.parentNode.insertBefore(o,a))}(document,"script","facebook-jssdk"),e.authObjects={facebookConnected:!1};var u=s.checkExp(),p=s.getToken();"No Token"===p?c():u?(s.deleteToken(),c()):(e.userType=s.decode().userType,e.isLoggedIn=!0),e.$on("$stateChangeStart",function(t,n,o,a,r){function i(){consoe.dir("why"),e.authObjects.facebookConnected===!0&&c()}function l(){return n&&n.data.requireLogin===!0?(p=!0,void(d=n.data.userType)):void(p=!1)}function u(){s.checkExp()&&s.deleteToken()}var p=null,d=null;l(),u();var m=s.getToken(),g=s.decode();if(p===!0)switch(m){case"No Token":t.preventDefault(),i();break;default:return e.isLoggedIn=!0,g.userType===d||0===g.userType?void 0:void t.preventDefault()}})}]),angular.module("MainApp").constant("WizioConfig",{baseAPIURL:"http://172.16.0.3:4000/api/",modulesURL:"public/app/modules",AdminPanelAppMainViewsURL:"public/app/modules/AdminPanelApp/main/",AdminPanelAppViewsURL:"public/app/modules/AdminPanelApp/viewtemplates/",AuthViewsURL:"public/app/modules/authapp/viewtemplates/",ApplicationViewsURL:"public/app/modules/ApplicationApp/Main/",ApplicationFormViewsURL:"public/app/modules/ApplicationApp/ApplicationFormApp/viewtemplates",ApplicationWaitlistViewsURL:"public/app/modules/ApplicationApp/WaitlistApp/viewtemplates/",BlogViewsURL:"public/app/modules/blogApp/viewtemplates/",BuyerViewsURL:"public/app/modules/AccountApp/viewtemplates/",BuyerDashboardViewsURL:"public/app/modules/AccountApp/dashboard/viewtemplates/",CampaignMainViewsURL:"public/app/modules/CampaignApp/main/",CampaignVideoUploadViewsURL:"public/app/modules/CampaignApp/videouploadapp/viewtemplates/",landingPageAppViewsURL:"public/app/modules/LandingPageApp/viewtemplates/",NavbarViewsURL:"public/app/modules/navbarapp/viewtemplates/",AccountViewsURL:"public/app/modules/AccountApp/main/",AccountDashboardViewsURL:"public/app/modules/AccountApp/dashboardapp/viewtemplates/",AccountAuthViewsURL:"public/app/modules/AccountApp/authapp/viewtemplates/",UnitViewsURL:"public/app/modules/UnitApp/viewtemplates/"}),angular.module("MainApp").config(["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","WizioConfig",function(e,t,n,o,a){var r={templateUrl:a.NavbarViewsURL+"Navbar.html",controller:"NavbarCtrl"},i={requireLogin:!0,userType:1},l={requireLogin:!1};e.state("LandingPage",{url:"/",views:{maincontent:{templateUrl:a.landingPageAppViewsURL+"landingpage.html",controller:"LandingPageCtrl"}},data:l}).state("Blog",{"abstract":!0,views:{navbar:r,maincontent:{templateUrl:"public/app/modules/BlogApp/viewtemplates/blogMain.html",controller:"BlogMainCtrl"}},data:l}).state("Blog.List",{url:"/blog",views:{BlogMain:{templateUrl:"public/app/modules/BlogApp/viewtemplates/blogDetail.html",controller:"BlogListCtrl"}}}).state("Blog.Detail",{url:"/blog/:articleUrl",views:{}}).state("About",{url:"/about",views:{navbar:r,maincontent:{templateUrl:"public/app/modules/aboutUsApp/viewtemplates/aboutUs.html",controller:"AboutListCtrl"}},data:l}).state("AdminPanel",{"abstract":!0,views:{navbar:r,maincontent:{templateUrl:a.AdminPanelAppMainViewsURL+"AdminPanelMain.html",controller:"AdminPanelMainCtrl"}},data:{requireLogin:!0,userType:0}}).state("AdminPanel.Main",{url:"/wizioadminpanel",views:{AdminTop:{templateUrl:a.AdminPanelAppViewsURL+"AdminSearchUnit.html",controller:"AdminSearchUnitCtrl"},AdminLeft:{templateUrl:a.AdminPanelAppViewsURL+"AdminUpdateUnit.html",controller:"AdminUpdateUnitCtrl"},AdminRight:{templateUrl:a.AdminPanelAppViewsURL+"AdminUpdateAssignment.html",controller:"AdminUpdateAssignmentCtrl"}}}).state("Styleguide",{url:"/about/styleguide",views:{navbar:r,maincontent:{templateUrl:"public/viewtemplates/public/styleguide.html"}},data:l}).state("Login",{url:"/login",views:{navbar:r,maincontent:{templateUrl:a.AccountAuthViewsURL+"Login.html",controller:"AuthLoginCtrl"}},data:l}).state("SendResetEmail",{url:"/sendresetpassemail",views:{navbar:r,maincontent:{templateUrl:a.AccountAuthViewsURL+"sendResetEmail.html",controller:"AuthLoginCtrl"}},data:l}).state("UpdatePassword",{url:"/resetpassword/:token",views:{navbar:r,maincontent:{templateUrl:a.AccountAuthViewsURL+"resetPassword.html",controller:"AuthLoginCtrl"}},data:l}).state("Account",{url:"/account","abstract":!0,views:{navbar:r,maincontent:{templateUrl:a.AccountViewsURL+"AccountMain.html",controller:"AccountMainCtrl"}},data:i}).state("Account.Dashboard",{"abstract":!0,views:{AccountMain:{templateUrl:a.AccountDashboardViewsURL+"DashboardMain.html",controller:"DashboardMainCtrl"}}}).state("Account.Create",{url:"/create",views:{AccountMain:{templateUrl:a.AccountAuthViewsURL+"/AuthCreateAcctForm.html",controller:"AuthCreateAcctCtrl"}},data:l}).state("Account.Dashboard.Main",{url:"/dashboard",views:{topHorizontal:{templateUrl:a.AccountDashboardViewsURL+"DashboardUserInfo.html",controllerProvider:function(e){return 1==e.userType,"DashboardUserInfoCtrl"}}},data:i}).state("sellerDashboard",{url:"/brokerInfo",views:{navbar:r,maincontent:{templateUrl:"public/viewtemplates/public/brokerAddInfo.html",controller:"brokerAddInfoCtrl"}},data:i}).state("Profile",{url:"/profile","abstract":!0,views:{navbar:r,maincontent:{templateUrl:"public/app/modules/AccountApp/profileapp/viewtemplates/profilemain.html"}},data:i}).state("Profile.",{url:"/",views:{profilepage:{templateUrl:"public/app/modules/AccountApp/profileapp/viewtemplates/profileform.html",controller:"ProfileFormCtrl"}},data:i}).state("Profile.Edit",{url:"/edit",views:{profilepage:{templateUrl:"public/app/modules/AccountApp/profileapp/viewtemplates/profileform.html",controller:"ProfileFormCtrl"}},data:i}).state("Application",{url:"/application",views:{navbar:r,maincontent:{templateUrl:a.ApplicationViewsURL+"applicationmain.html"}},"abstract":!0,data:i}).state("Application.New",{url:"/new",views:{ApplicationPage:{templateUrl:a.ApplicationFormViewsURL+"applicationform.html",controller:"ApplicationFormCtrl"}}}).state("Application.Edit",{url:"/edit",views:{ApplicationPage:{templateUrl:a.ApplicationFormViewsURL+"applicationform.html",controller:"ApplicationFormCtrl"}}}).state("Unit",{url:"/unit",views:{navbar:r,maincontent:{templateUrl:a.UnitViewsURL+"UnitMain.html"}},"abstract":!0}).state("Unit.",{url:"/create",views:{UnitMain:{templateUrl:a.UnitViewsURL+"UnitCreate.html",controller:"UnitCreateCtrl"}}}).state("Unit.Details",{url:"/details/:id",views:{UnitMain:{templateUrl:a.UnitViewsURL+"unitDetailsPage.html",controller:"UnitDetailCtrl"}},data:l}).state("Unit.Display",{url:"/display",views:{UnitMain:{templateUrl:a.UnitViewsURL+"unitDisplay.html",controller:"UnitDisplayCtrl"}}}).state("Campaign",{url:"/campaign","abstract":!0,views:{navbar:r,maincontent:{templateUrl:a.CampaignMainViewsURL+"CampaignMain.html",controller:"CampaignMainCtrl"}}}).state("Campaign.VideoUpload",{"abstract":!0,views:{CampaignMain:{templateUrl:a.CampaignVideoUploadViewsURL+"/VideoUploadMain.html",controller:"VideoUploadMainCtrl"}}}).state("Campaign.VideoUpload.Main",{url:"/apartmentshare",views:{MainContent1:{templateUrl:a.CampaignVideoUploadViewsURL+"/VideoUploadSplash.html",controller:"VideoUploadSplashCtrl"}}}).state("Campaign.VideoUpload.Form",{url:"/form",views:{VideoUploadMain:{templateUrl:a.CampaignVideoUploadViewsURL+"/VideoUploadForm.html",controller:"VideoUploadFormCtrl"}}}),t.otherwise("/"),o.interceptors.push(["$q","$location","$localStorage","$injector","TokenSvc",function(e,t,n,o,a){return{request:function(e){return e.headers=e.headers||{},e.headers.searchCheck?(delete e.headers.searchCheck,e):(a.getToken()&&(e.headers.Authorization=a.getToken()),e)},response:function(e){return e.data.token?(a.storeToken(e.data.token),e):e},responseError:function(t){return 401!==t.status&&403!==t.status||(a.deleteToken(),!t.data.facebook)?(o.get("$state").transitionTo("Login"),e.reject(t)):e.reject(t)}}}])}]),angular.module("AdminPanelApp").factory("AdminPanelResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"admin/:item/:action",{item:"@item",action:"@action"})}]),angular.module("AmazonS3UploadApp").controller("AmazonS3UploadCtrl",["$scope","$http","$state",function(e,t,n){e.sizeLimit=5368709120,e.uploadProgress=0,e.creds={},e.upload=function(){AWS.config.update({accessKeyId:"AKIAIPGWV5OFR73P3VLQ",secretAccessKey:"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"}),AWS.config.region="us-east-1";var t=new AWS.S3({params:{Bucket:"wiziouservideos"}});if(e.file){var n=Math.round(parseInt(e.file.size));if(n>e.sizeLimit)return toastr.error("Sorry, your attachment is too big. <br/> Maximum "+e.fileSizeLabel()+" file attachment allowed","File Too Large"),!1;var o=e.uniqueString()+"-"+e.file.name,a={Key:o,ContentType:e.file.type,Body:e.file,ServerSideEncryption:"AES256"};t.putObject(a,function(t,n){return t?(toastr.error(t.message,t.code),!1):(toastr.success("File Uploaded Successfully","Done"),void setTimeout(function(){e.uploadProgress=0,e.$digest()},1e4))}).on("httpUploadProgress",function(t){e.uploadProgress=Math.round(t.loaded/t.total*100),e.$digest()})}else toastr.error("Please select a file to upload")},e.fileSizeLabel=function(){return Math.round(e.sizeLimit/1073741824)+"GB"},e.uniqueString=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;8>n;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}}]),angular.module("AmazonS3UploadApp").directive("file",function(){return{restrict:"AE",scope:{file:"@"},link:function(e,t,n){t.bind("change",function(t){var n=t.target.files,o=n[0];e.file=o,e.$parent.file=o,e.$apply()})}}}),angular.module("UnitApp").factory("UnitResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"apartment/:id",{id:"@id"})}]),angular.module("UnitApp").service("UnitCreateSvc",["lodash","FlexGetSetSvc",function(e,t){function n(t,n){var o=e.filter(n.data.results,function(e){return e.formatted_address===t});switch(0===o.length&&(o=e.filter(n.data.results,function(e){return e["formatted address"]===t})),o.length){case 0:return!1;default:return o}}function o(e){return"undefined"!=typeof e[0].long_name?e[0].long_name:"undefined"!=typeof e[0].short_name?e[0].short_name:"na"}function a(t,n){var a={};if(a.topLevelType=t[0].types[0],n)for(var r in n)a[r]=n[r];var i=t[0].address_components;a.formattedAddress=t[0].formatted_address;var l=e.filter(i,function(e){return"street_number"===e.types[0]}),s=e.filter(i,function(e){return"route"===e.types[0]}),c=e.filter(i,function(e){return"locality"===e.types[0]}),u=e.filter(i,function(e){return"administrative_area_level_3"===e.types[0]}),p=(e.filter(i,function(e){return"administrative_area_level_1"===e.types[0]}),e.filter(i,function(e){return"postal_code"===e.types[0]})),d=e.filter(i,function(e){return"neighborhood"===e.types[0]});l.length>0&&s.length>0&&(a.street=o(l)+" "+o(s)),d.length>0&&(a.neighborhood=o(d)),c.length>0&&(a.locality=o(c)),u.length>0&&(a.administrative_area_level_3=o(u)),p.length>0&&(a.zip=o(p));var m=null,g=null,f=null;return t[0].geometry.hasOwnProperty("location")?m=e.values(t[0].geometry.location):t[0].geometry.hasOwnProperty("viewport")&&(t[0].geometry.viewport.hasOwnProperty("northeast")?m=e.values(t[0].geometry.viewport.northeast):t[0].geometry.viewport.hasOwnProperty("northwest")?m=e.values(t[0].geometry.viewport.northwest):t[0].geometry.viewport.hasOwnProperty("southeast")?m=e.values(t[0].geometry.viewport.southeast):t[0].geometry.viewport.hasOwnProperty("southwest")&&(m=e.values(t[0].geometry.viewport.southwest))),("string"==typeof m[0]||"number"==typeof m[0])&&(g=parseFloat(m[0].toFixed(6)),a.latitude=g),("string"==typeof m[1]||"number"==typeof m[1])&&(f=parseFloat(m[1].toFixed(6)),a.longitude=f),a}var r=function(e,t){var n=new google.maps.Geocoder;n.geocode({address:e},function(e,n){return n==google.maps.GeocoderStatus.OK?t(null,e):t({message:"No Google API Address found"},null)})},i=function(n,o){var a=null,r=(t.get(),e.values(googleAPIDataRaw.data.results.types));return 1===r.length?(a=r[0],o(a)):o(a)},l=function(e,o,i){var l=t.get(),s=!1;if(0!==l.length&&(s=n(e,l)),s!==!1){var c=a(s,o);return i(null,c)}r(e,function(e,t){var n=a(t,o);return i(null,n)})};return{getGeocodeData:r,addressSearchType:i,parseGeocodeData:l}}]),angular.module("AccountApp").controller("AccountMainCtrl",["$scope",function(e){}]),angular.module("AdminPanelApp").controller("AdminSearchUnitCtrl",["$scope","ApartmentSearchSvc","SmartSearchSvc",function(e,t,n){e.search=function(){t.searchApartment(e.searchString,function(t,n){e.$emit("passToSiblingAdminApp",{name:"updateUnitData",data:n})})},e.getLocation=function(e){return n.smartSearch(e)}}]),angular.module("AdminPanelApp").controller("AdminUpdateAssignmentCtrl",["$scope","AdminPanelResource",function(e,t){e.data={},e.submitEdits=function(){t.save({item:"assignment",action:"update"},e.data,function(e,t){})}}]),angular.module("AdminPanelApp").controller("AdminUpdateUnitCtrl",["$scope","lodash","AdminPanelResource",function(e,t,n){e.apartment=null,e.numBeds=[0,1,2,3,4,5,6],e.numBaths=[0,1,2,3,4],e.numLivingrooms=[0,1,2,3],e.maxResidency=[0,1,2,3,4,5,6,7,8,9,10],e.renovatedSelect=["No","Yes","Unsure"],e.petPolicy=["Dogs Only","Cats Only","Dogs & Cats","Small Animals","None"],e.$on("updateUnitData",function(t,n){e.apartment=n[0]}),e.editUnit=function(){e.apartmentAddress,{unitNum:e.apartment.unitNum,beds:e.apartment.beds,baths:e.apartment.baths,livingSpaces:e.apartment.livingSpaces,maxResidency:e.apartment.maxResidency,costPerMonth:e.apartment.costPerMonth,renovated:e.apartment.renovated,pets:e.apartment.petPolicy,youtubeVRID:e.apartment.youtubeID};n.save({item:"unit",action:"update"},e.apartment,function(e,t){$state.go("Account.Dashboard.Main")})}}]),angular.module("AdminPanelApp").controller("AdminPanelMainCtrl",["$scope",function(e){e.$on("passToSiblingAdminApp",function(t,n){e.$broadcast(n.name,n.data)})}]),angular.module("CampaignApp").controller("CampaignMainCtrl",["$scope",function(e){}]),angular.module("LandingPageApp").controller("LandingPageCtrl",["$scope","$http","$state","UserRegistrationSvc","ApartmentSearchSvc","SmartSearchSvc","UnitCreateSvc",function(e,t,n,o,a,r,i){e.radioModel={realtor:!1,tenant:!0,broker:!1},e.neighborhoods=["Boston","Allston","Brighton","Jamaica Plain","Back Bay","Beacon Hill"],e.localeButtonClick=function(e){a.searchApartment(e,function(e,t){return n.go("Unit.Display")})},e.goToUploadPage=function(){n.go("Campaign.VideoUpload.Main")},e.search=function(){a.searchApartment(e.searchString,function(e,t){return n.go("Unit.Display")})},e.getLocation=function(e){return r.smartSearch(e)},e.registerUser=function(){var t={firstName:e.firstName,lastName:e.lastName,email:e.email,password:e.password,accountType:"local",userType:1};o.saveUser(t,function(e){n.go("Account.Dashboard.Main")})},e.sizeLimit=5368709120,e.uploadProgress=0,e.creds={},e.upload=function(){AWS.config.update({accessKeyId:"AKIAIPGWV5OFR73P3VLQ",secretAccessKey:"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"}),AWS.config.region="us-east-1";var t=new AWS.S3({params:{Bucket:"wiziouservideos"}});if(e.file){var n=Math.round(parseInt(e.file.size));if(n>e.sizeLimit)return toastr.error("Sorry, your attachment is too big. <br/> Maximum "+e.fileSizeLabel()+" file attachment allowed","File Too Large"),!1;var o=e.uniqueString()+"-"+e.file.name,a={Key:o,ContentType:e.file.type,Body:e.file,ServerSideEncryption:"AES256"};t.putObject(a,function(t,n){return t?(toastr.error(t.message,t.code),!1):(toastr.success("File Uploaded Successfully","Done"),void setTimeout(function(){e.uploadProgress=0,e.$digest()},1e4))}).on("httpUploadProgress",function(t){e.uploadProgress=Math.round(t.loaded/t.total*100),e.$digest()})}else toastr.error("Please select a file to upload")},e.fileSizeLabel=function(){return Math.round(e.sizeLimit/1073741824)+"GB"},e.uniqueString=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;8>n;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}}]),angular.module("UnitApp").controller("UnitCreateCtrl",["$scope","$sessionStorage","$rootScope","$state","lodash","UnitResource","SmartSearchSvc","UnitCreateSvc","FlexGetSetSvc",function(e,t,n,o,a,r,i,l,s){e.$storage=t,e.numBeds=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],e.getLocation=function(e){return i.smartSearch(e)},e.addUnit=function(){var t=e.apartmentAddress,n={unitNum:e.unitNum,beds:e.beds,baths:e.baths,livingSpaces:e.livingRooms,maxResidency:e.maxResidency,costPerMonth:e.costPerMonth,renovated:e.renovated,pets:e.petPolicy,youtubeVRID:e.youtubeVRID};l.parseGeocodeData(t,n,function(e,t){r.save(t,function(e,t){o.go("Account.Dashboard.Main")})})}}]),angular.module("UnitApp").controller("UnitDetailCtrl",["$scope","$state","$modal","lodash","ApartmentGetSetSvc","UnitResource","MapFct","TokenSvc","ProfileResource","FlexGetSetSvc","WizioConfig",function(e,t,n,o,a,r,i,l,s,c,u){e.available=!1;var p=function(){return l.checkExp()?(l.deleteToken(),t.go("Login")):void 0},d=function(e,t,o){var a=n.open({templateUrl:e,controller:t,size:o});return a};a.checkApartment(function(t){e.apartment=t;var n=i.makeMap();e.map=new google.maps.Map(document.getElementById("map"),n);i.makeMarkers(e.map)}),e.waitlist=function(){p(),c.set(e.apartment,"ApartmentWaitlistingTo");var n=d(u.ApplicationWaitlistViewsURL+"WaitlistCreateModal.html","WaitlistCreateModalCtrl","md");n.result.then(function(e){t.go("Account.Dashboard.Main")})},e.apply=function(){p();var n=l.decode();if(a.set(e.apartment,"apartmentApplyingTo"),null===n.ProfileId){var o=d("public/viewtemplates/public/createprofilemodal.html","ProfileCreateModalCtrl","md");o.result.then(function(e){t.go("Profile.Create")},function(){})}else s.get({id:n.ProfileId},function(e){if(e){var n=d("public/app/modules/AccountApp/profileapp/viewtemplates/profileexistsmodal.html","ProfileExistsModalCtrl","lg");n.result.then(function(n){switch(n){case"ok":t.go("ApartmentApplication");break;case"edit":c.set(e),t.go("Profile.Edit")}},function(){})}})}}]),angular.module("UnitApp").controller("UnitDisplayCtrl",["$scope","$sessionStorage","$state","lodash","ApartmentGetSetSvc","MapFct",function(e,t,n,o,a,r){function i(){var t=r.makeMap();e.map=new google.maps.Map(document.getElementById("map"),t);r.makeMarkers(e.map);e.openInfoWindow=function(e,t){e.preventDefault(),google.maps.event.trigger(t,"click")}}e.sessionStorage=t,e.apartmentSearch=t.apartmentSearch,0===e.apartmentSearch.length,e.mapshow=!0,i(),e.tabToggle=function(){e.mapshow=!e.mapshow},e.$on("searchFinished",function(t,n){e.apartmentSearch=n,i()}),e.apartmentSelected=function(t){var r=o.find(e.apartmentSearch,{id:t});void 0!==r&&(a.set(r,"apartmentSelected"),n.go("Unit.Details",{id:t}))}}]),angular.module("AboutUsApp").controller("AboutListCtrl",["$scope",function(e){e.members=[{name:"Chris Canal",title:"CEO",picture:"radish.png",twitter:"chriscanal4",linkedin:"chriscanal"},{name:"Cameron Billings",title:"CTO",picture:"radish.png",twitter:"CamBillings_",linkedin:"cameronbillings"},{name:"Devon Billings",title:"COO/CMO",picture:"radish.png",twitter:"dsgrod",linkedin:"dsgrod"},{name:"Trent Duffy",title:"CMS-Cheif of Misc Stuff",picture:"radish.png",twitter:"trentolol",linkedin:"trentduffy"}]}]),angular.module("AboutUsApp").controller("AboutUsCtrl",["$scope",function(e){}]),angular.module("ApplicationApp").factory("ApplicationResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"application")}]),angular.module("NavbarApp").controller("NavbarCtrl",["$rootScope","$scope","$state","$http","ApartmentSearchSvc","AuthFct","SmartSearchSvc",function(e,t,n,o,a,r,i){t.goToLogin=function(){n.go("Login")},t.search=function(){a.searchApartment(t.searchString),n.go("Unit.Display")},t.getLocation=function(e){return i.smartSearch(e)},t.logout=function(e){r.logout()},t.getLocation=function(e){return i.smartSearch(e)},t.createUnit=function(){n.go("Unit.Create")},t.goHome=function(){n.go("LandingPage")},t.goAbout=function(){n.go("About")},t.goBlog=function(e){n.go("Blog.List")},t.goAccoutCreate=function(){n.go("Account.Create")},t.goAccountDashboard=function(){n.go("Account.Dashboard.Main")}}]),angular.module("BlogApp").controller("BlogListCtrl",["$scope",function(e){e.articles=[{title:"Local Landlord Shocked to Find Lack of Interest in Apartment",intro:"Sam explained to the Wizio staff-writers that he remains hopeful that his new, candid apartment listing will help him to find a good tenant match.",author:"The Radish",authorPicture:"radish.png",images:["post1_img1.jpg","post1_img2.jpg"]},{title:"Local Landlord Shocked to Find Lack of Interest in Apartment",intro:"Sam explained to the Wizio staff-writers that he remains hopeful that his new, candid apartment listing will help him to find a good tenant match.",author:"The Radish",authorPicture:"radish.png",images:["post1_img1.jpg","post1_img2.jpg"]}]}]),angular.module("BlogApp").controller("BlogMainCtrl",["$scope",function(e){}]),angular.module("SharedFactoryApp").factory("GeocoderFct",["$q",function(e){var t=function(t){var n=e.defer(),o=new google.maps.Geocoder;return o.geocode({address:t},function(e,t){t===google.maps.GeocoderStatus.OK&&n.resolve(e[0].geometry.location)}),n.promise};return{getLatLong:t}}]).factory("MapFct",["ApartmentGetSetSvc","$sessionStorage","$stateParams","$state",function(e,t,n,o){var a=function(){var t={zoom:12,center:new google.maps.LatLng(42.3601,-71.0589),mapTypeId:google.maps.MapTypeId.ROADMAP},n=function(e){if(e.constructor!==Array&&(e=[e]),0===e.length)return t;var n=null,o=null;for(i=0;i<e.length;i++)n+=e[i].latitude,o+=e[i].longitude;return n/=e.length,o/=e.length,t={zoom:12,center:new google.maps.LatLng(n,o),mapTypeId:google.maps.MapTypeId.ROADMAP}},a=null;return"Unit.Details"===o.current.name?a=e.get("apartmentSelected"):"Unit.Display"===o.current.name&&(a=e.get("apartmentSearch")),n(a)},r=function(t){function n(e){var n=new google.maps.Marker({map:t,position:new google.maps.LatLng(e.latitude,e.longitude),title:e.street});n.content='<div class="infoWindowContent">'+e.neighborhood+"</div>";var o=new google.maps.InfoWindow;google.maps.event.addListener(n,"click",function(){o.setContent("<h2>"+n.title+"</h2>"+n.content),o.open(t,n)}),a.push(n)}var a=[],r=null;"Unit.Details"===o.current.name?r=e.get("apartmentSelected"):"Unit.Display"===o.current.name&&(r=e.get("apartmentSearch"));var l=function(e){for(Array.isArray(e)||(e=[e]),i=0;i<e.length;i++)n(e[i]);return a};return l(r)};return{makeMap:a,makeMarkers:r}}]),angular.module("SharedFactoryApp").factory("SearchResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"search/",{},{save:{method:"POST",isArray:!0}})}]),angular.module("SharedServiceApp").service("ApartmentSearchSvc",["$rootScope","$sessionStorage","SearchResource","UnitCreateSvc",function(e,t,n,o){function a(a,r){o.parseGeocodeData(a,null,function(o,a){n.save(a,function(n,o){return e.$broadcast("searchFinished",n),t.apartmentSearch=n,r(null,n)})})}return{searchApartment:a}}]).service("UserRegistrationSvc",["$state","AuthRegistrationResource",function(e,t){function n(e,n){t.save(e,function(e){n(e)})}return{saveUser:n}}]).service("TokenSvc",["$localStorage","jwtHelper",function(e,t){var n=function(n){return n?t.decodeToken(n):t.decodeToken(e.token)},o=function(n){return n?t.isTokenExpired(n):e.token?t.isTokenExpired(e.token):!0},a=function(t){return t?(e.token=t,!0):!1},r=function(){return e.token?e.token:"No Token"},i=function(){return e.token?(delete e.token,!0):!1};return{decode:n,checkExp:o,storeToken:a,getToken:r,deleteToken:i}}]).service("SmartSearchSvc",["$http","FlexGetSetSvc",function(e,t){var n=function(n){return e.get("//maps.googleapis.com/maps/api/geocode/json",{headers:{searchCheck:!0},params:{address:n,sensor:!1,components:"country:US|administrative_area:MA"}}).then(function(e){return t.set(e),e.data.results.map(function(e){return e.formatted_address})})};return{smartSearch:n}}]),angular.module("AccountApp").controller("AuthCreateAcctCtrl",["$scope","$state","$facebook","UserRegistrationSvc",function(e,t,n,o){e.setUserObj=function(){var n={firstName:e.firstName,lastName:e.lastName,email:e.email,password:e.password,accountType:"local",userType:1};o.saveUser(n,function(e){t.go("Account.Dashboard.Main")})},e.createFacebookUser=function(){n.login().then(function(e){switch(e.status){case"connected":n.api("/me").then(function(e){e.accountType="facebook",o.saveUser(e,function(e){t.go("Account.Dashboard.Main")})});break;case"not_authorized":}})},e.cancel=function(){t.go("Home")}}]),angular.module("AccountApp").controller("AuthCreateAcctModalCtrl",["$scope","$state","$modalInstance","UserRegistrationSvc",function(e,t,n,o){e.setUserObject=function(){var t={firstName:e.firstName,lastName:e.lastName,email:e.email,password:e.password};o.saveUser(t,function(e){n.close("ok")})},e.cancel=function(){"Campaign.VideoUpload.Main"===t.current.name?n.dismiss():t.go("Home")}}]),angular.module("AccountApp").controller("AuthCreateModalCtrl",["$scope","$modalInstance","$state",function(e,t,n){e.ok=function(){t.close("ok")},e.cancel=function(){t.dismiss("cancel")}}]),angular.module("AccountApp").controller("AuthLoginCtrl",["$rootScope","$scope","$state","$localStorage","$stateParams","$facebook","AuthFct","AuthResetPasswordResource","AuthUpdatePasswordResource","TokenSvc",function(e,t,n,o,a,r,i,l,s,c){t.facebookLogin=function(){return e.authObjects.facebookConnected?n.go("Account.Dashboard"):void r.login().then(function(t){"connected"===t.status&&r.api("/me").then(function(t){var n={user:t,facebook:!0};i.signup(n,function(t,n){return 403===n?void(e.isLoggedIn=!1):void(e.isLoggedIn=!0)})})})},t.sendResetEmail=function(){var e={};e.email=t.email,l.save(null,e,function(e,t){n.go("Home")},function(e){})},t.resetPassword=function(){if(t.password===t.passwordConfirm){var e={};e.password=t.password,e.token=a.token,s.save(e,function(e,t){n.go("login")},function(e){n.go("login")})}else t.password="",t.passwordConfirm=""},t.requestLogin=function(){var o={email:t.email,password:t.password};i.signin(o,function(t){e.isLoggedIn=!0,n.go("Account.Dashboard.Main")},function(){e.error="Failed to sign in!",n.go("Login")})}}]),angular.module("AuthApp").factory("AuthFct",["$state","$localStorage","$http","$rootScope","AuthRegistrationResource","AuthLoginResource","TokenSvc",function(e,t,n,o,a,r,i){var l=function(){var e=i.getToken(),t=i.checkExp(e);return e&&!t?!0:!1};return{signup:function(e,t,n){a.save(null,e,function(e,n){t(n)})},signin:function(e,t,n){r.save(e,function(e,n){t(e,n)})},logout:function(n){tokenClaims={},delete t.token,o.isLoggedIn=!1,e.go("LandingPage")},isLoggedin:l}}]),angular.module("AuthApp").factory("AuthLoginResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"user/authenticate")}]).factory("AuthResetPasswordResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"user/forgotpassword")}]).factory("AuthUpdatePasswordResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"user/updatepassword")}]).factory("AuthRegistrationResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"user/registration")}]),angular.module("AccountApp").service("AuthCreateUserSvc",[function(){var e=function(e,t){return e={firstName:e.firstName,lastName:e.lastName,email:e.email,password:e.password},"tenant"===t.usertype?e.userType=1:"realtor"===t.usertype?e.userType=2:"broker"===t.usertype&&(e.userType=3),e};return{CreateUser:e}}]),angular.module("AccountApp").controller("ProfileCreateModalCtrl",["$scope","$modalInstance","$state",function(e,t,n){e.ok=function(){t.close("ok")},e.cancel=function(){t.dismiss("cancel")}}]),angular.module("SellerApp").controller("ProfileExistsModalCtrl",["$scope","$modalInstance","$state","ProfileResource","AuthFct","FlexGetSetSvc",function(e,t,n,o,a,r){e.ok=function(){t.close("ok")},e.edit=function(){t.close("edit")},e.cancel=function(){t.dismiss("cancel")}}]),angular.module("AccountApp").controller("ProfileFormCtrl",["$scope","$modal","$state","ApartmentGetSetSvc","AuthFct","ProfileResource","ApplicationResource","TokenSvc","FlexGetSetSvc",function(e,t,n,o,a,r,i,l,s){e.apartment=o.get("apartmentApplyingTo");var c=e.apartment;e.profile=s.get();var u=l.decode();e.apply=function(){var o=n.current.name,a={UserID:u.id,annualIncome:e.annualIncome,currentEmployer1:e.currentEmployer1,currentEmployerLOE1:e.currentEmployerLOE1,currentEmployerPosition1:e.currentEmployerPosition1,currentEmployer2:e.currentEmployer2,currentEmployerLOE2:e.currentEmployerLOE2,currentEmployerPosition2:e.currentEmployerPosition2,previousEmployer1:e.previousEmployer1,previousEmployerLOE1:e.previousEmployerLOE1,previousEmployerPosition1:e.previousEmployerPosition1,previousEmployer2:e.previousEmployer2,previousEmployerLOE2:e.previousEmployerLOE2,previousEmployerPosition2:e.previousEmployerPosition2,creditScore:e.creditScore,pets:e.pets,petType:e.petType,age:e.age,maritalStatus:e.maritalStatus,emergencyContact:e.emergencyContact,phoneNumber:e.phoneNumber,socialSecurityNumber:e.socialSecurityNumber,currentBank:e.currentBank,currentTenancyAddress:e.currentTenancyAddress,currentPM:e.currentPM,currentPMContact:e.currentPMContact,previousTenancyAddress:e.previousTenancyAddress,previousPM:e.previousPM,previousPMContact:e.previousPMContact,employmentStatus:e.employmentStatus,desiredMoveInDate:e.desiredMoveInDate};if("Profile.Edit"===o)e.profile=s.get();else if("Profile.Create"===o){e.appicationEmails=[];var i=t.open({templateUrl:"public/app/modules/AccountApp/profileapp/viewtemplates/profilesavemodal.html",controller:"ProfileSaveModalCtrl",size:"md",resolve:{apartment:function(){return c}}});i.result.then(function(e){"saveAndApply"===e?r.save(a,function(e,t){n.go("Application.New")}):"save"===e&&r.save(a,function(e,t){})},function(){})}}}]),angular.module("AccountApp").controller("ProfileSaveModalCtrl",["$scope","$modalInstance","$state","apartment",function(e,t,n,o){e.apartment=o,e.ok=function(){t.close("saveAndApply")},e.save=function(){t.close("save")},e.cancel=function(){t.dismiss("cancel")}}]),angular.module("SellerApp").factory("ProfileResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"profile/:id",{id:"@id"})}]),angular.module("AccountApp").controller("DashboardMainCtrl",["$scope","$timeout","TokenSvc",function(e,t,n){var o=n.decode();t(function(){e.$broadcast("AccountInfoBroadcast",o)})}]),angular.module("AccountApp").controller("DashboardUserInfoCtrl",["$scope",function(e){e.$on("AccountInfoBroadcast",function(t,n){
e.accountInfo=n})}]),angular.module("AccountApp").factory("AssignmentResource",["$resource","WizioConfig",function(e,t){return e(t.baseAPIURL+"assignment")}]),angular.module("CampaignApp").controller("VideoUploadMainCtrl",["$scope",function(e){e.$on("ViewTemplatesSelector",function(t,n){e.viewtemplates=n})}]),angular.module("CampaignApp").controller("VideoUploadModalCtrl",["$scope","$modalInstance","SmartSearchSvc","UnitResource","UnitCreateSvc","TokenSvc","AssignmentResource",function(e,t,n,o,a,r,i){e.getLocation=function(e){return n.smartSearch(e)},e.sizeLimit=5368709120,e.uploadProgress=0,e.creds={},e.upload=function(){a.parseGeocodeData(e.apartmentAddress,null,function(n,a){o.save(a,function(n,o){var a=n;AWS.config.update({accessKeyId:"AKIAIPGWV5OFR73P3VLQ",secretAccessKey:"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"}),AWS.config.region="us-east-1";var l=new AWS.S3({params:{Bucket:"wiziouservideos"}});if(e.file){var s=Math.round(parseInt(e.file.size));if(s>e.sizeLimit)return toastr.error("Sorry, your attachment is too big. <br/> Maximum "+e.fileSizeLabel()+" file attachment allowed","File Too Large"),!1;var c=r.decode(),u=e.apartmentAddress;u=u.replace(/[^0-9a-zA-Z]/g,"");var p=c.email+"-"+u,d={Key:p,ContentType:e.file.type,Body:e.file,ServerSideEncryption:"AES256"};l.putObject(d,function(n,o){if(n)return toastr.error(n.message,n.code),t.dismiss(),!1;toastr.success("File Uploaded Successfully","Done");var r={UserId:c.id,ApartmentId:a.id,S3VideoId:p};i.save(r,function(e,t){}),setTimeout(function(){e.uploadProgress=0,e.$digest()},1e4),t.close("ok")}).on("httpUploadProgress",function(t){e.uploadProgress=Math.round(t.loaded/t.total*100),e.$digest()})}else toastr.error("Please select a file to upload")})})},e.fileSizeLabel=function(){return Math.round(e.sizeLimit/1073741824)+"GB"},e.uniqueString=function(){for(var e="",t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=0;8>n;n++)e+=t.charAt(Math.floor(Math.random()*t.length));return e}}]),angular.module("CampaignApp").controller("VideoUploadSplashCtrl",["$scope","$state","$modal","WizioConfig","AuthFct",function(e,t,n,o,a){var r={topHorizontal1:!0,topHorizontal2:!0,mainContent1:!1,mainContent2:!0,bottomHorizontal:!0};e.$emit("ViewTemplatesSelector",r);var i=function(e,t,o){var a=n.open({templateUrl:e,controller:t,size:o});return a};e.uploadVideo=function(){if(a.isLoggedin()){var e=i(o.CampaignVideoUploadViewsURL+"VideoUploadModal.html","VideoUploadModalCtrl","md");e.result.then(function(e){},function(){})}else{var t=i(o.AccountAuthViewsURL+"AuthCreateAcctForm.html","AuthCreateAcctModalCtrl","md");t.result.then(function(e){if("ok"===e){var t=i(o.CampaignVideoUploadViewsURL+"VideoUploadModal.html","VideoUploadModalCtrl","md");t.result.then(function(e){},function(){})}},function(){})}}}]),angular.module("CampaignApp").service("AWSS3UploadSvc",[function(){}]),angular.module("ApplicationApp").controller("WaitlistCreateModalCtrl",["$scope","FlexGetSetSvc",function(e,t){e.apartment=t.get("ApartmentWaitlistingTo"),e.apartmentSlotsModal=[];for(var n={apartmentInfo:null,users:null,owner:null},o=[],a=1;a<=e.apartment.maxResidency-1;a++){var r={id:a};e.apartmentSlotsModal.push(r),o.push(r)}e.waitlistSignup=function(){var t={apartmentId:e.apartment.id,apartmentMaxResidency:e.apartment.maxResidency};n.apartmentInfo=t,n.users=o,waitlist.save(n,function(e,t){})},e.ok=function(){$modalInstance.close("ok")},e.cancel=function(){$modalInstance.dismiss("cancel")}}]),angular.module("ApplicationApp").controller("ApplicationFormCtrl",["$scope",function(e){}]),angular.module("SellerApp").controller("dashAccountAppliedCtrl",["$scope",function(e){}]),angular.module("SellerApp").controller("dashAptPostedCtrl",["$scope",function(e){}]),angular.module("SellerApp").controller("dashSellerInfoCtrl.js",["$scope",function(e){e.$on("AccountInfoBroadcast",function(t,n){e.accountInfo=n})}]),angular.module("SharedServiceApp").service("ApartmentGetSetSvc",["$sessionStorage","$stateParams","UnitResource","lodash",function(e,t,n,o){var a=null,r=[],i=function(t,n){n&&(e[n]=t,-1===o.indexOf(r,n)&&r.push(n)),a=t},l=function(o){return o?a=e[o]:null!==a&&a.id===t.id?a:void n.get({id:apartmentURLID},function(e){a=e,callback(a)})},s=function(){a=null},c=function(o){var r=t.id,i=a,l=null;e.apartmentSelected&&(l=e.apartmentSelected.id),null!==i&&i.id===r&&l===r?o(i):l==r?(a=e.apartmentSelected,o(a)):n.get({id:r},function(e){a=e,o(a)})};return{set:i,get:l,reset:s,checkApartment:c}}]),angular.module("SharedServiceApp").service("FlexGetSetSvc",["$sessionStorage","$sessionStorage",function(e,t){var n=[],o=function(t,o){return o?(e[o]=t,n=[],void n.push(t)):(n=[],void n.push(t))},a=function(t){return t?e[t]:0===n.length?[]:n[0]},r=function(t){return t?(delete e[t],void(n=[])):void(n=[])};return{set:o,get:a,reset:r}}]);