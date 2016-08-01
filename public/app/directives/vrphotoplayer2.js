angular.module('Directives')
    .directive('newVrPhotoPlayerDirv', [
        function() {
            return {
                restrict: 'E',
                link: function(scope, elem, attr) {

                    var camera, controls, scene, renderer, sphere;

                    //FIXME - DYNAMIC
                    //on image load from controller, load the image into the player
                    scope.$on('IMGLOAD', function IMGLOAD(event) {
                        newImage();
                    });

                    init(elem);
                    render();

                    function init(elem) {
                        console.dir('pppppppp');
                        camera = new THREE.PerspectiveCamera(100, elem[0].parentElement.clientWidth / elem[0].parentElement.clientHeight);
                        camera.position.x = 0.1;
                        camera.position.y = 0;

                        controls = new THREE.OrbitControls(camera);
                        controls.noPan = true;
                        controls.noZoom = true;
                        controls.autoRotate = true;
                        controls.autoRotateSpeed = 0.5;
                        controls.addEventListener('change', render);

                        scene = new THREE.Scene();

                        console.dir("WEBGLSUPPORT");
                        // console.dir(webglSupport);
                        // renderer = webglSupport ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
                        renderer = new THREE.WebGLRenderer();
                        renderer.setSize(elem[0].parentElement.clientWidth, elem[0].parentElement.clientHeight);
                        elem[0].appendChild(renderer.domElement);

                        elem[0].addEventListener('mousewheel', onMouseWheel, false);
                        elem[0].addEventListener('DOMMouseScroll', onMouseWheel, false);
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
                        camera.aspect = (elem[0].parentElement.clientWidth / elem[0].parentElement.clientHeight);
                        camera.updateProjectionMatrix();

                        webGLRenderer.setSize(elem[0].parentElement.clientWidth, elem[0].parentElement.clientHeight);
                    }


                    function newImage() {
                        THREE.ImageUtils.crossOrigin = '';
                        var loader = new THREE.TextureLoader();
                        loader.crossOrigin = '';
                        loader.load(scope.photoUrl, function(texture) {
                            // var texture = THREE.ImageUtils.loadTexture(scope.photoUrl);
                            console.dir(scope.photoUrl);
                            texture.minFilter = THREE.LinearFilter;

                            sphere = new THREE.Mesh(
                                new THREE.SphereGeometry(100, 20, 20),
                                new THREE.MeshBasicMaterial({
                                    map: texture
                                })
                            );

                            sphere.scale.x = -1;
                            scene.add(sphere);

                        });
                    }

                    function animate() {
                        // console.dir(controls.update);
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
                        camera.aspect = elem[0].parentElement.clientWidth / elem[0].parentElement.clientHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(elem[0].parentElement.clientWidth, elem[0].parentElement.clientHeight);
                        render();
                    }
                }
            };
        }
    ]);
