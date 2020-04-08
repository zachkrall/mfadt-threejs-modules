export function resizeCanvas({ renderer, camera } = {}) {
  window.addEventListener('resize', () => {
    let width = window.innerWidth
    let height = window.innerHeight

    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  })
}
