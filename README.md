# Modal

* See [source](./src/modal.ts) for modal options and methods
* See [example](/example/index.ts) for usage

# Usage
```
const modal = new Modal({ content })

modal.open()
modal.close()
```

# Features

## inversion of control
Modal content and event handling are controlled by you.
You can add cancel and confirm buttons to create a confirm dialog.
See example 3.

## keyboard support
Hitting esc to close the modal. Can be turned off.

## support modal in modal
Creating modals inside modals will not darken the background overlay.

## prevent background page scroll
The page scrollbar is hidden away when you open the modal. Notice the page does not shake left and right when the scrollbar is hidden away.

# Note:
In a typical web app, you actually want two types of modal:
1. a barebone modal where it handles all the annoyances for you (i.e. this library)
2. and another set of user facing modals that are build on top of the barebone modal, where all the ui/ux is unified.
For example alert or confirm modals created inside the example.
