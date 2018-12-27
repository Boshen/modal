import { Modal, ModalProps } from '../src'

const createModal = (modalStyle: string, modalHtml: string, modalOptions: Partial<ModalProps> = {}) => {
  const modalContent = document.createElement('div')
  modalContent.setAttribute('style', modalStyle)
  modalContent.innerHTML = modalHtml
  return new Modal({
    content: modalContent,
    onOpen: (m: Modal) => console.info('modal open', m),
    onClose: (m: Modal) => console.info('modal closed', m),
    ...modalOptions,
  })
}

const createButton = (modal: Modal, buttonText: string) => {
  const button = document.createElement('button')
  document.body.appendChild(button)
  button.innerText = buttonText
  button.onclick = () => modal.open()
}

/**
 * Simple Modal with a close icon
 */
const modal1 = createModal(
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
createButton(modal1, 'Basic Modal')

/**
 * Modal content needs a scroll
 */
const modal2 = createModal(
  `
    padding: 30px;
    width: 500px;
    `,
  `
    <div style="height: 150vh">
      <h1>Scroll Modal</h1>
      <div>Scroll Modal Body</div>
    </div>
    `
)
createButton(modal2, 'Basic Modal')

/**
 * Confirm modal all close options all turned off (esc and clicking on overlay)
 */
const modal3 = createModal(
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
createButton(modal3, 'Confirm Modal')

/*
 * Creating new modals in side modals
 */
const modalInModal = (n: number) => {
  return createModal(
    `
      padding: 30px;
      width: 500px;
      height: ${n * 100 + 300}px;
      `,
    `
      <div>
        <h1>Modal Over Modal ${n}</h1>
        <div>
          <button data-modal-new>another modal</button>
        </div>
      </div>
      `,
    {
      onClick: (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if ('modalNew' in target.dataset) {
          console.info('create modal modal')
          const modal = modalInModal(n + 1)
          modal.open()
        }
      },
    }
  )
}

createButton(modalInModal(0), 'Modal Over Modal')
