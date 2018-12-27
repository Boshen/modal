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
  private content: HTMLElement
  private modal: HTMLElement
  private overlay: HTMLElement
  private closeOnOverlay: boolean
  private zIndex: number
  private useKeyboard: boolean
  private onClickModal: ((e: MouseEvent, modal: Modal) => void)
  private onShowModal: ((modal: Modal) => void)
  private onCloseModal: ((modal: Modal) => void)

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
    this.showModal()
    this.addEventListeners()
  }

  public close() {
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
      background: rgba(0,0,0,.6);
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
    body.style.overflow = showScroll ? null : 'hidden'
    body.style.paddingRight = showScroll ? null : '15px'
  }
}
