import { PlaneBufferGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three'

import Stats from 'three/examples/jsm/libs/stats.module.js'

/*

  This is the debug view, which
  allows for some insight into
  information about visualization

*/

export default class Debug {
  constructor(_context, _visible) {
    this.container = _context.container
    this.scene = _context.scene

    this.stats = new Stats()

    this.dom = document.createElement('div')
    this.dom.id = 'debug'
    this.style = this.dom.style

    this.unixclock = false

    let css = {
      'background': '#002',
      'padding': '0 10px',
      'position': 'fixed',
      'left': '80px',
      'top': '0',
      'line-height': '48px',
      'font-size': '16px',
      'font-weight': 'bold',
      'color': '#0ff',
      'z-index': '99999',
      'cursor': 'pointer',
      'opacity': '0.9'
    }

    Object.assign(this.style, css)

    let plane = new PlaneBufferGeometry(300, 400, 20, 20)
    let wireframe = new MeshBasicMaterial({
      wireframe: true,
      color: 0xcccccc,
      side: DoubleSide
    })

    this.grid = new Mesh(plane, wireframe)
    this.grid.rotation.x = (Math.PI * 90) / 180

    this.visible = _visible || false
  }

  setup() {
    this.container.appendChild(this.stats.dom)
    this.container.appendChild(this.dom)

    this.dom.addEventListener('click', () => {
      if (this.unixclock === true) {
        this.setunix(false)
      } else {
        this.setunix(true)
      }
    })

    this.scene.add(this.grid)

    if (this.visible === false) {
      this.hide()
    }

    window.addEventListener('keypress', e => {
      if (e.code === 'KeyD') {
        if (this.visible) {
          this.hide()
        } else {
          this.show()
        }
      }
    })
  }

  setunix(bool) {
    this.unixclock = bool
    let css
    if (bool === true) {
      css = {
        background: '#020',
        color: '#0f0'
      }
    } else {
      css = {
        background: '#002',
        color: '#0ff'
      }
    }
    Object.assign(this.style, css)
  }

  update(time) {
    if (this.visible) {
      this.stats.update()
      this.dom.innerHTML = this.unixclock ? time.now : time.string
    }
  }

  hide() {
    this.visible = false
    this.stats.dom.style.display = 'none'
    this.dom.style.display = 'none'
    this.scene.remove(this.grid)
  }

  show() {
    this.visible = true
    this.stats.dom.style.display = 'block'
    this.dom.style.display = 'block'
    this.scene.add(this.grid)
  }
}
