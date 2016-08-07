angular.module('Directives')
    .directive('vrPhotoPlayerDirv', [
        function() {
            return {
                restrict: 'E',
                link: function(scope, elem, attrs) {

                    //set variables
                    //crceate a webGLRenderer
                    //create a Three scene
                    //create a Three camera(100, width, height)
                    //Create a Three spheregeometery(100,100,40)
                    //Create a new MeshBasicMatreal
                    //Set Size - WebGLRenderer
                    //Add webGLRender to Doc
                    //set the camera target to a three Vector3
                    //apply a matrix to the three sphere
                    //add event listeners
                    //call render function
                    //requestAnimationFrame
                    //change camera targets
                    //WebGLRenderer.render(camera, scene);
                    var manualControl = false;
                    var longitude = 0;
                    var latitude = 0;
                    var savedX;
                    var savedY;
                    var savedLongitude;
                    var savedLatitude;
                    //create a new webGL renderer that will render our vr player
                    var webGLRenderer = new THREE.WebGLRenderer();
                    //create a new scene that our VR/three SPHERE will live on
                    var scene = new THREE.Scene();
                    //FIXME needs documentation
                    var camera = new THREE.PerspectiveCamera(100, elem[0].parentElement.clientWidth / elem[0].parentElement.clientHeight);
                    var sphere = new THREE.SphereGeometry(100, 100, 40);
                    var sphereMaterial = new THREE.MeshBasicMaterial();

                    //set the size of the vr player
                    webGLRenderer.setSize(elem[0].parentElement.clientWidth, elem[0].parentElement.clientHeight);
                    // webGLRenderer.domElement.className = 'col-md-12';

                    //set the vr player in the DOM as the child of the directive
                    elem[0].appendChild(webGLRenderer.domElement);
                    //FIXME set documentation
                    camera.target = new THREE.Vector3(0, 0, 0);
nnn
                    sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

                    //on an image load event (fired from the controller)
                    scope.$on('IMGLOAD', function IMGLOAD(event, data) {
                        //handle cross origin issues
                        THREE.ImageUtils.crossOrigin = '';
                        //set the texture of the sphere with the equirect photo
                        sphereMaterial.map = THREE.ImageUtils.loadTexture(scope.photoUrl);
                        //remake the sphereMesh
                        var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
                        //add the sphereMesh to the scene
                        scene.add(sphereMesh);
                    });
                    elem[0].addEventListener("mousedown", onMouseDown, false);
                    elem[0].addEventListener("mousemove", onMouseMove, false);
                    elem[0].addEventListener("mouseup", onMouseUp, false);
                    // elem[0].addEventListener("touchstart", touchstart, false);
                    // elem[0].addEventListener("touchend", touchend, false);
                    // elem[0].addEventListener("touchmove", touchmove, false);
                    window.addEventListener("resize", resize, false);
                    render();
                    scope.$on('CHANGE', function() {
                        newImage();
                    });

                    function resize() {
                        camera.aspect = (elem[0].parentElement.clientWidth / elem[0].parentElement.clientHeight);
                        camera.updateProjectionMatrix();

                        webGLRenderer.setSize(elem[0].parentElement.clientWidth, elem[0].parentElement.clientHeight);
                    }

                    function newImage() {
                        THREE.ImageUtils.crossOrigin = '';
                        var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
                        scene.add(sphereMesh);
                        sphereMesh.material.map = THREE.ImageUtils.loadTexture(scope.photoUrl);
                        sphereMesh.material.needsUpdate = true;
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

                    //handles the touchstart event. Fires when a touch is
                    //registered on mobile touch screen devices
                    function touchstart(event) {
                        switch (event.touches.length) {
                            case 1:

                                break;
                            default:

                        }
                    }
                }
            };
        }
    ]);
