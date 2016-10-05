angular.module('Directives')
    .directive('newVrPhotoPlayerDirv', [ '$state',
        function($state) {
            return {
                restrict: 'E',
                controller: 'UnitMediaCtrl',
                templateUrl: $state.current.name ===
                    'LandingPage' ? 'public/app/modules/unitapp/viewtemplates/landingpagedemo.view.html' :
                    $state.current.name === 'Demo' ? 'public/app/modules/unitapp/viewtemplates/demo.views.html' :
                    $state.current.name === "DemoOneBackBay" ? 'public/app/modules/unitapp/viewtemplates/demoOneBackBay.views.html':
                    $state.current.name === 'DemoGreenStreet' ? 'public/app/modules/unitapp/viewtemplates/demoGreenStreet.views.html' :
                    $state.current.name === 'DemoWellington2Bed' ? 'public/app/modules/unitapp/viewtemplates/demoWellington2bed.view.html' :
                    $state.current.name === 'DemoWaterMarkOneBed' ? 'public/app/modules/unitapp/viewtemplates/demoWaterMarkOneBed.view.html' :
                    $state.current.name === 'DemoGreenWay0404' ? 'public/app/modules/unitapp/viewtemplates/demoGreenWay0404.view.html' :
                    $state.current.name === 'DemoGreenWay0503' ? 'public/app/modules/unitapp/viewtemplates/demoGreenWay0503.view.html' :
                    $state.current.name === 'DemoGreenWay0512' ? 'public/app/modules/unitapp/viewtemplates/demoGreenWay0512.view.html' :
                    $state.current.name === 'DemoGreenWay1401' ? 'public/app/modules/unitapp/viewtemplates/demoGreenWay1401.view.html' :
                    $state.current.name === 'DemoGreenWay1209' ? 'public/app/modules/unitapp/viewtemplates/demoGreenWay1209.view.html' :
                    $state.current.name === 'DemoGreenWay1707' ? 'public/app/modules/unitapp/viewtemplates/demoGreenWay1707.view.html' :
                    $state.current.name === 'DemoWaterMark04' ?  'public/app/modules/unitapp/viewtemplates/demoMetroMark04.view.html' :
                    $state.current.name === 'DemoWaterMark06' ?  'public/app/modules/unitapp/viewtemplates/demoMetroMark06.view.html' :
                    $state.current.name === 'DemoWaterMark12' ?  'public/app/modules/unitapp/viewtemplates/demoMetroMark12.view.html' :
                    $state.current.name === 'DemoWaterMark13' ?  'public/app/modules/unitapp/viewtemplates/demoMetroMark13.view.html' :
                    $state.current.name === 'DemoRiversEdgeB1' ?  'public/app/modules/unitapp/viewtemplates/demoRiversEdgeB1.view.html' :
                    $state.current.name === 'DemoRiversEdgeA2' ?  'public/app/modules/unitapp/viewtemplates/demoRiversEdgeA2.view.html' :
                    $state.current.name === 'DemoRiversEdgeA9' ?  'public/app/modules/unitapp/viewtemplates/demoRiversEdgeA9.view.html' :
                    null,
                link: function(scope, elem, attr) {
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
                    });

                    init(elem);
                    render();

                    function init(elem) {
                        console.dir(canvasParent);
                        camera = new THREE.PerspectiveCamera(100, canvasParent.parentElement.clientWidth / canvasParent.parentElement.clientHeight);
                        camera.position.x = 0.1;
                        camera.position.y = 0;

                        controls = new THREE.OrbitControls(camera);
                        controls.noPan = true;
                        controls.noZoom = true;
                        controls.autoRotate = true;
                        controls.autoRotateSpeed = 0.5;
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
                }
            };
        }
    ]);
