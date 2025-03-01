

//hero section
window.onload = function () {
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("welcome-section").appendChild(renderer.domElement);

    
    const light = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 5).normalize();
    scene.add(directionalLight);

    
    const loader = new THREE.GLTFLoader();
    let profileModel;

    loader.load('models/3dface.gltf', function (gltf) {
        profileModel = gltf.scene;
        scene.add(profileModel);

        
        profileModel.scale.set(0.3, 0.3, 0.3);
        profileModel.position.set(2.5, 0, 0);

        profileModel.rotation.y = Math.PI / 2;
        profileModel.rotation.x = Math.PI / 2;


        function updateModelPosition() {
            const screenWidth = window.innerWidth;
            if (screenWidth <= 960) {
              profileModel.position.set(0, 1, 0);
              camera.position.set(-0.125, 0, 5);
            } else {
              profileModel.position.set(2.5, 0, 0); 
              camera.position.set(-1.5, 0, 5);
            }
          }
          
          
          window.addEventListener("resize", updateModelPosition);
          
          
          updateModelPosition();


        

    }, undefined, function (error) {
        console.error("Error loading model:", error);
    });

    

    
    document.addEventListener("mousemove", (event) => {
        if (profileModel) {
            let mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            let mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

            
            let targetPosition = new THREE.Vector3(mouseX * 2, mouseY * 2, 2);
            profileModel.lookAt(targetPosition);
        }
    });

    
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    
    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};









//project hover

document.querySelectorAll(".project").forEach(project => {
    const video = project.querySelector(".animated-video");

    project.addEventListener("mouseenter", () => {
        video.play();
    });

    project.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
    });
});

