const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xFF0000, 1);

const light = new THREE.AmbientLight(0xffffff);
scene.add(light);

camera.position.z = 5;
const audio = new Audio();
audio.src = "/../sounds/sound.mp3";
const loader = new THREE.GLTFLoader();


class Doll {
    constructor() {
        loader.load("../models/scene.gltf", (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(.4, .4, .4);
            gltf.scene.position.set(0, -1, 0);
            this.doll = gltf.scene;
        })
    }

    lookBackward(){
        gsap.to(this.doll.rotation, {y: -3.15,duration: 1})
    }

    lookForward(){
        gsap.to(this.doll.rotation, {y: 0,duration: 1});
    }
}


let doll = new Doll();

window.addEventListener("keyup",checkKeyPress, false);
function checkKeyPress(key){
    if(key.keyCode == "66"){
        
        setTimeout(()=>{
            audio.play();
            renderer.setClearColor(0xFF0000, 1);
            doll.lookForward()
         },1000)
    }
    else if (key.keyCode == "65")
    {   
        
        setTimeout(()=>{
            audio.play();
            renderer.setClearColor(0x00FF00, 1);
            doll.lookBackward()
         },1000)
    }
} 



function animate() {
    renderer.render(scene, camera);

    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}