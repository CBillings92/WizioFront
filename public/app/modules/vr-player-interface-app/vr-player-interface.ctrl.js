angular.module("TourApp").controller("VrPlayerInterfaceCtrl", [
  "$scope",
  "$state",
  "$resource",
  "TokenSvc",
  "lodash",
  "WizioConfig",
  "AWSFct",
  "LoadingSpinnerFct",
  "$sce",
  "ModalBuilderFct",
  "$stateParams",
  function(
    $scope,
    $state,
    $resource,
    TokenSvc,
    lodash,
    WizioConfig,
    AWSFct,
    LoadingSpinnerFct,
    $sce,
    ModalBuilderFct,
    $stateParams
  ) {
    $scope.isCollapsed = false;
    $scope.isRotating = false;
    $scope.hasAccelerometer = false;

    $scope.state = $state.current.name;
    $scope.showInterface = true;

    if ($state.current.name === "ListingDemo1") {
      $scope.isListingPage = true;
    } else {
      $scope.isListingPage = false;
    }

    /**
     * On InterfaceDataReceived broadcast event, kick off the VrPlayerInterface application.
     * @param  {object} event Event that fired to trigger this
     * @param  {object} data  data for the tour player interface to initialize
     * @return {[type]}       [description]
     */
    $scope.$on("InterfaceDataReceived", function(event, data) {
      LoadingSpinnerFct.show("vrPlayerLoader");
      $scope.data = data;
      $scope.media = data.media;
      $scope.showInterface = data.showInterface;
      $scope.floorplan = data.floorplan;
      document.getElementById("pano").addEventListener("click", onTourClick, false);
      createThumbnailURLs();
      $scope.photoIndex = 0;
      return;
    });

    function createThumbnailURLs() {
      var SubscriptionApartmentPubId = $scope.media.vrphoto[0].SubscriptionApartmentPubId;
      for (var i = 0; i < $scope.media.vrphoto.length; i++) {
        $scope.media.vrphoto[i].thumbnailURL =
          WizioConfig.CLOUDFRONT_DISTRO +
          "180x90/" +
          SubscriptionApartmentPubId +
          "/" +
          $scope.media.vrphoto[i].title +
          ".JPG";
      }
      return;
    }

    window.addEventListener("devicemotion", function(event) {
      if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma)
        $scope.hasAccelerometer = true;
    });

    function onTourClick(mouseEvent) {
      wizio.onClickTriggered(mouseEvent, function(response) {
        var chosenImage;
        var photoIndex;
        var scrollTo;
        if (TokenSvc.decode().email === "cameron@wizio.co") {
          console.dir(response.coordClick);
        }
        if (response.object.name) {
          for (var i = 0; i < $scope.media.vrphoto.length; i++) {
            if ($scope.media.vrphoto[i].title === response.object.name) {
              photoIndex = i;
              chosenImage = $scope.media.vrphoto[i];
              break;
            }
          }
          wizio.changeImage(chosenImage, function(response) {
            scrollTo = 200 * photoIndex + 1;
            moveSlider(1, scrollTo);
            $scope.photoIndex = photoIndex;
            $scope.$apply();
            return response;
          });
        }
        return;
      });
    }
    // For photo and floorplan selection
    $scope.selectPhoto = false;
    $scope.viewFloorPlan = false;

    /* If the state calls for a full screen VR Player, remove body styling and show controls */
    if ($scope.state === "Tour" || $scope.state === "Demo") {
      $scope.showcontrols = true;
      $scope.showcontactinfo = true;
      $scope.showpoweredby = true;
      document.getElementsByTagName("body")[0].style["padding-bottom"] = 0;
      document.getElementsByTagName("body")[0].style["margin-bottom"] = 0;
      document.getElementById("main-content").style["height"] = "100%";
    }

    $scope.onProductPage = false;

    if ($state.current.name === "Product") {
      $scope.onProductPage = true;
    }

    /**
     * Toggles the accelerometer on the VR player library
     * @return {undefined} [undefined]
     */
    $scope.accelerometerToggle = function() {
      $scope.toggle = !$scope.toggle;
      $scope.isRotating = !$scope.isRotating;
      wizio.toggleAccelerometer();
      return;
    };

    //FIXME don't use JQuery..
    var moveSlider = function(direction, amount) {
      // direction is 1 for forward / -1 for backward
      width = $("#scrollthis").width();
      el = $("#scrollthis");
      currentPosition = el.scrollLeft();
      moveWidth = width * 0.5 * direction;
      var moveTo = amount ? amount : currentPosition + moveWidth;
      // el.scrollLeft(currentPosition + moveWidth);
      el.animate(
        {
          scrollLeft: moveTo
        },
        500,
        function() {
          $scope.sliderCanGoForward = $scope.canSliderForward();
          $scope.sliderCanGoBackward = $scope.canSliderBackward();
        }
      );
    };

    $scope.sliderCanGoForward = true;
    $scope.sliderCanGoBackward = false;

    $scope.canSliderBackward = function() {
      return $("#scrollthis").scrollLeft() > 0;
    };

    $scope.canSliderForward = function() {
      el = $("#scrollthis");
      width = el.outerWidth();
      currentPosition = el.scrollLeft();
      viewportWidth = el.width();
      return currentPosition + viewportWidth < width;
    };

    $scope.moveSliderBackward = function() {
      moveSlider(-1);
    };

    $scope.moveSliderForward = function() {
      moveSlider(1);
    };

    $scope.toggleFloorPlan = function() {
      $scope.viewFloorPlan = !$scope.viewFloorPlan;
    };

    /**
     * Chonge Photo Functionality. Pass photo information to vr player ond get a callback
     * response. set viewFloorPlan to false to hide floorplan after selecting a new photo.
     * Function gets called on either a selection of a pin on the floorplan or on the
     * slider.
     * @param  {[type]} photoIndex [description]
     * @return {[type]}            [description]
     */
    $scope.changePhoto = function(photoIndex) {
      LoadingSpinnerFct.show("vrPlayerLoader");
      wizio.changeImage($scope.media.vrphoto[photoIndex], function(response) {
        $scope.photoIndex = photoIndex;

        /* For cameron to collect coordinates for hard coding navigation onto tours */
        var email = TokenSvc.decode().email;
        if (email === "cameron@wizio.co") {
          wizio.toggleCoordCollection();
          wizio.disableOnMouseMove();
        }

        $scope.viewFloorPlan = false;
        $scope.$apply();
        LoadingSpinnerFct.hide("vrPlayerLoader");
      });
    };

    $scope.openCloseMenu = function() {
      $scope.menuIsOpen = !$scope.menuIsOpen;
      // set floorplan button visibility
      if ($scope.floorplan) {
        $scope.actions[0].show = true;
      } else {
        $scope.actions[0].show = false;
      }
    };
    $scope.agent = {};
    $scope.blank = "https://s3.amazonaws.com/' + WizioConfig.S3_EQUIRECTPHOTOS_BUCKET  + '/blank.png";
    $scope.profileUploaded = false;
    $scope.isMLSListingAccount = false;
    if ($state.current.name == "Demo" || $state.current.name == "Product") {
      $resource(WizioConfig.baseAPIURL + "/activelisting/0a68e5a9-da00-11e6-85e0-0a8adbb20c4d").query(function(
        response
      ) {
        $scope.profileUploaded = true;
        $scope.agent = {
          firstName: "Devon",
          lastName: "Grodkiewicz",
          email: "devon@wizio.co",
          awsProfilePhotoUrl: "https://cdn.wizio.co/profile-photos/Devon_Grodkiewicz_35.png",
          state: $state.current.name
        };
      });
    } else {
      $resource(WizioConfig.baseAPIURL + "activelisting/:activelistingid", {
        activelistingid: "@activelistingid"
      }).get(
        {
          activelistingid: $stateParams.activelistingid || $stateParams.listingUUID
        },
        function(apiresponse) {
          var media = apiresponse.media;
          var listing = apiresponse.Listing;
          $scope.agent = media[media.length - 1];
          /* Check if airbnb listing */
          $scope.profileUploaded = $scope.agent.awsProfilePhotoUrl;
          $scope.agent.state = $state.current.name;
          if ($stateParams.activelistingid || $stateParams.listingUUID === "8e2aa9d6-9281-4832-a5c5-c80a9e44df5d") {
            $scope.agent = {
              firstName: "Gene",
              lastName: "Blinkov",
              email: "gene@blinkov.org",
              awsProfilePhotoUrl: "",
              phoneNumber: "603-903-2332"
            };
          }
          if (
            $scope.agent.email === "alex@redtreeboston.com" ||
            $scope.agent.email === "bill.patterson@craftrealestateboston.com" ||
            $scope.agent.email === "youngone@younghouses.com" ||
            $scope.agent.email === "brian@lmcrealtyboston.com" ||
            $scope.agent.email === "yuyang@wizio.co"
          ) {
            $scope.isMLSListingAccount = true;
          }
        }
      );
    }

    $scope.launchAgentProfileModal = function() {
      $scope.viewFloorPlan = false;

      ModalBuilderFct.buildComplexModal(
        "md",
        "/public/app/modules/vr-player-interface-app/modal/agent-profile-modal.view.html",
        "AgentProfileModalCtrl",
        $scope.agent
      ).then(function(response) {});
    };
  }
]);
