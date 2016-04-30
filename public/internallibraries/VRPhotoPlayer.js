(function VrPhotoPlayer() {
    var manualControl = false;
    var longitude = 0;
    var latitude = 0;
    var savedX;
    var savedY;
    var savedLongitude;
    var savedLatitude;

    // panoramas background
    var panoramasArray = ["public/assets/equirect-5376x2688-bf11b3a4-c73a-45f6-a080-493a79340ffc.jpg"];
    var panoramaNumber = 0;

    // setting up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // creating a new scene
    var scene = new THREE.Scene();

    // adding a camera
    var camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 1000);
    camera.target = new THREE.Vector3(0, 0, 0);

    // creation of a big sphere geometry
    var sphere = new THREE.SphereGeometry(50, 50, 40[]);
    sphere.applyMatrix(new THREE.Matrix4().makeScale(-1, 1, 1));

    // creation of the sphere material
    var sphereMaterial = new THREE.MeshBasicMaterial();
    sphereMaterial.map = THREE.ImageUtils.loadTexture(panoramasArray[panoramaNumber])

    // geometry + material = mesh (actual object)
    var sphereMesh = new THREE.Mesh(sphere, sphereMaterial);
    scene.add(sphereMesh);

    // listeners
    document.addEventListener("mousedown", onMouseDown, false);
    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("mouseup", onMouseUp, false);

    render();

    function render() {

        requestAnimationFrame(render);

        if (!manualControl) {
            longitude += 0.1;
        }

        // limiting latitude from -85 to 85 (cannot point to the sky or under your feet)
        latitude = Math.max(-85, Math.min(85, latitude));

        // moving the camera according to current latitude (vertical movement) and longitude (horizontal movement)
        camera.target.x = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.cos(THREE.Math.degToRad(longitude));
        camera.target.y = 500 * Math.cos(THREE.Math.degToRad(90 - latitude));
        camera.target.z = 500 * Math.sin(THREE.Math.degToRad(90 - latitude)) * Math.sin(THREE.Math.degToRad(longitude));
        camera.lookAt(camera.target);

        // calling again render function
        renderer.render(scene, camera);

    }

    // when the mouse is pressed, we switch to manual control and save current coordinates
    function onMouseDown(event) {

        event.preventDefault();

        manualControl = true;

        savedX = event.clientX;
        savedY = event.clientY;

        savedLongitude = longitude;
        savedLatitude = latitude;

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

    // pressing a key (actually releasing it) changes the texture map

}());
