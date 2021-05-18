import './style.module.css';
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import * as dat from 'dat.gui'

// Debug




// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xC0C0C0 );

// GridHelper
scene.add( new THREE.GridHelper(12,12) );

// Lights
const light = new THREE.DirectionalLight( 0xFFFFFF );
light.position.set( 10, 10, 10 );

const pointLight = new THREE.PointLight(0xffffff, .5)
pointLight.position.x = 1
pointLight.position.y = 2
pointLight.position.z = 3
scene.add(pointLight)

let sphereButton = document.getElementById('sphere');
function sphereFunc () {
    const sphereGeometry = new THREE.SphereBufferGeometry( 1, 32, 64 );
    const sphereMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x708090, shininess: 0} );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.x = Math.random() * -5;
    sphere.position.y = Math.random() * 5;
    sphere.position.z = Math.random() * 5;
    scene.add( sphere );
    let div = document.getElementById('div')
    let info = document.createElement('div')
    
    info.innerHTML = sphere.uuid + ' Sphere';
    let removeBtn = document.createElement('button')
    removeBtn.innerHTML = 'Remove';
    info.classList.add('info')
    div.appendChild(info);
    
    console.log(sphere.uuid);
    
    div.appendChild(removeBtn)
    
    const gui = new dat.GUI()
    const sphereFolder = gui.addFolder("Sphere");
    sphereFolder.add(sphere.scale, "x", 0, 2);
    sphereFolder.add(sphere.scale, "y", 0, 2);
    sphereFolder.add(sphere.scale, "z", 0, 2);

    removeBtn.addEventListener('click', function () {
        scene.remove(sphere)
        gui.destroy();
        info.remove();
        removeBtn.remove()
    }) 
}

sphereButton.addEventListener('click', sphereFunc);

let cubeButton = document.getElementById('cube');
function cubeFunc () {
    const geometry = new THREE.BoxGeometry( 1, 1, 1);
    const material = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x708090, shininess: 0} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = Math.random() * 5;
    cube.position.y = Math.random() * 5;
    cube.position.z = Math.random() * 5;
    scene.add( cube );
    let div = document.getElementById('div')
    let info = document.createElement('div')
    
    info.innerHTML = cube.uuid + ' Cube';
    let removeBtn = document.createElement('button')
    removeBtn.innerHTML = 'Remove';
    info.classList.add('info')
    div.appendChild(info);
    
    console.log(cube.uuid);
    
    div.appendChild(removeBtn)

    const gui = new dat.GUI()
    const cubeFolder = gui.addFolder("Cube");
    cubeFolder.add(cube.scale, "x", 0, 2);
    cubeFolder.add(cube.scale, "y", 0, 2);
    cubeFolder.add(cube.scale, "z", 0, 2);

    removeBtn.addEventListener('click', function () {
        scene.remove(cube)
        gui.destroy();
        info.remove();
        removeBtn.remove();
    }) 

    
}

cubeButton.addEventListener('click', cubeFunc);

let coneButton = document.getElementById('cone');
function coneFunc () {
    const coneGeometry = new THREE.ConeGeometry( 1.5, 4, 16 );
    const coneMaterial = new THREE.MeshPhongMaterial( {color: 0xffffff, emissive: 0x708090, shininess: 0} );
    const cone = new THREE.Mesh( coneGeometry, coneMaterial );

    cone.position.x = Math.random() * 5;
    cone.position.y = Math.random() * 5;
    cone.position.z = Math.random() * -5;
    cone.rotation.z = Math.random() * 5;
    cone.rotation.x = Math.random() * 5;
    cone.rotation.y = Math.random() * 5;
    scene.add( cone );

    let div = document.getElementById('div')
    let info = document.createElement('div')
    
    info.innerHTML = cone.uuid + ' Cone';
    let removeBtn = document.createElement('button')
    removeBtn.innerHTML = 'Remove';
    info.classList.add('info')
    div.appendChild(info);
    
    console.log(cone.uuid);
    
    div.appendChild(removeBtn)
    
    const gui = new dat.GUI()
    const coneFolder = gui.addFolder("Cone");
    coneFolder.add(cone.scale, "x", 0, 2);
    coneFolder.add(cone.scale, "y", 0, 2);
    coneFolder.add(cone.scale, "z", 0, 2);

    removeBtn.addEventListener('click', function () {
        scene.remove(cone)
        gui.destroy();
        info.remove();
        removeBtn.remove()
    }) 


}
coneButton.addEventListener('click', coneFunc);



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.01, 1000)
camera.position.x = 4
camera.position.y = 5
camera.position.z = 7
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const tick = () =>
{
    
    renderer.render(scene, camera)

    
    window.requestAnimationFrame(tick)
}

tick()