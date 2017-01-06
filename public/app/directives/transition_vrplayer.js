angular.module('Directives')
    .directive('transitionVrPlayerDirv', [ '$state', 'LoadingSpinnerFct',
        function($state, LoadingSpinnerFct) {
            return {
                restrict: 'E',
                controller: 'TransitionUnitMediaCtrl',
                templateUrl: 'public/app/modules/unitapp/viewtemplates/transition.view.html',
                link: function(scope, elem, attr) {
                    LoadingSpinnerFct.show('vrPlayerLoader');
                    scope.noPan = true;
                    var camera, controls, scene, renderer, sphere;
                    var canvasParent = document.getElementById('sphere');

                    var webglSupport = (function() {
                        try {
                            var canvas = document.createElement('canvas');
                            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
                        } catch (e) {
                            return false;
                        }
                    })();
                    var state = $state.current.name;
                    scope.$on('IMGLOAD', function IMGLOAD(event) {
                        newImage();
                        // LoadingSpinnerFct.hide('vrPlayerLoader');

                    });

                    init(elem);
                    render();

                    function init(elem) {
                        camera = new THREE.PerspectiveCamera(100, canvasParent.parentElement.clientWidth / canvasParent.parentElement.clientHeight);
                        camera.position.x = 0.1;
                        camera.position.y = 0;

                        // controls = new THREE.OrbitControls(camera);
                        // controls.noPan = true;
                        // controls.noZoom = true;
                        // controls.autoRotate = true;
                        // controls.autoRotateSpeed = 0.5;
                        // controls.addEventListener('change', render);
                        controls = new THREE.DeviceOrientationController(camera);
                        controls.addEventListener('change', render);
                        scene = new THREE.Scene();
                        renderer = webglSupport ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
                        renderer.setSize(canvasParent.parentElement.clientWidth, canvasParent.parentElement.clientHeight);
                        canvasParent.appendChild(renderer.domElement);

                        canvasParent.addEventListener('mousewheel', onMouseWheel, false);
                        canvasParent.addEventListener('DOMMouseScroll', onMouseWheel, false);
                        window.addEventListener('resize', resize, false);

                        animate();


                        return {
                            resize: resize
                        };

                    }

                    scope.$on('CHANGE', function() {
                        newImage();
                    });

                    function render() {
                        renderer.render(scene, camera);
                    }

                    function resize() {
                        camera.aspect = (canvasParent.parentElement.clientWidth / canvasParent.parentElement.clientHeight);
                        camera.updateProjectionMatrix();

                        webGLRenderer.setSize(canvasParent.parentElement.clientWidth, canvasParent.parentElement.clientHeight);
                    }


                    function newImage() {
                        THREE.ImageUtils.crossOrigin = '';
                        var loader = new THREE.TextureLoader();
                        loader.crossOrigin = '';
                        loader.load(scope.photoUrl, function(texture) {
                            texture.minFilter = THREE.LinearFilter;

                            if(sphere){
                              remove(sphere);
                              sphere = new THREE.Mesh(
                                new THREE.SphereGeometry(100, 60, 40),
                                new THREE.MeshBasicMaterial({
                                  map: texture
                                })
                              );

                              sphere.scale.x = -1;
                        //   controls = new THREE.DeviceOrientationControls(sphere, true);
                            //   controls.update();
                              scene.add(sphere);
                              LoadingSpinnerFct.hide('vrPlayerLoader');

                            } else {
                            // controls = new THREE.DeviceOrientationControls(sphere, true);
                              sphere = new THREE.Mesh(
                                new THREE.SphereGeometry(100, 60, 40),
                                new THREE.MeshBasicMaterial({
                                  map: texture
                                })
                              );

                              sphere.scale.x = -1;
                              scene.add(sphere);
                              LoadingSpinnerFct.hide('vrPlayerLoader');
                            }

                        });
                    }

                    function animate() {
                        requestAnimationFrame(animate);
                        render();
                        controls.update();
                    }

                    function onMouseWheel(evt) {
                        evt.preventDefault();

                        if (evt.wheelDeltaY) {
                            camera.fov -= evt.wheelDeltaY + 0.05;
                        } else if (evt.wheelDelta) {
                            camera.fov -= evt.wheelDelta * 0.05;
                        } else if (evt.detail) {
                            camera.fov += evt.detail * 1.0;
                        }
                        camera.fov = Math.max(20, Math.min(100, camera.fov));
                        camera.updateProjectionMatrix();
                    }

                    function resize() {
                        camera.aspect = canvasParent.parentElement.clientWidth / canvasParent.parentElement.clientHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(canvasParent.parentElement.clientWidth, canvasParent.parentElement.clientHeight);
                        render();
                    }

                    // http://stackoverflow.com/questions/21548247/clean-up-threejs-webgl-contexts
                    function remove (sphere) {
                      scene.remove(sphere);
                    }
                }
            };
        }
    ]);
