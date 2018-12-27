export interface ModalProps {
  content: HTMLElement
  zIndex?: number
  closeOnOverlay?: boolean
  useKeyboard?: boolean
  onShow?: (modal: Modal) => void
  onClose?: (modal: Modal) => void
  onClick?: (e: MouseEvent, modal: Modal) => void
}

const noop = () => {}

export class Modal {
  private static numberOfModalsShown: number = 0

  private readonly content: HTMLElement
  private readonly modal: HTMLElement
  private readonly overlay: HTMLElement
  private readonly closeOnOverlay: boolean
  private readonly zIndex: number
  private readonly useKeyboard: boolean
  private readonly onClickModal: ((e: MouseEvent, modal: Modal) => void)
  private readonly onShowModal: ((modal: Modal) => void)
  private readonly onCloseModal: ((modal: Modal) => void)

  constructor({
    content,
    closeOnOverlay = true,
    zIndex = 1000,
    useKeyboard = true,
    onClick = noop,
    onShow = noop,
    onClose = noop,
  }: ModalProps) {
    this.content = content
    this.closeOnOverlay = closeOnOverlay
    this.zIndex = zIndex
    this.useKeyboard = useKeyboard
    this.onClickModal = onClick
    this.onShowModal = onShow
    this.onCloseModal = onClose

    this.modal = document.createElement('div')
    this.overlay = document.createElement('div')
  }

  public show() {
    Modal.numberOfModalsShown += 1
    this.showModal()
    this.addEventListeners()
  }

  public close() {
    Modal.numberOfModalsShown -= 1
    this.removeEventListeners()
    this.closeModal()
  }

  private addEventListeners() {
    this.modal.addEventListener('click', this.handleClick)
    if (this.useKeyboard) {
      document.addEventListener('keydown', this.handleEsc)
    }
  }

  private removeEventListeners() {
    this.modal.removeEventListener('click', this.handleClick)
    if (this.useKeyboard) {
      document.removeEventListener('keydown', this.handleEsc)
    }
  }

  private handleEsc = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      this.close()
    }
  }

  private handleClick = (e: MouseEvent) => {
    this.onClickModal(e, this)
    if (e.target === this.overlay && this.closeOnOverlay) {
      this.close()
    }
  }

  private showModal() {
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
      background: ${Modal.numberOfModalsShown === 1 ? 'rgba(0,0,0,.6)' : 'default'};
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
      this.modal.style.opacity = '1'
      this.onShowModal(this)
    }, 1)
  }

  private closeModal() {
    this.modal.style.transition = 'opacity .15s ease-in'
    this.modal.style.opacity = '0'
    window.setTimeout(() => {
      this.toggleBodyScroll(true)
      this.modal.remove()
      this.onCloseModal(this)
    }, 150)
  }

  private toggleBodyScroll(showScroll: boolean) {
    const body = document.querySelector('body')!
    if (!showScroll && Modal.numberOfModalsShown === 1) {
      body.style.overflow = 'hidden'
      body.style.paddingRight = '15px'
    }
    if (showScroll && Modal.numberOfModalsShown === 0) {
      body.style.overflow = null
      body.style.paddingRight = null
    }
  }
}
