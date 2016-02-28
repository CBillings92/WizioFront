angular.module('Models')
    .factory('MediaModel', [
        '$resource',
        '$stateParams',
        'TokenSvc',
        'WizioConfig',
        function($resource, $stateParams, TokenSvc, WizioConfig) {
            function Media(link, type, title, UserId, ApartmentId) {
                this.link = link;
                this.type = type || null;
                this.title = title || null;
                this.UserId = UserId;
                this.ApartmentId = ApartmentId;
            }
            Media.prototype.saveMedia = function (callback) {
                var data = this;
                return $resource(WizioConfig.baseAPIURL + '/media')
                    .save(data, function(response) {
                        return callback(response);
                    });
            };

            Media.prototype.getAssociationData = function() {
                this.UserId = TokenSvc.decode().id;
                this.ApartmentId = $stateParams.id;
            };

            Media.build = function(data) {
                return new Media(
                    data.link,
                    data.type,
                    data.title,
                    data.UserId,
                    data.ApartmentId
                );
            };

            return Media;
        }
    ]);
