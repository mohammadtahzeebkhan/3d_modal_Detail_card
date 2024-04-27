import { OrbitControls } from "https://esm.sh/three/addons/controls/OrbitControls.js";
import { TrackballControls } from "https://esm.sh/three/addons/controls/TrackballControls.js";
import { RGBELoader } from "https://esm.sh/three/addons/loaders/RGBELoader.js";
import { GLTFLoader } from "https://esm.sh/three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from 'https://esm.sh/three/addons/loaders/DRACOLoader.js';
import * as THREE from "https://esm.sh/three";
//----------------------- Covid 19 ----------------------------

const loading1 = document.getElementById("loader-1")
const canvas1 = document.getElementById("webgl-1")
const scene1 = new THREE.Scene()
const textureLoader1 = new THREE.TextureLoader()
const sizes1 = {
    width: canvas1.width,
    height: canvas1.height
}

let model
const clock = new THREE.Clock()

// Base camera

const camera1 = new THREE.PerspectiveCamera(5, sizes1.width / sizes1.height, 0.1, 100)
camera1.position.set(0, 0, 10)
scene1.add(camera1)

// Lights

const ambient1 = new THREE.AmbientLight( 0xFFFFFF )
ambient1.intensity = .4
scene1.add( ambient1 )

const light1 = new THREE.HemisphereLight( 0xFFFFFF, 0x000000, 4 )
scene1.add( light1 );

const light2 = new THREE.DirectionalLight( '#F4F4DE', 4 )
scene1.add( light2 )
light2.position.set( 0, 5, -15 )

const light3 = new THREE.DirectionalLight( '#F4F4DE', .4 )
light3.position.set( 0, -5, 0 )

camera1.add( light2 )

//Controls

const controls1 = new OrbitControls(camera1, canvas1)
controls1.enableDamping = true
controls1.enableZoom = false
controls1.enablePan = false
controls1.minDistance = 20
controls1.maxDistance = 20
controls1.minPolarAngle = Math.PI / 4
controls1.maxPolarAngle = Math.PI / 4

//Loader
const loader1 = new GLTFLoader()
const dracoLoader1 = new DRACOLoader()

dracoLoader1.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
loader1.setDRACOLoader(dracoLoader1)
loader1.load('covid-19.glb',
    (gltf) => {
        model = gltf.scene
        scene1.add(model)
        loading1.style.display = 'none'
    },
)

// Renderer

const renderer1 = new THREE.WebGLRenderer({
    canvas: canvas1,
    antialias: true,
    alpha: true
})

renderer1.setSize(sizes1.width, sizes1.height)
renderer1.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer1.toneMapping = THREE.CineonToneMapping
renderer1.toneMappingExposure = 1.35
renderer1.outputColorSpace = THREE.SRGBColorSpace


// Animation

const tick1 = () => {
    if (model) 
    model.rotation.y += 0.2 * clock.getDelta()
    controls1.update()
    renderer1.render(scene1, camera1)
    window.requestAnimationFrame(tick1)
}

tick1()

//----------------------- Fire Ant ----------------------------

const loading2 = document.getElementById("loader-2")
const canvas2 = document.getElementById("webgl-2")
const scene2 = new THREE.Scene()
const textureLoader2 = new THREE.TextureLoader()
const sizes2 = {
    width: canvas2.width,
    height: canvas2.height
}

let model2
let mixer2
const clock2 = new THREE.Clock()

// Base camera

const camera2 = new THREE.PerspectiveCamera(15, sizes2.width / sizes2.height, 0.1, 100)
camera2.position.set(30, 20, 10)
scene2.add(camera2)

// Light

const ambient1b = new THREE.AmbientLight( 0xFFFFFF )
ambient1b.intensity = 0
scene2.add( ambient1b )

const light1b = new THREE.HemisphereLight( 0xFFFFFF, 0xFFFFFF, 1 )
scene2.add( light1b );

const light2b = new THREE.DirectionalLight( '#F4F4DE', 6)
light2b.position.set( 0, 6, 0 )
scene2.add( light2b )

const light3b = new THREE.DirectionalLight( '#F4F4DE', .8)
light3b.position.set( 0, -6, 0 )
scene2.add( light3b )

//Controls

