export interface ModalProps {
  content: HTMLElement
}

export class Modal {
  private content: HTMLElement
  private modal: HTMLElement
  private overlay: HTMLElement

  constructor({ content }: ModalProps) {
    this.content = content
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
    this.overlay.addEventListener('click', this.handleOverlayClick)
    document.addEventListener('keydown', this.handleEsc)
  }

  private removeEventListeners() {
    this.overlay.removeEventListener('click', this.handleOverlayClick)
    document.removeEventListener('keydown', this.handleEsc)
  }

  private handleEsc = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      this.close()
    }
  }

  private handleOverlayClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      this.close()
    }
  }

  private showModal() {
    document.body.appendChild(this.modal)
    const container = document.createElement('div')

    this.modal.appendChild(this.overlay)
    this.overlay.appendChild(container)
    container.appendChild(this.content)

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
    `,
    )
    container.setAttribute(
      'style',
      `
      background-color: #fff;
      max-height: 80vh;
      overflow-y: auto;
    `,
    )

    this.toggleBodyScroll(false)
    this.modal.style.transition = 'opacity .3s ease-out'
    this.modal.style.opacity = '0'
    window.setTimeout(() => {
      this.modal.style.opacity = '1'
    }, 1)
  }

  private closeModal() {
    this.modal.style.transition = 'opacity .15s ease-in'
    this.modal.style.opacity = '0'
    window.setTimeout(() => {
      this.toggleBodyScroll(true)
      this.modal.remove()
    }, 150)
  }

  private toggleBodyScroll(showScroll: boolean) {
    const body = document.querySelector('body')!
    body.style.overflow = showScroll ? null : 'hidden'
    body.style.paddingRight = showScroll ? null : '15px'
  }
}
