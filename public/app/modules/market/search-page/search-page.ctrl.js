angular.module("MarketApp").controller("MarketSearchPageCtrl", [
  "$scope",
  "$state",
  function($scope, $state) {
    var pageCountLimit = 5;
    $scope.bedOptions = [
      { text: "Studio", value: 0, isActive: true },
      { text: "1+", value: 1, isActive: false },
      { text: "2+", value: 2, isActive: false },
      { text: "3+", value: 3, isActive: false },
      { text: "4+", value: 4, isActive: false }
    ];

    $scope.toggleButtonClass = function(button) {
      console.dir(button);
      button.isActive = !button.isActive;
      console.dir(button);
    };

    $scope.listings = JSON.parse(localStorage.getItem("wizio")).listings;
    $scope.showVRPreviewEnabled = false;

    // Navigate to a tour page
    $scope.viewTour = function(listing) {
      return $state.go("Listing", { listingUUID: listing.pubid });
    };

    $scope.showVRPreview = function(listing, index) {
      $scope.pageCountLimit[$scope.currentPage - 1][
        index
      ].isBeingPreviewed = true;
      $scope.showVRPreviewEnabled = true;
      setTimeout(function() {
        $scope.$broadcast("TourDataReceived", {
          title: "preview",
          imageUrls: [
            "https://d1mze0h82dkhhe.cloudfront.net/6bbc6427-f349-44ac-a15b-5e431d301acd/Kitchen%20(A).JPG"
          ],
          navpoints: []
        });
      }, 500);
    };

    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lng: -71.12033, lat: 42.30982 },
      mapTypeId: "roadmap"
    });

    initPaging($scope.listings);

    function changePrevBtnState() {
      if ($scope.currentPage === 1) {
        $scope.prevDisabled = true;
      }
    }

    function changeNextBtnState() {
      console.dir($scope.lastPage);
      console.dir($scope.currentPage);
      if ($scope.lastPage === $scope.currentPage) {
        $scope.nextDisabled = true;
      } else {
        $scope.nextDisabled = false;
      }
    }

    function changeEllipsesState() {
      if (
        $scope.lastPage - $scope.currentPage > 2 &&
        !($scope.clickablePages[$scope.lastPage - 1] === 1)
      ) {
        $scope.rightEllipsesEnabled = true;
      } else {
        $scope.rightEllipsesEnabled = false;
      }

      if ($scope.currentPage >= 4 && !($scope.clickablePages[3] === 1)) {
        $scope.leftEllipsesEnabled = true;
      } else {
        $scope.leftEllipsesEnabled = false;
      }
    }

    function changePaginationState(changePageValue) {
      if (changePageValue <= $scope.lastPage && changePageValue >= 1) {
        $scope.currentPage = changePageValue;

        $scope.clickablePages = [0, 1];

        for (var i = 2; i < $scope.lastPage; i++) {
          if (
            i === $scope.currentPage - 1 ||
            i === $scope.currentPage ||
            i === $scope.currentPage + 1 ||
            ($scope.clickablePages[i - 1] === 1 && i + 1 === $scope.lastPage) ||
            (i + 1 === $scope.currentPage - 1 && i - 1 === 1)
          ) {
            $scope.clickablePages[i] = 1;
          } else {
            $scope.clickablePages[i] = 0;
          }
        }

        $scope.clickablePages[$scope.lastPage] = 1;

        console.dir($scope.clickablePages);

        changePrevBtnState();
        changeNextBtnState();
        changeEllipsesState();
      }
    }

    function initPaging(listings) {
      // for (var i = 0; i < 100; i++) {
      //   listings.push({});
      // }
      $scope.currentPage = 1;
      var totalPages = Math.floor(listings.count / pageCountLimit);
      if (listings.count % pageCountLimit > 0) {
        totalPages += 1;
      }
      $scope.pagedItems = [];

      for (var i = 0; i < $scope.listings.length; i++) {
        if (i % pageCountLimit === 0) {
          $scope.pagedItems[Math.floor(i / pageCountLimit)] = [listings[i]];
        } else {
          $scope.pagedItems[Math.floor(i / pageCountLimit)].push(listings[i]);
        }
      }
      console.dir($scope.pagedItems);
      $scope.lastPage = $scope.pagedItems.length;

      changePaginationState(1);
    }
    $scope.changePaginationState = changePaginationState;

    // var cityCircle = new google.maps.Circle({
    //   strokeColor: "#F79739",
    //   strokeOpacity: 0.8,
    //   strokeWeight: 2,
    //   fillColor: "#F79739",
    //   fillOpacity: 0.35,
    //   map: map,
    //   center: { lat: $scope.address.Latitude, lng: $scope.address.Longitude },
    //   radius: 300
    // });
  }
]);
