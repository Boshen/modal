export interface ModalProps {
  content: HTMLElement
  zIndex?: number
  closeOnOverlay?: boolean
  useKeyboard?: boolean
  onOpen?: (modal: Modal) => void
  onClose?: (modal: Modal) => void
  onClick?: (e: MouseEvent, modal: Modal) => void
}

const noop = () => {}

export class Modal {
  private static modalsOpened: Modal[] = []

  private readonly content: HTMLElement
  private readonly closeOnOverlay: boolean
  private readonly zIndex: number
  private readonly useKeyboard: boolean
  private readonly onClickModal: ((e: MouseEvent, modal: Modal) => void)
  private readonly onOpenModal: ((modal: Modal) => void)
  private readonly onCloseModal: ((modal: Modal) => void)

  private modal: HTMLElement | null = null
  private overlay: HTMLElement | null = null

  /**
   * Create a Modal, the modal is not opened yet
   * @param {HTMLElement} content - the html content inside the modal
   * @param {boolean} [closeOnOverlay=true] - close the modal if the overflay is clicked
   * @param {boolean} [zIndex=1000] - z index of the modal
   * @param {boolean} [useKeyboard=true] - handle keyboard events (esc will close the modal)
   * @param {clickModalCallback} [onClick] - callback for mouse events on the modal
   * @param {modalCallback} [onOpen] - callback when the modal is opened
   * @param {modalCallback} [onClose] - callback when the modal is closed
   *
   */
  constructor({
    content,
    closeOnOverlay = true,
    zIndex = 1000,
    useKeyboard = true,
    onClick = noop,
    onOpen = noop,
    onClose = noop,
  }: ModalProps) {
    this.content = content
    this.closeOnOverlay = closeOnOverlay
    this.zIndex = zIndex
    this.useKeyboard = useKeyboard
    this.onClickModal = onClick
    this.onOpenModal = onOpen
    this.onCloseModal = onClose
  }

  /**
   * Open the modal
   */
  public open() {
    Modal.modalsOpened.push(this)
    this.openModal()
    this.addEventListeners()
  }

  /**
   * Close the modal
   */
  public close() {
    Modal.modalsOpened.pop()
    this.removeEventListeners()
    this.closeModal()
  }

  private addEventListeners() {
    this.modal!.addEventListener('click', this.handleClick)
    if (this.useKeyboard) {
      document.addEventListener('keydown', this.handleEsc)
    }
  }

  private removeEventListeners() {
    this.modal!.removeEventListener('click', this.handleClick)
    if (this.useKeyboard) {
      document.removeEventListener('keydown', this.handleEsc)
    }
  }

  private handleEsc = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      Modal.modalsOpened[Modal.modalsOpened.length - 1].close()
    }
  }

  private handleClick = (e: MouseEvent) => {
    this.onClickModal(e, this)
    if (e.target === this.overlay && this.closeOnOverlay) {
      this.close()
    }
  }

  private openModal() {
    this.modal = document.createElement('div')
    this.overlay = document.createElement('div')
    const container = document.createElement('div')

    document.body.appendChild(this.modal)
    this.modal.appendChild(this.overlay)
    this.overlay.appendChild(container)
    container.appendChild(this.content)

    this.modal.setAttribute(
      'style',
      `
      z-index: ${this.zIndex}
      `
    )
    this.overlay.setAttribute(
      'style',
      `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: ${Modal.modalsOpened.length === 1 ? 'rgba(0,0,0,.6)' : 'default'};
      display: flex;
      justify-content: center;
      align-items: center;
    `
    )
    container.setAttribute(
      'style',
      `
      background-color: #fff;
      max-height: 80vh;
      overflow-y: auto;
    `
    )

    this.toggleBodyScroll(false)
    this.modal.style.transition = 'opacity .3s ease-out'
    this.modal.style.opacity = '0'
    window.setTimeout(() => {
      this.modal!.style.opacity = '1'
      this.onOpenModal(this)
    }, 1)
  }

  private closeModal() {
    if (!this.modal) {
      return
    }
    this.modal.style.transition = 'opacity .15s ease-in'
    this.modal.style.opacity = '0'
    window.setTimeout(() => {
      this.toggleBodyScroll(true)
      this.modal!.remove()
      this.onCloseModal(this)
    }, 150)
  }

  private toggleBodyScroll(openScroll: boolean) {
    const body = document.querySelector('body')!
    if (!openScroll && Modal.modalsOpened.length === 1) {
      body.style.overflow = 'hidden'
      body.style.paddingRight = '15px'
    }
    if (openScroll && Modal.modalsOpened.length === 0) {
      body.style.overflow = null
      body.style.paddingRight = null
    }
  }
}

/**
 * The callback for when the modal is clicked
 * @callback clickModalCallback
 * @param {MouseEvent} event - the mouse event
 * @param {Modal} modal - the modal itself
 */

/**
 * The callback for modal events
 * @callback modalCallback
 * @param {Modal} modal - the modal itself
 */
