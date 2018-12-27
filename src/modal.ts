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
    this.createModal()
    this.addEventListeners()
  }

  public close() {
    this.removeEventListeners()
    this.modal.remove()
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

  private createModal() {
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
      max-height: 100vh;
    `,
    )
  }
}
