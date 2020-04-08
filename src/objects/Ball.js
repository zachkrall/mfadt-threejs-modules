import * as THREE from 'three'
import { Shader } from '../shader/Shader'

export default class Ball extends THREE.Mesh {
  constructor() {
    let geo = new THREE.SphereBufferGeometry(10, 50, 50)

    let normalMaterial = new THREE.MeshNormalMaterial()

    let shader = Shader
    let shaderConfig = {
      uniforms: shader.uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      defines: shader.defines
    }
    shader.uniforms['u_time'].value = 0.0
    shader.uniforms['u_resolution'].value = [
      window.innerWidth,
      window.innerHeight
    ]
    let shaderMaterial = new THREE.ShaderMaterial(shaderConfig)

    let mat = shaderMaterial
    super(geo, mat)

    this.shader = shader

    console.log(shader.fragmentShader)
  }

  update({ u_amp, x, y, z } = {}) {
    // this.position.x = Math.sin(Date.now() * 0.001) * 5
    // this.rotation.y += 0.01

    this.shader.uniforms['u_time'].value += 0.1
    this.shader.uniforms['u_amp'].value = u_amp || 4.0
  }
}
