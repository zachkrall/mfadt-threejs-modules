import { PerspectiveCamera } from 'three'

export const Camera = ({} = {}) => {
  let c = new PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  c.position.set(0, 0, 40)
  c.lookAt(0, 0, 0)

  return c
}
