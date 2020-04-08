// THREE.JS MODULES
import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'

// DAT GUI MODULE
import * as dat from 'dat.gui'

// COMPONENTS
import { Camera } from './components/Camera'
import { Renderer } from './components/Renderer'

// EVENT LISTENERS
import { resizeCanvas } from './utils/events'

// OBJECTS
import Ball from './objects/Ball'

/* -------- SET UP -------- */
const container = document.querySelector('#app')
const camera = Camera()
const renderer = Renderer({ antialias: true, alpha: true })
const scene = new THREE.Scene()
const stats = new Stats()
const gui = new dat.GUI()

/* -------- DAT GUI OPTIONS -------- */
const params = {
  cameraZoom: 40,
  noiseStrength: 4.0
}
gui.remember(params)
gui
  .add(params, 'noiseStrength')
  .min(0)
  .max(50)
  .step(0.1)

/* -------- CREATE OBJECTS -------- */
let ball = new Ball()

/* -------- START -------- */
const init = () => {
  // add renderer to document body
  container.appendChild(renderer.domElement)
  container.appendChild(stats.dom)

  // add resize canvas event listener
  resizeCanvas({ renderer, camera })

  // add objects to scene
  scene.add(ball)
}
init()

/* -------- ANIMATION LOOP -------- */
const loop = () => {
  // anything we want to change during draw loop happens here

  ball.update({
    u_amp: params.noiseStrength
  })

  camera.position.set(0, 0, params.cameraZoom)

  stats.update()

  // always keep this at bottom
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}
loop()
