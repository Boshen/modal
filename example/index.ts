import { Modal } from '../src'

const button = document.getElementById('modal-button')

const modalContent = document.createElement('div')
modalContent.setAttribute(
  'style',
  `
  overflow-y: auto;
  box-sizing: border-box;
  padding: 30px;
  max-width: 500px;
  border-radius: 1px;
`,
)

modalContent.innerHTML = `
  <div>
    <h1>Modal Title</h1>
    <div>Modal Body</div>
  </div>
`

const modal1 = new Modal({
  content: modalContent,
})

button!.onclick = () => modal1.show()
