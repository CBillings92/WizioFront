angular.module('AccountApp')
    .controller('ActiveListingListCtrl', [
        '$scope',
        '$resource',
        'WizioConfig',
        'ModalBuilderFct',
        'ActiveListingFct',
        function($scope, $resource, WizioConfig, ModalBuilderFct, ActiveListingFct) {
        new Clipboard('.clipboard');
        $scope.windowLocationOrigin = window.location.origin;
        $scope.openInNewPage = function(pubid){
          window.open($scope.windowLocationOrigin + '/tour/' + pubid, '_blank');
        }

        $scope.makeActiveListingPublic = function(activeListing, activeListingsIndex) {
            ModalBuilderFct.buildSimpleModal(
                'Cancel',
                'Ok',
                'Remove Password Protection?',
                'Removing password protection from this tour will enable anyone with the tour link to open and view the tour.' +
                ' The tour can be easily password protected again once the tour is made public.'
            )
            .then(function(response){
                if(response === 'ok'){
                    $resource(WizioConfig.baseAPIURL +  'activelisting/ispublic')
                    .save({pubid: activeListing.PubId,'isPublic': true}, function(response){
                        $scope.activelistings[activeListingsIndex].isPublic = response.isPublic;
                    });
                }
            })
            .catch(function(err){
                console.dir(err);
            })
        }

        $scope.deleteActiveListing = function(activeListing, index){
            ModalBuilderFct.buildSimpleModal('Cancel', 'Delete', "Are You Sure You'd Like To Delete This Listing?", 'This listing will be removed from your Active Listings list. It can be re-added to this list by navigating to "Search", searching the address and selecting "Activate".')
            .then(function(response){
                if(response === 'ok'){
                    ActiveListingFct.deleteActiveListing(activeListing)
                    .then(function(response){
                        // temporarily remove the listing from the UI - upon next login the listing will be gone
                        $scope.activelistings.splice(index, 1);
                    });
                } else if(response === 'cancel'){
                    return;
                }
            })
        }

        // Generate a password for a given tour.
        $scope.generatePassword = function(activelisting, activeListingsIndex){
            // Create the config object for building the TourPasswordConfirm modal
            var tourPasswordConfirmModalConfig = {
                controller: 'TourPasswordConfirmModalCtrl',
                templateUrl: WizioConfig.TourPasswordApp.Views.TourPasswordConfirmModal,
                size: 'md',
                modalData: {}
            }

            // Modal Workflow
            ModalBuilderFct.buildSimpleModal(
                'Cancel',
                'Ok',
                'Password Protect This Tour?',
                "If you password protect this tour, the link to this tour won't be accessible to anyone without the password. You can remove the password protection if you decide you'd like to open the tour. You will be provided the auto-generated password to your tour upon clicking 'Ok'."
            )
            .then(function(response){
                if(response === 'cancel'){
                    return
                } else {
                    $resource(WizioConfig.baseAPIURL + 'tourpassword')
                    .save(activelisting, function(response){
                        var modalData = {
                            tourPassword: response,
                            activeListing: activelisting
                        };
                        tourPasswordConfirmModalConfig.modalData = modalData;
                        ModalBuilderFct.buildModalWithController(tourPasswordConfirmModalConfig)
                        .then(function(response){
                            $scope.activelistings[activeListingsIndex].isPublic = false;
                        })
                    });
                }
            })
            return;
        }
    }]);