const controls2 = new OrbitControls(camera2, canvas2)
controls2.enableDamping = true
controls2.enableZoom = false
controls2.enablePan = false
controls2.minDistance = 10
controls2.maxDistance = 10
controls2.minPolarAngle = Math.PI / 6
controls2.maxPolarAngle = Math.PI / 1.5

const controls2b = new TrackballControls(camera2, canvas2)
controls2b.noRotate = true
controls2b.noPan = true
controls2b.noZoom = false
controls2b.zoomSpeed = 1


//Loader + Animation

const loader2 = new GLTFLoader()
dracoLoader1.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
loader2.setDRACOLoader(dracoLoader1)

loader2.load('ant.glb',
    (gltf) => {
        model2 = gltf.scene
        scene2.add(model2)
        loading2 .style.display = 'none'
        mixer2 = new THREE.AnimationMixer(model2);
	      mixer2.clipAction( gltf.animations[ 0 ] ).play()
		    scene2.position.set(0,-0.5,0)
    },
)

const loader2b = new RGBELoader()
loader2b.load('https://assets.codepen.io/9400490/indoor-1.hdr', function(texture) {
	texture.mapping = THREE.EquirectangularReflectionMapping;
	scene2.environment = texture
  scene2.environmentRotation = new THREE.Euler( 0, -5, 0, 'XYZ' )
});

// Renderer

const renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
    antialias: true,
    alpha: true
})

renderer2.setSize(sizes2.width, sizes2.height)
renderer2.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer2.toneMapping = THREE.ACESFilmicToneMapping;
renderer2.outputColorSpace = THREE.SRGBColorSpace
renderer2.toneMappingExposure = .85


// Animation Loop

const tick2 = () => {
    const delta2 = clock2.getDelta()
	  if (mixer2)
	  mixer2.update( delta2 )
    if (model2) 
    model2.rotation.y += 0.2 * delta2
    controls2.update()
    const target = controls2.target
    controls2b.target.set(target.z, target.y, target.z)
    controls2b.update()
    renderer2.render(scene2, camera2)
    window.requestAnimationFrame(tick2)
}

tick2()


//----------------------- Water Bear ----------------------------

const loading3 = document.getElementById("loader-3")
const canvas3 = document.getElementById('webgl-3')
const scene3 = new THREE.Scene()
const textureLoader3 = new THREE.TextureLoader()
const sizes3 = {
    width: canvas3.width,
    height: canvas3.height
}

let model3
let mixer3
const clock3 = new THREE.Clock()

// Base camera

const camera3 = new THREE.PerspectiveCamera(22, sizes3.width / sizes3.height, 0.1, 100)
camera3.position.set(0, -5, 10)
scene3.add(camera3)

// Light

const light1c = new THREE.HemisphereLight( 0xFFFFFF, 0xFFFFFF, .1);
scene3.add( light1c )

const light2c = new THREE.DirectionalLight( '#FFFFFF', 1)
light2c.position.set( -20, 4, 0 )
light2c.castShadow = true; 
light2c.shadow.mapSize.width = 1024;
light2c.shadow.mapSize.height = 1024;
camera3.add(light2c)

//Controls

const controls3 = new OrbitControls(camera3, canvas3)
controls3.enableDamping = true
controls3.enableZoom = false
controls3.enablePan = false
controls3.minDistance = 10
controls3.maxDistance = 10
controls3.minPolarAngle = Math.PI / 6
controls3.maxPolarAngle = Math.PI / 1.2

const controls3b = new TrackballControls(camera3, canvas3);
controls3b.noRotate = true
controls3b.noPan = true
controls3b.noZoom = false
controls3b.zoomSpeed = 1

// Renderer
const renderer3 = new THREE.WebGLRenderer({
    canvas: canvas3,
    antialias: true,
    alpha: true
})

renderer3.setSize(sizes3.width, sizes3.height)
renderer3.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer3.toneMapping = THREE.ACESFilmicToneMapping
renderer3.toneMappingExposure = 1
renderer3.outputColorSpace = THREE.SRGBColorSpace
renderer3.shadowMap.enabled = true
renderer3.shadowMap.type = THREE.PCFSoftShadowMap

//Loader + Animation + Shadow

const loader3 = new GLTFLoader()
const dracoLoader = new DRACOLoader()

dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
loader3.setDRACOLoader(dracoLoader)

