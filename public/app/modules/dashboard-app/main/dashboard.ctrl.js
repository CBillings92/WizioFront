angular.module('DashboardApp').controller('DashboardCtrl', [
    '$scope',
    '$resource',
    '$q',
    'TokenSvc',
    'LoadingSpinnerFct',
    'WizioConfig',
    'ModalBuilderFct',
    'AWSFct',
    'DashboardFct',
    'StorageApp',
    '$state',
    'lodash',
    function($scope, $resource, $q, TokenSvc, LoadingSpinnerFct, WizioConfig, ModalBuilderFct, AWSFct, DashboardFct, StorageApp, $state, lodash) {

      $scope.modifyTourAllowed = true;

      // short hand the factory function for ease of use
      var createModal = ModalBuilderFct.buildModalWithController;
        $state.go('Account.Dashboard.ShareTour');
        $scope.wizioAdmin = false;
        var user = TokenSvc.decode();
        $scope.state = 'Account.Dashboard.ShareTour';
        if (TokenSvc.decode().Subscriptions[0].id === 3 ) {
          $scope.wizioAdmin = true;
        }

    $scope.viewActiveTours = 1;
    $scope.changeTourListView = function() {
      $scope.viewActiveTours = !$scope.viewActiveTours;
      return;
    }
    // set flags
    // $scope.currentview = 'share';
    $scope.emailToInvite = null;
    $scope.apartments = null;
    $scope.loading = false;
    // get the user from session storage
    var user = TokenSvc.decode();

    $scope.createToursPermitted = true;
    if (user.email.includes('@wizio.co') || user.email === 'Esolem@lreadvisors.com') {
      $scope.createToursPermitted = true;
    }
    if (user.email === 'amcginty@nomadicrealestate.com') {
      $scope.modifyTourAllowed = false;
    }
    var subsid = user.Subscriptions[0].id;
    if (subsid === 6 || subsid === 10 || subsid === 17) {
      TokenSvc.deleteToken();
      window.location.replace('https://www.wizio.co');
    }
    // FIXME: Move ShareTour/ActiveListings/InactiveListings code into own app
    // get active listings for logged in user
    DashboardFct.get.activelistings()
      .then(function(tours) {
        return parseTours(tours);
      });

    $scope.$on('ActiveListingsUpdated', function(ev, data) {
      DashboardFct.get.activelistings()
        .then(function(tours) {
          return parseTours(tours);
        });
    })

    function parseTours(tours) {
      StorageApp.store('ActiveListings', tours);
      if (tours.length !==0) {
        var orderedTours = lodash.groupBy(tours, 'isActive');
        $scope.inactiveListings = orderedTours[false];
        $scope.activeListings = orderedTours[true];

      }
      else{
        $scope.inactiveListings = [];
        $scope.activeListings = [];
      }

      return;
    }

    $scope.$on('ActiveListingRequest', function(ev, data) {
      $scope.$broadcast('ActiveListingsPayload', $scope.orderedTours);
    })

    // get the user from session storage
    var user = TokenSvc.decode();

    $scope.phoneNumber = user.phoneNumber;

    // get whether the user has access to invite others
    $scope.inviteAccess = user.Subscriptions[0].UserSubscriptions_Migration.subscription_manager;

    // create tour functionailty - button click
    $scope.createTour = function() {
      // accept address modal
       var createUnitModalConfig = {
         size: 'md',
         templateUrl: WizioConfig.PhotographerApp.Views.CreateUnitModal,
         controller: 'CreateUnitModalCtrl',
         modalData: {}
      };

      //GET APARTMENT ADDRESS AND UNIT NUMBER MODAL
      createModal(createUnitModalConfig)
        .then(function(createUnitAPIResponse) {
          if (createUnitAPIResponse.success) {
            var data = createUnitAPIResponse.payload;
            var dataForTourManagement = {
              Apartment: data.Apartment.Instance,
              SubscriptionApartment: {
                pubid: data.SubscriptionApartment.Instance.pubid,
                id: data.SubscriptionApartment.Instance.id
              }
            }
            return $state.go('TourManagement', {
              'data': dataForTourManagement,
              'action': 'CreateTour'
            });

          } else {
            ModalBuilderFct.buildSimpleModal(
                "",
                "OK",
                "Tour Created Already!",
                'This tour has already been created under your subscription. Please search for this tour and Activate it in your account dashboard.'
            ).then(function(result) {
                return;
            });
          }
        })
    }

    $scope.changeState = function(state) {

      $state.go('Account.Dashboard.' + state);
      $scope.state = 'Account.Dashboard.' + state;
    }


    $scope.modifyExistingTour = function() {
      var searchModifyModalConfig = {
        size: 'lg',
        templateUrl: 'public/app/modules/photographerapp/upload/upload.view.html',
        controller: 'UploadPageCtrl',
        modalData: {}
      };
      var uploadTourPageModalConfig = {
        size: 'lg',
        templateUrl: 'public/app/modules/photographerapp/upload-tool/upload-tool-modal.html',
        controller: 'UploadPageNewCtrl',
        modalData: {}
      };
      createModal(searchModifyModalConfig)
        .then(function(data) {
          var dataForTourManagement = {
            Apartment: data.Apartment,
            SubscriptionApartment: {
                pubid: data.SubscriptionApartment.pubid,
                id: data.id
            }
          }
          $state.go('TourManagement', {
            'data': dataForTourManagement,
            'action': 'ModifyTour'
          });
        })
    }

    $scope.$on('Unit-Activated', function(event, results) {
      $scope.activelistings.push({
        pubid: results.pubid,
        Apartment: {
          concatAddr: results.apartment.concatAddr,
          unitNum: results.apartment.unitNum
        }
      })
    });

    $scope.supportModal = function(){
      ModalBuilderFct.buildModalWithController(
        {
          size: 'lg',
          templateUrl: WizioConfig.modals.support.main.view,
          controller: WizioConfig.modals.support.main.controller,
          modalData: {}
        }
      )
      .then(function(response){
        return
      })
      .catch(function(err){
        return
      })
    }

    $scope.requestTours = function(){
      /* Launch typeform */
      window.open('https://wiziotour.youcanbook.me/', '_blank');
    }

  }
]);
