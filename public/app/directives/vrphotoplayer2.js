angular.module('Directives')
    .directive('newVrPhotoPlayerDirv', [
        function() {
            return {
                restrict: 'E',
                link: function(scope, elem, attr) {

                    var camera, controls, scene, renderer, sphere;
                    console.dir('1');
                    var webglSupport = (function() {
                        console.dir('2');
                        try {
                            console.dir('3');
                            var canvas = document.createElement('canvas');
                            console.dir('4');
                            return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
                        } catch (e) {
                            return false;
                        }
                    })();
                    //FIXME - DYNAMIC
                    scope.$on('IMGLOAD', function IMGLOAD(event) {
                        console.dir('5');
                        THREE.ImageUtils.crossOrigin = '';
                        var texture = THREE.ImageUtils.loadTexture(scope.photoUrl);

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

                    init(elem);
                    render();
                    console.dir("______");
                    console.dir(scene);
                    console.dir("______");
                    console.dir('6');
                    console.dir(elem);
                    console.dir('7');

                    function init(elem) {
                        camera = new THREE.PerspectiveCamera(75, elem.offsetWidth / elem.offsetHeight, 1, 1000);
                        camera.position.x = 0.1;
                        camera.position.y = 0;

                        controls = new THREE.OrbitControls(camera);
                        controls.noPan = true;
                        controls.noZoom = true;
                        controls.autoRotate = true;
                        controls.autoRotateSpeed = 0.5;

                        scene = new THREE.Scene();


                        renderer = webglSupport ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();

                        renderer.setSize(elem.offsetWidth, elem.offsetHeight);
                        console.dir(renderer);
                        elem[0].appendChild(renderer.domElement);

                        elem[0].addEventListener('mousewheel', onMouseWheel, false);
                        elem[0].addEventListener('DOMMouseScroll', onMouseWheel, false);

                        animate();


                        return {
                            resize: resize
                        };

                    }
                    function render() {
                        renderer.render(scene, camera);
                    }

                    function newImage() {
                        THREE.ImageUtils.crossOrigin = '';
                        var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
                        scene.add(sphereMesh);
                        sphereMesh.material.map = THREE.ImageUtils.loadTexture(scope.photoUrl);
                        sphereMesh.material.needsUpdate = true;
                    }

                    function animate() {
                        requestAnimationFrame(animate);
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
                        camera.aspect = elem.offsetWidth / elem.offsetHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(elem.offsetWidth, elem[0].offsetHeight);
                        render();
                    }
                }
            };
        }
    ]);