loader3.load('https://assets.codepen.io/9400490/water-bear.glb',
    (gltf) => {
        model3 = gltf.scene
        scene3.add(model3)
        loading3 .style.display = 'none'
        mixer3 = new THREE.AnimationMixer(model3);
	      mixer3.clipAction( gltf.animations[ 0 ] ).play()
	      model3.traverse(function(node) {
			  if(node.isMesh)
			  node.castShadow = true
			  node.receiveShadow = true
		});
    },
)


const loader3b = new RGBELoader()
loader3b.load('https://assets.codepen.io/9400490/sky-1.hdr', function(texture) {
	texture.mapping = THREE.EquirectangularReflectionMapping;
	scene3.environment = texture
	scene3.backgroundRotation = new THREE.Euler( 0, -1, 0, 'XYZ' )
  scene3.environmentRotation = new THREE.Euler( 0, -1, 0, 'XYZ' )
});

// Animation Loop

const tick3 = () => {
    const delta3 = clock3.getDelta()
	  if (mixer3)
	      mixer3.update( delta3 )
    if (model3) 
    model3.rotation.y += 0.2 * delta3
	  controls3.update()
    const target = controls3.target
	  controls3b.target.set(target.z, target.y, target.z)
	  controls3b.update()
    renderer3.render(scene3, camera3)
    window.requestAnimationFrame(tick3)
}

tick3()


//----------------------- Human Heart ----------------------------

const loading4 = document.getElementById("loader-4")
const canvas4 = document.getElementById("webgl-4")
const scene4 = new THREE.Scene()
const textureLoader4 = new THREE.TextureLoader()
const sizes4 = {
    width: canvas4.width,
    height: canvas4.height
}

let mixer4
let model4
const clock4 = new THREE.Clock()

// Base camera

const camera4 = new THREE.PerspectiveCamera(26, sizes4.width / sizes4.height, 0.1, 100)
camera4.position.set(25, 0, 10)
scene4.add(camera4)

// Light

const ambient1d = new THREE.AmbientLight(0xFFFFFF);
ambient1d.intensity = .3
scene4.add(ambient1d)

const light1d = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, .3);
scene4.add(light1d)

const light2d = new THREE.DirectionalLight('#F4F4DE', 1)
light2d.position.set(10, 2, 0)

camera4.add(light2d)

//Controls

const controls4 = new OrbitControls(camera4, canvas4)
controls4.enableDamping = true
controls4.enableZoom = false
controls4.enablePan = false
controls4.minDistance = 10
controls4.maxDistance = 10
controls4.minPolarAngle = Math.PI / 6
controls4.maxPolarAngle = Math.PI / 1.5

const controls4b = new TrackballControls(camera4, canvas4)
controls4b.noRotate = true
controls4b.noPan = true
controls4b.noZoom = false
controls4b.zoomSpeed = 1

//Loader + Animation

const loader4 = new GLTFLoader()
const dracoLoader3 = new DRACOLoader()
dracoLoader3.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
loader4.setDRACOLoader(dracoLoader3)

loader4.load('https://assets.codepen.io/9400490/human_heart.glb',
    (gltf) => {
        model4 = gltf.scene
        scene4.add(model4)
        loading4.style.display = "none"
        mixer4 = new THREE.AnimationMixer(model4);
        mixer4.clipAction(gltf.animations[0]).play()
    },
)

const loader4b = new RGBELoader();
loader4b.load('https://assets.codepen.io/9400490/sunset-2.hdr', function(texture) {
texture.mapping = THREE.EquirectangularReflectionMapping;
scene4.environment = texture;
scene4.environmentRotation = new THREE.Euler(0, -5, 0, 'XYZ');
});

// Renderer

const renderer4 = new THREE.WebGLRenderer({
    canvas: canvas4,
    antialias: true,
    alpha: true
})

renderer4.setSize(sizes4.width, sizes4.height)
renderer4.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer4.toneMapping = THREE.CineonToneMapping;
renderer4.outputColorSpace = THREE.SRGBColorSpace
renderer4.toneMappingExposure = 0.5

// Animation Loop

const tick4 = () => {
const delta4 = clock4.getDelta()
    if (mixer4)
        mixer4.update(delta4)
    controls4.update()
    const target = controls4.target
    controls4b.target.set(target.z, target.y, target.z)
    controls4b.update()
    renderer4.render(scene4, camera4)
    window.requestAnimationFrame(tick4)
}

tick4()

