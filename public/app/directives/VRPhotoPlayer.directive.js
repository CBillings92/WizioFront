angular.module('Directives')
    .directive('vrphotoplayerdirv', [
        function(){
            return {
                restrict: 'E',
                scope: {
                    photoUrl: '='
                },
                link: function($scope, elem, attrs){
                    var manualControl = false;
                    var longitude = 0;
                    var latitude = 0;
                    var savedX;
                    var savedY;
                    var savedLongitude;
                    var savedLatitude;

                    var photoUrl;

                    var webGLRenderer = new THREE.webGLRenderer();
                    renderer.setSize(this.width, this.height);

                    var scene = new THREE.Scene();

                    var camera = new THREE.PerspectiveCamera(100, this.width / this.height);
                    camera.target = new THREE.Vector3(0,0,0);

                    var sphere = new THREE.SphereGeometry(100,100,40);
                    sphere.applyMatrix(new THREE.Matrix4().makeScale(-1,1,1));

                    var sphereMaterial = new THREE.MeshBasicMaterial();
                    sphereMaterial.map = THREE.ImageUtils.loadTexture(photoUrl);

                    var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
                    scene.add(sphereMesh);

                    elem[0].addEventListener("mousedown", onMouseDown, false);
                    elem[0].addEventListener("mousemove", onMouseMove, false);
                    elem[0].addEventListener("mouseup", onMouseUp, false);

                    render();

                    function render(){
                        requestAnimationFrame(render);

                        if(!manualControl){
                            longitude += 0.1;
                        }

                        latitude = Math.max(-85, Math.min(85, latitude));

                        // moving the camera according to current latitude (vertical movement) and longitude (horizontal movement)
                        camera.target.x = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.cos(THREE.Math.degToRad(longitude));
                        camera.target.y = 500 * Math.cos(THREE.Math.degToRad(90 - latitude));
                        camera.target.z = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.sin(THREE.Math.degToRad(longitude));
                        camera.lookAt(camera.target);

                        rendere.render(scene, camera);
                    }
                    function onMouseDown(event) {
                        event.preventDefault();
                        manualControl = true;
                        savedX = event.clientX;
                        savedY = event.clientY;
                        savedLongitude = longitude;
                        savedLatitude = latitude;

                    }
                    function onMouseMove(event) {
                        if (manualControl) {
                            longitude = (savedX - event.clientX) * 0.1 + savedLongitude;
                            latitude = (event.clientX - savedY) * 0.1 + savedLatitude;

                        }
                    }
                    function onMouseUp(event) {
                        manualControl = false;
                    }
                }
            };
        }
    ])
