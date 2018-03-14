angular.module("RequestShowingApp").factory("RequestShowingFormFct", [
  "WizioConfig",
  "$resource",
  "$q",
  function(WizioConfig, $resource, $q) {
    /**
     * Send a request for a showing of a listing. The API will send an email and log the request to the database
     * @param  {Object} requesterData requires Name and either a phoneNumber or email address
     * @return {Promise}              returns a promise
     */
    function sendRequestForShowing(requester, agent, listing) {
      return $q(function(resolve, reject) {
        $resource(WizioConfig.baseAPIURL + "showingrequest").save(
          { requester: requester, agent: agent, listing: listing },
          function(responseData, responseHeaders) {
            return resolve(responseData);
          }
        );
      });
    }

    return {
      sendRequestForShowing: sendRequestForShowing
    };
  }
]);
