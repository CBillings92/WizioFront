angular.module('Directives')
    .directive('newVrPhotoPlayerDirv', [
        function() {
            return {
                restrict: 'E',
                link: function(scope, elem, attr) {
                    //create variables
                    var camera, controls, scene, renderer, sphere;
                    console.dir('1');

                    //check if webgl is supported
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
                    //on image load from controller, load the image into the player
                    scope.$on('IMGLOAD', function IMGLOAD(event) {
                        console.dir('5');
                        THREE.ImageUtils.crossOrigin = '';
                        var loader = new THREE.TextureLoader();
                        loader.crossOrigin = '';
                        loader.load(scope.photoUrl, function(texture){
                            // var texture = THREE.ImageUtils.loadTexture(scope.photoUrl);
                            console.dir(scope.photoUrl);
                            texture.minFilter = THREE.LinearFilter;

                            sphere = new THREE.Mesh(
                                new THREE.SphereGeometry(100, 100, 20),
                                new THREE.MeshBasicMaterial({
                                    map: texture
                                })
                            );
                            // sphere.scale.x = -1;
                            scene.add(sphere);
                            render();

                        });

                    });

                    init(elem);
                    console.dir("______");
                    console.dir("______");
                    console.dir('6');
                    console.dir(elem);
                    console.dir('7');

                    function init(elem) {
                        console.dir('pppppppp');
                        console.dir(elem[0].offsetWidth);
                        camera = new THREE.PerspectiveCamera(100, elem[0].parentElement.clientWidth / elem[0].parentElement.clientHeight, 1, 1000);
                        camera.position.x = 0.1;
                        camera.position.y = 0;

                        controls = new THREE.OrbitControls(camera);
                        controls.noPan = true;
                        controls.noZoom = true;
                        controls.autoRotate = true;
                        controls.autoRotateSpeed = 0.5;

                        scene = new THREE.Scene();

                        console.dir("WEBGLSUPPORT");
                        console.dir(webglSupport);
                        renderer = webglSupport ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();

                        renderer.setSize(elem[0].parentElement.clientWidth, elem[0].parentElement.clientHeight);
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
                        console.dir(scene);
                        renderer.render(scene, camera);
                    }

                    function newImage() {
                        THREE.ImageUtils.crossOrigin = '';
                        console.dir("INHERE");
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
                        camera.aspect = elem[0].parentElement.clientWidth / elem[0].parentElement.clientHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(elem[0].parentElement.clientWidth, elem[0].parentElement.clientHeight);
                        render();
                    }
                }
            };
        }
    ]);
