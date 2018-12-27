import { Modal, ModalProps } from '../src'

const create = (modalStyle: string, modalHtml: string, buttonText: string, modalOptions: Partial<ModalProps> = {}) => {
  const modalContent = document.createElement('div')
  modalContent.setAttribute('style', modalStyle)
  modalContent.innerHTML = modalHtml
  const button = document.createElement('button')
  document.body.appendChild(button)
  button.innerText = buttonText
  const modal = new Modal({
    content: modalContent,
    onShow: (m: Modal) => console.info('modal shown', m),
    onClose: (m: Modal) => console.info('modal closed', m),
    ...modalOptions,
  })
  button.onclick = () => modal.show()
}

create(
  `
    padding: 30px;
    width: 500px;
    height: 300px;
    border-radius: 3px;
    `,
  `
    <div>
      <div style="display: flex;justify-content: space-between;align-items: center;">
        <h1>Basic Alert Modal</h1>
        <div data-modal-close style="cursor:pointer">✗</div>
      </div>
      <div>Modal Body</div>
    </div>
    `,
  'Basic Modal',
  {
    zIndex: 3000,
    onClick: (e: MouseEvent, modal: Modal) => {
      const target = e.target as HTMLElement
      if ('modalClose' in target.dataset) {
        console.info('close modal')
        modal.close()
      }
    },
  }
)

create(
  `
    padding: 30px;
    width: 500px;
    `,
  `
    <div style="height: 150vh">
      <h1>Scroll Modal</h1>
      <div>Scroll Modal Body</div>
    </div>
    `,
  'Scroll Modal'
)

create(
  `
    padding: 30px;
    width: 500px;
    `,
  `
    <div>
      <h1>Confirm Modal</h1>
      <div style="height:150px">Alert Modal Body</div>
      <div>
        <button data-modal-confirm>Confirm</button>
        <button data-modal-cancel>Cancel</button>
      </div>
    </div>
    `,
  'Confirm Modal',
  {
    closeOnOverlay: false,
    useKeyboard: false,
    onClick: (e: MouseEvent, modal: Modal) => {
      const target = e.target as HTMLElement
      if ('modalConfirm' in target.dataset) {
        console.info('confirm modal')
        modal.close()
      }
      if ('modalCancel' in target.dataset) {
        console.info('cancel modal')
        modal.close()
      }
    },
  }
)
