import { Modal } from '../src'

const create = (modalStyle: string, modalHtml: string, buttonText: string) => {
  const modalContent = document.createElement('div')
  modalContent.setAttribute('style', modalStyle)
  modalContent.innerHTML = modalHtml
  const button = document.createElement('button')
  document.body.appendChild(button)
  button.innerText = buttonText
  const modal = new Modal({ content: modalContent })
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
      <h1>Modal Title</h1>
      <div>Modal Body</div>
    </div>
    `,
  'Basic Modal',
)

create(
  `
    padding: 30px;
    width: 500px;
    `,
  `
    <div style="height: 150vh">
      <h1>Scroll Modal Title</h1>
      <div>Scroll Modal Body</div>
    </div>
    `,
  'Scroll Modal',
)
