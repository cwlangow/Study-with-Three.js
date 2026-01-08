import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger)

const div3d = document.querySelector('.scene-3d')
const loader = new GLTFLoader();
const cena = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ alpha: true })
let root;

// Luzes
const luzAmbiente = new THREE.AmbientLight("white", .6)
const luzDirecional = new THREE.DirectionalLight("white", 3)
luzDirecional.position.set(.8, 1, 4)
luzDirecional.target.position.set(6, -1, 0)
cena.add(luzAmbiente, luzDirecional, luzDirecional.target)

renderer.setSize(window.innerWidth, window.innerHeight)
div3d.appendChild(renderer.domElement)

loader.load(
    './assets/apartment.glb',
    (gltf) => {
        console.log('Modelo carregado')
        root = gltf.scene
        root.position.set(6, -1, 0)
        root.rotation.x = .4
        root.rotation.y = .4
        root.rotation.z = 0.1
        cena.add(root)
        fly()
    },
    undefined,
    (error) => {
        console.error('Erro ao carregar GLB:', error)})

function animate() {
    requestAnimationFrame(animate)
    renderer.render(cena, camera)
}

camera.position.set(0, 0, 15)

function fly() {
    gsap.to(root.position, {
        y: -2,
        x: -5,
        scrollTrigger: {
            start: "25% 50%",
            end: "75% 50%",
            scrub: 1
        }
    })
    gsap.to(root.rotation, {
        y: -.8,
        x: .4,
        scrollTrigger: {
            start: "25% 50%",
            end: "75% 50%",
            scrub: 1
        }
    })
    gsap.to(root.rotation, {
        y: -.8,
        x: .4,
        scrollTrigger: {
            start: "25% 50%",
            end: "75% 50%",
            scrub: 1
        }
    })
}


animate()