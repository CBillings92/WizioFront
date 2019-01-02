angular.module("MarketApp").controller("MarketSearchPageCtrl", [
  "$scope",
  "$state",
  "$q",
  "$window",
  "MarketFct",
  "WizioConfig",
  function($scope, $state, $q, $window, MarketFct, WizioConfig) {
    var pageCountLimit = 12;
    var activeBedButtonIndex = 0;

    $scope.wizioCDN = WizioConfig.CLOUDFRONT_DISTRO;

    $scope.filterPanelActive = false;
    $scope.toggleFilterPanel = function() {
      $scope.filterPanelActive = !$scope.filterPanelActive;
    };

    autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("search-bar"),
      {
        types: ["geocode"]
      }
    );

    $scope.filter = {
      minPrice: {
        value: null
      },
      maxPrice: {
        value: null
      },
      minBeds: {
        value: 0
      }
    };

    $scope.bedOptions = [
      { text: "Studio", value: 0, isActive: true },
      { text: "1+", value: 1, isActive: false },
      { text: "2+", value: 2, isActive: false },
      { text: "3+", value: 3, isActive: false },
      { text: "4+", value: 4, isActive: false }
    ];

    $scope.bedFilterSelection = function(bedOption) {
      $scope.bedOptions[activeBedButtonIndex].isActive = false;
      activeBedButtonIndex = bedOption.value;
      bedOption.isActive = !bedOption.isActive;
      $scope.filter.minBeds.value = bedOption.value;
      $scope.filterListings();
    };

    $scope.showVRPreviewEnabled = false;

    $scope.marketSearch = {
      agentId: "d089b1ff-af8b-40dc-a8ea-9220b18160e9",
      addressBar: "Jamaica Plain"
    };
    $scope.dataLoaded = true;
    $scope.submitMarketSearch = function() {
      $scope.dataLoaded = false;
      return $q(function(resolve, reject) {
        $scope.searchInProgress = true;

        MarketFct.addDataToLocalStore(
          "wizio",
          "lastMarketSearchCriteria",
          $scope.marketSearch
        );

        MarketFct.submitMarketSearch($scope.marketSearch)
          .then(function(response) {
            $scope.dataLoaded = true;
            MarketFct.addDataToLocalStore(
              "wizio",
              "listings",
              response.payload
            );
            initMarket();
          })
          .catch(function(err) {
            console.error(err);
          });
      });
    };

    // Navigate to a tour page
    $scope.viewTour = function(listing) {
      killWizioTourPreview();
      return $state.go("Listing", { listingUUID: listing.pubid });
    };

    $scope.showVRPreview = function(listing, index) {
      killWizioTourPreview();
      listing.isBeingPreviewed = true;
      $scope.showVRPreviewEnabled = true;
      setTimeout(function() {
        $scope.$broadcast("TourDataReceived", {
          title: "preview",
          imageUrls: [
            $scope.wizioCDN +
              listing.SubscriptionApartment.pubid +
              "/" +
              listing.SubscriptionApartment.Media[0].title +
              ".JPG"
          ],
          navpoints: []
        });
      }, 500);
    };

    $scope.filterListings = function() {
      var filteredListings = [];

      for (var i = 0; i < $scope.listings.length; i++) {
        $scope.listings[i].SubscriptionApartment.Listing.Beds = Number(
          $scope.listings[i].SubscriptionApartment.Listing.Beds
        )
          .toFixed(2)
          .replace(/[.,]00$/, "");
        $scope.listings[i].SubscriptionApartment.Listing.Baths = Number(
          $scope.listings[i].SubscriptionApartment.Listing.Baths
        )
          .toFixed(2)
          .replace(/[.,]00$/, "");
        var listing = $scope.listings[i];
        var rentAmount =
          $scope.listings[i].SubscriptionApartment.Listing.Lease.RentAmount;
        var minPriceFilter = Math.max($scope.filter.minPrice.value, 0);
        var maxPriceFilter = $scope.filter.maxPrice.value || 100000;
        var minBedsFilter = $scope.filter.minBeds.value;
        if (
          rentAmount >= minPriceFilter &&
          rentAmount <= maxPriceFilter &&
          listing.SubscriptionApartment.Listing.Beds >= minBedsFilter
        ) {
          filteredListings.push($scope.listings[i]);
        } else {
          $scope.listings[i].isFiltered = true;
        }
      }
      initPaging(filteredListings);
      $scope.filteredListings = filteredListings;
    };

    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: { lng: -71.12033, lat: 42.30982 },
      mapTypeId: "roadmap"
    });

    function changePrevBtnState() {
      if ($scope.currentPage === 1) {
        $scope.prevDisabled = true;
      } else {
        $scope.prevDisabled = false;
      }
    }

    function changeNextBtnState() {
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

    function killWizioTourPreview() {
      if (
        $scope.pagedItems &&
        $scope.pagedItems[$scope.currentPage - 1].length !== 0
      ) {
        for (
          var i = 0;
          i < $scope.pagedItems[$scope.currentPage - 1].length;
          i++
        ) {
          if (
            $scope.pagedItems[$scope.currentPage - 1][i].isBeingPreviewed ===
            true
          ) {
            wizio.kll();
            $scope.pagedItems[$scope.currentPage - 1][
              i
            ].isBeingPreviewed = false;
            break;
          }
        }
      }
    }

    function changePaginationState(changePageValue) {
      killWizioTourPreview();
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

        changePrevBtnState();
        changeNextBtnState();
        changeEllipsesState();
        document.getElementById("listing-tiles-container").scrollTop = 0;
      }
    }

    function initPaging(listings) {
      console.dir(listings.length);
      $scope.currentPage = 1;
      var totalPages = Math.max(
        Math.floor(listings.length / pageCountLimit),
        1
      );
      if (listings.length % pageCountLimit > 0 && listings.length !== 0) {
        totalPages += 1;
      }
      $scope.pagedItems = [];
      for (var i = 0; i < listings.length; i++) {
        if (i % pageCountLimit === 0) {
          $scope.pagedItems.push([]);
          if (listings.length > 0 && i % pageCountLimit === 0) {
            $scope.pagedItems[Math.floor(i / pageCountLimit)].push(listings[i]);
          }
        } else {
          $scope.pagedItems[Math.floor(i / pageCountLimit)].push(listings[i]);
        }
      }
      $scope.lastPage = $scope.pagedItems.length;

      var markers = listings.map(function(listing, i) {
        var marker = new google.maps.Marker({
          position: {
            lat: listing.Apartment.latitude,
            lng: listing.Apartment.longitude
          }
          // label: labels[i % labels.length]
        });
        marker.addListener("click", function() {
          $scope.viewTour({ pubid: listing.pubid });
        });
        return marker;
      });

      var markerCluster = new MarkerClusterer(map, markers, {
        imagePath:
          "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m"
      });

      changePaginationState(1);
    }
    $scope.changePaginationState = changePaginationState;

    function initMarket() {
      $scope.listings = JSON.parse(localStorage.getItem("wizio")).listings;
      // addTestListings(100);
      for (var i = 0; i < $scope.listings.length; i++) {
        $scope.listings[i].isFiltered = false;
      }
      initPaging($scope.listings);
      $scope.filterListings();
    }

    function addTestListings(numberOfTestListings) {
      if ($scope.listings.length === 0) {
        $scope.listings.push({
          pubid: "8716a181-a2d6-4d5d-abc3-38da6100c017",
          SubscriptionApartment: {
            id: 286,
            pubid: "4e98a7b6-2a67-47cb-8721-fdd3c28b63f5",
            Listing: {
              ListingId: 3,
              Pubid: "70bc4cd2-3e9d-4eb1-b006-45dc837e419b",
              Beds: "2.00",
              Baths: "1.00",
              IsHeatIncluded: true,
              IsHotWaterIncluded: true,
              IsElectricIncluded: true,
              IsCableInternetIncluded: true,
              HasBathtub: true,
              IsGasIncluded: true,
              HasFireplace: true,
              HasRefrigerator: true,
              HasInUnitWasherDryer: true,
              HasInBuildingWasherDryer: true,
              HasSmartLock: true,
              HasWindowFixings: true,
              HasGarbageDisposal: true,
              IsCatFriendly: true,
              IsDogFriendly: true,
              IsSmallAnimalFriendly: true,
              HasMonthlyPetFee: true,
              MonthlyPetFeeAmount: "25.00",
              StoveType: 1,
              PrimaryFlooringType: 1,
              HasDishWasher: true,
              HasGym: true,
              HasCentralAir: true,
              HasConcierge: true,
              SquareFootage: "2500",
              HasMicrowave: true,
              BicycleStorageType: 1,
              ParkingType: 1,
              HasPool: true,
              HasLounge: true,
              AmenityDescription: null,
              ListingDescription: "Fantastic Apartment Trial.",
              IsActive: true,
              CreatedAt: "2018-02-10T17:01:22.000Z",
              UpdatedAt: "2018-02-10T17:01:22.000Z",
              MaximumPetWeight: null,
              IsRepresentedByOwner: false,
              IsExclusive: false,
              IsSplitUnit: null,
              ListingType: null,
              KeyFee: null,
              HasPetWeightLimit: null,
              HasDenOffice: false,
              HasLoft: false,
              AddressId: null,
              CreatorUserId: null,
              LastModifiedByUserId: null,
              Lease: {
                LeaseId: 1,
                LeaseUUID: "5a4986e1-366a-11e8-8dea-0606f96137f0",
                RentAmount: 2500,
                IsSecurityDepositRequired: true,
                IsFirstMonthsRentRequired: true,
                IsLastMonthsRentRequired: true,
                IsBrokerFeeRequired: true,
                BrokersFeeAmount: 2500,
                SecurityDepositAmount: 2500,
                LeaseStartDate: "2017-09-01T00:00:00.000Z",
                LeaseEndDate: "2018-08-31T00:00:00.000Z",
                IsAvailableNow: false,
                IsAvailableForLeaseRenewal: false,
                LeaseRenewalStartDate: null,
                CreatedAt: "2018-02-10T17:01:22.000Z",
                UpdatedAt: "2018-02-10T17:01:22.000Z",
                LeaseType: null,
                LeaseLength: null,
                ListingId: 3,
                LeaseTypeId: 7
              }
            },
            Media: [
              {
                id: 6237,
                link: null,
                type: "vrphoto",
                title: "Bathroom 2.JPG",
                awsurl:
                  "https://cdn.wizio.co/4e98a7b6-2a67-47cb-8721-fdd3c28b63f5/",
                apartmentpubid: "4e98a7b6-2a67-47cb-8721-fdd3c28b63f5",
                isUnit: false,
                x: null,
                y: null,
                order: 0,
                IsDeleted: false,
                ApartmentId: 646,
                UserId: null,
                SubscriptionAptMedia: {
                  id: 1609,
                  pubid: "eb76cba1-1c55-45e8-b1a5-57236352df9e",
                  CreatedAt: null,
                  UpdatedAt: null,
                  SubscriptionApartmentId: 286,
                  MediaId: 6237
                }
              }
            ]
          },
          Apartment: {
            NeighborhoodLongName: "Jamaica Plain",
            NeighborhoodShortName: "Jamaica Plain",
            RouteShortName: "South St",
            RouteLongName: "South Street",
            StreetNumber: "228",
            concatAddr: "228 South St, Jamaica Plain, MA 02130, USA",
            FullyFormattedAddress: "228 South St, Jamaica Plain, MA 02130, USA",
            LocalityShortName: "Boston",
            LocalityLongName: "Boston",
            AdministrativeAreaLevel1ShortName: "MA",
            AdministrativeAreaLevel1LongName: "Massachusetts",
            AdministrativeAreaLevel2ShortName: null,
            AdministrativeAreaLevel2LongName: null,
            AdministrativeAreaLevel3ShortName: "Suffolk County",
            AdministrativeAreaLevel3LongName: "Suffolk County",
            AdministrativeAreaLevel4ShortName: null,
            AdministrativeAreaLevel4LongName: null,
            AdministrativeAreaLevel5ShortName: null,
            AdministrativeAreaLevel5LongName: null,
            PostalCode: "02130",
            latitude: 42.302542,
            longitude: -71.114451
          }
        });
      }
      var actualListingCount = $scope.listings.length;
      for (var i = 0; i < numberOfTestListings; i++) {
        $scope.listings.push(
          $scope.listings[Math.floor(Math.random() * actualListingCount) + 0]
        );
      }
    }

    initMarket();

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
