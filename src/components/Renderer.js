import { WebGLRenderer } from 'three'

export const Renderer = ({ antialias, alpha } = {}) => {
  let r = new WebGLRenderer({
    antialias: antialias,
    alpha: alpha
  })

  r.setSize(window.innerWidth, window.innerHeight)
  r.setClearColor(0xf5f5f5, 1.0)
  r.setClearAlpha(1.0)
  r.gammaOutput = true

  return r
}
