angular.module('AccountApp')
    .factory('LoadingSpinnerFct', [
    function() {
      function show(id) {
          document.getElementById(id).style.visibility = "visible";
      }
      function hide(id) {
          setTimeout(function(){
              document.getElementById(id).style.visibility = "hidden";
          }, 100)
      }
      function isSpinning(id){
          if(document.getElementById(id).style.visibility === "visible"){
              return true;
          } else {
              return false;
          }
      }
      return {
          show: show,
          hide: hide,
          isSpinning: isSpinning
      }
    }])
