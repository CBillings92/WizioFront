angular.module('AgentProfileApp')
.directive('agentProfileDir', function() {
  return {
    templateUrl: 'public/app/modules/agent-profile-app/agent-profile.view.html',
    controller: 'AgentProfileCtrl',
    scope: {},
    restrict: 'EA'
  }
})
