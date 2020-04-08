import { Vector2 } from 'three'
import { vert } from './_vert'
import { frag } from './_frag'

const Shader = {
  uniforms: {
    u_time: {
      value: 0.0
    },
    u_resolution: {
      value: new Vector2()
    },
    u_amp: {
      value: 0.0
    }
  },
  defines: {
    PI: Math.PI
  },
  wireframe: false,
  vertexShader: vert,
  fragmentShader: frag
}

export { Shader }
