angular.module('SharedFactoryApp')
  .factory('JSDOMHelperFct', [
    function() {

      function getDOMViewportHeight() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      }

      function getDOMViewportWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }

      return {
        get: {
          DOM: {
            Viewport: {
              Height: getDOMViewportHeight,
              Width: getDOMViewportWidth
            }
          }
        }
      }
    }
  ])
