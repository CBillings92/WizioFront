angular.module('TestApp')
  .controller('ThreeJSTestCtrl', [
    '$scope',
    function ($scope) {
      var renderer;

      var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(2)
      document.body.appendChild(renderer.domElement);

      var geometry = new THREE.RingGeometry( 0.5, 1, 100);
      var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide } );
      var mesh = new THREE.Mesh( geometry, material );
      // mesh.rotation.x =
      scene.add( mesh );
      console.dir(Math.PI);
      mesh.rotation.x = 100*(Math.PI/180)

      camera.position.z = 25;

      function animate() {
        requestAnimationFrame(animate);
        // mesh.rotation.x += 0.01;
        // console.dir(mesh.rotation.x)
				// mesh.rotation.y += 0.01;
        // mesh.rotation.z += 0.01;
        renderer.render(scene, camera);
      }
      animate();
    }
  ])
