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

                        controls = new THREE.OrbitControls(camera);
                        controls.noPan = true;
                        controls.noZoom = true;
                        controls.autoRotate = true;
                        controls.autoRotateSpeed = 0.5;
                        controls.addEventListener('change', render);



                    //  setupControllerEventHandlers(controls);
                        scene = new THREE.Scene();
                        renderer = webglSupport ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
                        // Commented and kept for testing purposes
                        // renderer = new THREE.CanvasRenderer();
                        renderer.setSize(canvasParent.parentElement.clientWidth, canvasParent.parentElement.clientHeight);
                        canvasParent.appendChild(renderer.domElement);
                        canvasParent.addEventListener('mousewheel', onMouseWheel, false);
                        canvasParent.addEventListener('DOMMouseScroll', onMouseWheel, false);
                        window.addEventListener('resize', resize, false);
                        // controls.addEventListener('change', render);

                        animate();


                        return {
                            resize: resize
                        };

                    }

                    scope.$on('CHANGE', function() {
                        newImage();
                    });
                    scope.$on('accelerometer-toggle', function(event,accelToggle){
                        if(accelToggle.flag){
                          controls = new DeviceOrientationController(camera);
                          controls.connect();
                          controls.update();
                        } else {
                          controls = new THREE.OrbitControls(camera);
                          controls.noPan = true;
                          controls.noZoom = true;
                          controls.autoRotate = true;
                          controls.autoRotateSpeed = 0.5;
                          controls.update();
                          //controls.addEventListener('change', render);
                        }
                    })
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
                                    // color: 0x000000,
                                    // shading: THREE.FlatShading,
                                    map: texture,
                                    // transparent: true
                                    // side: THREE.BackSide,
                                    overdraw: .5
                                    // wireframe: false,
                                    // overdraw: 1,

                                })
                              );

                              sphere.scale.x = -1;
                              scene.add(sphere);
                              LoadingSpinnerFct.hide('vrPlayerLoader');

                            } else {
                              sphere = new THREE.Mesh(
                                new THREE.SphereGeometry(100, 60, 40),
                                new THREE.MeshBasicMaterial({
                                  map: texture,
                                  overdraw: .5,
                                //   wireframe: false,
                                //   wireframe: false,
                                //   color: 0x000000,
                                //   shading: THREE.FlatShading,
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
                        controls.update();
                        render();
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
