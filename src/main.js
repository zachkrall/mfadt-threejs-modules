// THREE.JS MODULES
import * as THREE from 'three'

// STATS
import Stats from 'three/examples/jsm/libs/stats.module'

// GUI
import * as dat from 'dat.gui'

// COMPONENTS
import Camera from './components/Camera'
import Renderer from './components/Renderer'

// OBJECTS
import Ball from './objects/Ball'

/* -------- SET UP -------- */
const container = document.querySelector('#app')

/*
   to use variables in the browser console,
   bind them to a "global" object which makes debugging easier
*/
global.camera = new Camera()
global.renderer = new Renderer({
  antialias: true,
  alpha: true,
  clearColor: 0xf5f5f5
})
global.scene = new THREE.Scene()

let time = 0

/* -------- SHARED PARAMETERS -------- */
const params = {
  cameraZoom: 40,
  noiseStrength: 4.0
}

/* -------- DAT GUI OPTIONS -------- */
let gui = new dat.GUI()

gui
  .add(params, 'noiseStrength')
  .min(0)
  .max(50)
  .step(0.1)

gui
  .add(params, 'cameraZoom')
  .min(40)
  .max(80)
  .step(0.1)

/* -------- STATS -------- */
let stats = new Stats()

/* -------- CREATE OBJECTS -------- */
let ball = new Ball({
  size: 10,
  resolution: 50
})

/* -------- START -------- */
const init = () => {
  // add renderer to container
  container.appendChild(renderer.domElement)
  // add stats to container
  container.appendChild(stats.dom)

  // add objects to scene
  scene.add(ball)
}
init()

/* -------- ANIMATION LOOP -------- */
const loop = () => {
  // anything we want to change during draw loop happens here

  ball.update({
    u_amp: params.noiseStrength,
    u_time: time
  })

  camera.position.set(0, 0, 100 - params.cameraZoom)

  // always keep this at bottom
  time += 0.1
  stats.update()
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}
loop()

/* -------- WINDOW RESIZE -------- */
window.addEventListener('resize', () => {
  let width = window.innerWidth
  let height = window.innerHeight

  // update ball u_resolution
  ball.update({
    u_resolution: [width, height]
  })

  // update camera projection matrix
  camera.aspect = width / height
  camera.updateProjectionMatrix()

  // update canvas dimensions
  renderer.setSize(width, height)
})
