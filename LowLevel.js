
//LowLevel.js
let scene, camera, renderer, sphereMesh, ringMesh, ringMesh2;

// globals for OrbitControls and outline effect.
let controls, effect;
// init function
function init() {
	
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x555555);
	
	//camera (fov, aspect ratio, near cull, far cull)
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
	
	// create the renderer with antialiasing
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, 
									 window.innerHeight);
	
	// add render results as HTML dom object
	document.body.appendChild(renderer.domElement);
	effect = new THREE.OutlineEffect(renderer);

	//add orbit controls
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	// the sphere and ring geometry to make something like the planet Saturn
	var sphere = new THREE.SphereGeometry(0.5, 32, 16);
	var ring = new THREE.RingGeometry(0.8, 1.3, 60, 30);
	
	var cube = new THREE.BoxGeometry(40, 40, 1);
	
	// toon material gives hard borders to shadows instead of a gradient
	var planetMat = new THREE.MeshToonMaterial({
		color: 0x948670
	});
	
	// wireframe version of the toon meshe
	// this allows for the rotation of the ring to be clearly visible
	var ringsMat = new THREE.MeshToonMaterial({
		color: 0x948670,
		side: THREE.DoubleSide
	});
	
	planetMat.userData.outlineParameters = {
		thickness: 0.01
	}
	
	ringsMat.userData.outlineParameters = {
		thickness: 0.01
		
	};

	// create the meshes for the cone and ring
	// since the ring is a 2D geometry, its normal vectors
	// don't work right for the outline effect,
	// the effect is slightly helped by adding 2
 	sphereMesh = new THREE.Mesh(sphere, planetMat);
	ringMesh = new THREE.Mesh(ring, ringsMat);
	ringMesh2 = new THREE.Mesh(ring, ringsMat);
	
	// set an angle for the rotationRing
	ringMesh.rotation.x = Math.PI / 2;
	// flip the second ringMesh
	ringMesh2.rotation.x = 3 * Math.PI / 2
	
	// add the meshes to the scene
	scene.add(sphereMesh);
	scene.add(ringMesh); 
	scene.add(ringMesh2); 
	
	
	// add light
	var light = new THREE.DirectionalLight(0xffffff, 1.0);
	light.position.set(3, 1, 5);
	light.target.position.set(1, 1, 1);
	scene.add(light);
	
	// set the camera position
	camera.position.set(0, 0.5, 5);
	camera.rotation.x = -0.5
	
	
}// end init

// update function
function update(now) {
	//keep track of delta time
	now *= 0.001;
	var dTime = now - then;
	then = now;
	
	// make it so the ring mesh changes its tilt back and forth
	ringMesh.rotation.x += Math.sin(now) / (50 * Math.PI);
	ringMesh.rotation.z += 0.005;
	ringMesh2.rotation.x += Math.sin(now) / (50 * Math.PI);
	ringMesh2.rotation.z -= 0.005;
	
	// update the orbit controls
	controls.update();
	
	// call render from the effect instead of directly from the renderer
	effect.render(scene, camera);
	requestAnimationFrame(update);
}// end update

// call init
init();

// then variable to keep track of delta time.
let then = 0;
requestAnimationFrame(update);