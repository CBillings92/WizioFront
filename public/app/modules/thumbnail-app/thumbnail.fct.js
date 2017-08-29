angular.module('ThumbnailApp')
  .factory('ThumbnailFct', [
    'WizioConfig',
    function(WizioConfig) {

      function unwarpThumbnail(thumbnailData) {
        if (thumbnailData.url) {

        } else if ($scope.thumbnailObj.file) {

        } else {

        }
      }

      function getBasicMeshTexture(data) {
        return $q(function(resolve, reject) {
          THREE.ImageUtils.crossOrigin = '';
          var loader = new THREE.TextureLoader();
          loader.load(data, function(texture) {
            texture.minFilter = THREE.LinearFilter;
            var meshBasicMaterial = new THREE.MeshBasicMaterial({map: texture, overdraw: 0});
            return resolve(meshBasicMaterial);
          })
        })
      }

      function getGeometry() {
        return $q(function(resolve, reject){
          return new THREE.SphereGeometry(100,60,40);
        })
      }

      function getSphere(geometry, mesh) {
        var sphere = new THREE.Mesh(geometry, mesh);
        sphere.material.side = THREE.DoubleSide;
        sphere.scale.x = -1
      }


      // THREE.ImageUtils.crossOrigin = '';
      // var loader = new THREE.TextureLoader();
      // loader.crossOrigin = '';
      // if (imageURLs.length !== 0) {
      //   loader.load(imageURLs[0], function(texture) {
      //     texture.minFilter = THREE.LinearFilter;
      //
      //     if (wizio.sphere) {
      //       remove(wizio.sphere)
      //     };
      //
      //     var sphere = new THREE.Mesh(new THREE.SphereGeometry(100, 60, 40), new THREE.MeshBasicMaterial({
      //       map: texture,
      //       overdraw: 0
      //     }))
      //     wizio.sphere = sphere;
      //     wizio.sphere.material.side = THREE.DoubleSide
      //     sphere.scale.x = -1;
      //     wizio.scene.add(wizio.sphere);
      //     imageURLs.shift();
      //     addImage(imageURLs, function(response) {
      //       return cb('done2');
      //     });

      return {
        unwarpThumbnail: unwarpThumbnail
      };
    }
  ])
