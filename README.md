# Modal

* See [source]('./src/modal.ts') for modal options and methods
* See [example]('./example/index.ts') for usage

# Usage
```
const modal = new Modal({ content })

modal.open()
modal.close()
```

# Features
* keyboard support: hitting esc to close the modal. Can be turned off.
* inversion of control: modal content and event handling are controlled by you. You can add cancel and confirm buttons to create a confirm dialog, see example 3.
* support modal in modal: creating modals inside modals will not darken the background overlay
* prevent background page scroll: the page scrollbar is hidden away when you open the modal. Notice the page does not shake left and right when the scrollbar is hidden away.
