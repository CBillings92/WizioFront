angular.module('Directives')
    .directive('vrPhotoPlayerDirv', [
        function() {
            return {
                restrict: 'E',
                link: function(scope, elem, attrs) {
                    var manualControl = false;
                    var longitude = 0;
                    var latitude = 0;
                    var savedX;
                    var savedY;
                    var savedLongitude;
                    var savedLatitude;
                    console.dir(scope.photoUrl);
                    var webGLRenderer = new THREE.WebGLRenderer();
                    webGLRenderer.setSize(elem[0].parentElement.clientWidth, elem[0].parentElement.clientHeight);
                    webGLRenderer.domElement.className = 'col-md-12';
                    console.dir(webGLRenderer.domElement);

                    elem[0].appendChild(webGLRenderer.domElement);

                    var scene = new THREE.Scene();
                    console.dir(elem[0].parentElement);
                    var camera = new THREE.PerspectiveCamera(100, elem[0].parentElement.clientWidth / elem[0].parentElement.clientHeight);
                    camera.target = new THREE.Vector3(0, 0, 0);

                    var sphere = new THREE.SphereGeometry(100, 100, 40);
                    sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

                    var sphereMaterial = new THREE.MeshBasicMaterial();
                    scope.$on('IMGLOAD', function IMGLOAD(event, data) {
                        console.dir(data);
                        THREE.ImageUtils.crossOrigin = '';
                        sphereMaterial.map = THREE.ImageUtils.loadTexture(scope.photoUrl);
                    })

                    var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
                    scene.add(sphereMesh);
                    elem[0].addEventListener("mousedown", onMouseDown, false);
                    elem[0].addEventListener("mousemove", onMouseMove, false);
                    elem[0].addEventListener("mouseup", onMouseUp, false);
                    window.addEventListener("resize", resize, false);

                    preRender();
                    render();
                    scope.$on('CHANGE', function() {
                        newImage();
                    })

                    function resize() {
                        camera.aspect = (elem[0].parentElement.clientWidth / elem[0].parentElement.clientHeight);
                        camera.updateProjectionMatrix();

                        webGLRenderer.setSize(elem[0].parentElement.clientWidth, elem[0].parentElement.clientHeight);
                    }

                    function newImage() {
                        sphereMesh.material.map = THREE.ImageUtils.loadTexture(scope.photoUrl);
                        sphereMesh.material.needsUpdate = true;
                    }

                    function preRender() {

                        return;
                    }

                    function render() {
                        requestAnimationFrame(render);

                        if (!manualControl) {
                            longitude += 0.1;
                        }

                        latitude = Math.max(-85, Math.min(85, latitude));

                        // moving the camera according to current latitude (vertical movement) and longitude (horizontal movement)
                        camera.target.x = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.cos(THREE.Math.degToRad(longitude));
                        camera.target.y = 500 * Math.cos(THREE.Math.degToRad(90 - latitude));
                        camera.target.z = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.sin(THREE.Math.degToRad(longitude));
                        camera.lookAt(camera.target);

                        webGLRenderer.render(scene, camera);
                    }

                    // when the mouse is pressed, we switch to manual control and save current coordinates
                    function onMouseDown(event) {

                        event.preventDefault();

                        manualControl = true;

                        savedX = event.clientX;
                        savedY = event.clientY;

                        savedLongitude = longitude;
                        savedLatitude = latitude;
                        return;
                    }

                    // when the mouse moves, if in manual contro we adjust coordinates
                    function onMouseMove(event) {

                        if (manualControl) {
                            longitude = (savedX - event.clientX) * 0.1 + savedLongitude;
                            latitude = (event.clientY - savedY) * 0.1 + savedLatitude;
                        }

                    }

                    // when the mouse is released, we turn manual control off
                    function onMouseUp(event) {

                        manualControl = false;
                    }
                }
            };
        }
    ]);
