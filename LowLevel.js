
//LowLevel.js
let scene, camera, renderer, sphereMesh, ringMesh, controls;


// init function
function init() {
	
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x333333);
	
	//camera (fov, aspect ratio, near cull, far cull)
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
	
	// create the renderer with antialiasing
	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(window.innerWidth, 
									 window.innerHeight);
	
	// add render results as HTML dom object
	document.body.appendChild(renderer.domElement);
	
	//add orbit controls
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	var sphere = new THREE.SphereGeometry(0.5, 32, 16);
	var ring = new THREE.RingGeometry(0.8, 1.3, 30, 20);

	// toon material gives hard borders to shadows instead of a gradient
	var planetMat = new THREE.MeshToonMaterial({
		color: 0x948670
	});
	
	var ringsMat = new THREE.MeshToonMaterial({
		color: 0x948670,
		wireframe: true,
		flatShading: false,
		side: THREE.DoubleSide
	});
	
																						 
	// create the meshes for the cone and torus
	sphereMesh = new THREE.Mesh(sphere, planetMat);
	ringMesh = new THREE.Mesh(ring, ringsMat);
	
	// set an angle for the rotationRing
	ringMesh.rotation.x = Math.PI / 3;
	
	
	// add the shape to the scene
	scene.add(sphereMesh);
	scene.add(ringMesh); 
	
	// add light
	var light = new THREE.DirectionalLight(0xffffff, 1.0);
	light.position.set(1.5, 0, 3);
	light.target.position.set(1, 1, 1);
	scene.add(light);
	
	var amb = new THREE.AmbientLight(0xffffff, 0.0);
	scene.add(amb);
	// set the camera position
	camera.position.set(0, 0, 5);
	
}// end init

// update function
function update() {
	//torusMesh.rotation.x += 0.01;
	ringMesh.rotation.z += 0.01;
	controls.update();
	renderer.render(scene, camera);
	requestAnimationFrame(update);
}// end update

init();

update();