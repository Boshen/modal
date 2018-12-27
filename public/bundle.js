;(function() {
  'use strict'

  var Modal = /** @class */ (function() {
    function Modal(_a) {
      var content = _a.content
      var _this = this
      this.handleEsc = function(e) {
        if (e.keyCode === 27) {
          _this.close()
        }
      }
      this.handleOverlayClick = function(e) {
        if (e.target === e.currentTarget) {
          _this.close()
        }
      }
      this.content = content
      this.modal = document.createElement('div')
      this.overlay = document.createElement('div')
    }
    Modal.prototype.show = function() {
      this.createModal()
      this.addEventListeners()
    }
    Modal.prototype.close = function() {
      this.removeEventListeners()
      this.modal.remove()
    }
    Modal.prototype.addEventListeners = function() {
      this.overlay.addEventListener('click', this.handleOverlayClick)
      document.addEventListener('keydown', this.handleEsc)
    }
    Modal.prototype.removeEventListeners = function() {
      this.overlay.removeEventListener('click', this.handleOverlayClick)
      document.removeEventListener('keydown', this.handleEsc)
    }
    Modal.prototype.createModal = function() {
      document.body.appendChild(this.modal)
      var container = document.createElement('div')
      this.modal.appendChild(this.overlay)
      this.overlay.appendChild(container)
      container.appendChild(this.content)
      this.overlay.setAttribute(
        'style',
        '\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: rgba(0,0,0,.6);\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    '
      )
      container.setAttribute('style', '\n      background-color: #fff;\n      max-height: 100vh;\n    ')
    }
    return Modal
  })()
  var button = document.getElementById('modal-button')
  var modalContent = document.createElement('div')
  modalContent.setAttribute(
    'style',
    '\n  overflow-y: auto;\n  box-sizing: border-box;\n  padding: 30px;\n  max-width: 500px;\n  border-radius: 1px;\n'
  )
  modalContent.innerHTML = '\n  <div>\n    <h1>Modal Title</h1>\n    <div>Modal Body</div>\n  </div>\n'
  var modal1 = new Modal({
    content: modalContent,
  })
  button.onclick = function() {
    return modal1.show()
  }
})()
//# sourceMappingURL=bundle.js.map
