(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var noop = function () { };
    var Modal = /** @class */ (function () {
        /**
         * Create a Modal, the modal is not opened yet
         * @param {HTMLElement} content - the html content inside the modal
         * @param {boolean} [closeOnOverlay=true] - close the modal if the overflay is clicked
         * @param {boolean} [zIndex=1000] - z index of the modal
         * @param {boolean} [useKeyboard=true] - handle keyboard events (esc will close the modal)
         * @param {clickModalCallback} [onClick] - callback for mouse events on the modal
         * @param {modalCallback} [onOpen] - callback when the modal is opened
         * @param {modalCallback} [onClose] - callback when the modal is closed
         *
         */
        function Modal(_a) {
            var content = _a.content, _b = _a.closeOnOverlay, closeOnOverlay = _b === void 0 ? true : _b, _c = _a.zIndex, zIndex = _c === void 0 ? 1000 : _c, _d = _a.useKeyboard, useKeyboard = _d === void 0 ? true : _d, _e = _a.onClick, onClick = _e === void 0 ? noop : _e, _f = _a.onOpen, onOpen = _f === void 0 ? noop : _f, _g = _a.onClose, onClose = _g === void 0 ? noop : _g;
            var _this = this;
            this.modal = null;
            this.overlay = null;
            this.handleEsc = function (e) {
                if (e.keyCode === 27) {
                    Modal.modalsOpened[Modal.modalsOpened.length - 1].close();
                }
            };
            this.handleClick = function (e) {
                _this.onClickModal(e, _this);
                if (e.target === _this.overlay && _this.closeOnOverlay) {
                    _this.close();
                }
            };
            this.content = content;
            this.closeOnOverlay = closeOnOverlay;
            this.zIndex = zIndex;
            this.useKeyboard = useKeyboard;
            this.onClickModal = onClick;
            this.onOpenModal = onOpen;
            this.onCloseModal = onClose;
        }
        /**
         * Open the modal
         */
        Modal.prototype.open = function () {
            Modal.modalsOpened.push(this);
            this.openModal();
            this.addEventListeners();
        };
        /**
         * Close the modal
         */
        Modal.prototype.close = function () {
            Modal.modalsOpened.pop();
            this.removeEventListeners();
            this.closeModal();
        };
        Modal.prototype.addEventListeners = function () {
            this.modal.addEventListener('click', this.handleClick);
            if (this.useKeyboard) {
                document.addEventListener('keydown', this.handleEsc);
            }
        };
        Modal.prototype.removeEventListeners = function () {
            this.modal.removeEventListener('click', this.handleClick);
            if (this.useKeyboard) {
                document.removeEventListener('keydown', this.handleEsc);
            }
        };
        Modal.prototype.openModal = function () {
            var _this = this;
            this.modal = document.createElement('div');
            this.overlay = document.createElement('div');
            var container = document.createElement('div');
            document.body.appendChild(this.modal);
            this.modal.appendChild(this.overlay);
            this.overlay.appendChild(container);
            container.appendChild(this.content);
            this.modal.setAttribute('style', "\n      z-index: " + this.zIndex + "\n      ");
            this.overlay.setAttribute('style', "\n      position: fixed;\n      top: 0;\n      left: 0;\n      right: 0;\n      bottom: 0;\n      background: " + (Modal.modalsOpened.length === 1 ? 'rgba(0,0,0,.6)' : 'default') + ";\n      display: flex;\n      justify-content: center;\n      align-items: center;\n    ");
            container.setAttribute('style', "\n      background-color: #fff;\n      max-height: 80vh;\n      overflow-y: auto;\n    ");
            this.toggleBodyScroll(false);
            this.modal.style.transition = 'opacity .3s ease-out';
            this.modal.style.opacity = '0';
            window.setTimeout(function () {
                _this.modal.style.opacity = '1';
                _this.onOpenModal(_this);
            }, 1);
        };
        Modal.prototype.closeModal = function () {
            var _this = this;
            if (!this.modal) {
                return;
            }
            this.modal.style.transition = 'opacity .15s ease-in';
            this.modal.style.opacity = '0';
            window.setTimeout(function () {
                _this.toggleBodyScroll(true);
                _this.modal.remove();
                _this.onCloseModal(_this);
            }, 150);
        };
        Modal.prototype.toggleBodyScroll = function (openScroll) {
            var body = document.querySelector('body');
            if (!openScroll && Modal.modalsOpened.length === 1) {
                body.style.overflow = 'hidden';
                body.style.paddingRight = '15px';
            }
            if (openScroll && Modal.modalsOpened.length === 0) {
                body.style.overflow = null;
                body.style.paddingRight = null;
            }
        };
        Modal.modalsOpened = [];
        return Modal;
    }());
    /**
     * The callback for when the modal is clicked
     * @callback clickModalCallback
     * @param {MouseEvent} event - the mouse event
     * @param {Modal} modal - the modal itself
     */
    /**
     * The callback for modal events
     * @callback modalCallback
     * @param {Modal} modal - the modal itself
     */

    var createModal = function (modalStyle, modalHtml, modalOptions) {
        if (modalOptions === void 0) { modalOptions = {}; }
        var modalContent = document.createElement('div');
        modalContent.setAttribute('style', modalStyle);
        modalContent.innerHTML = modalHtml;
        return new Modal(__assign({ content: modalContent, onOpen: function (m) { return console.info('modal open', m); }, onClose: function (m) { return console.info('modal closed', m); } }, modalOptions));
    };
    var createButton = function (modal, buttonText) {
        var button = document.createElement('button');
        document.body.appendChild(button);
        button.innerText = buttonText;
        button.onclick = function () { return modal.open(); };
    };
    /**
     * Simple Modal with a close icon
     */
    var modal1 = createModal("\n    padding: 30px;\n    width: 500px;\n    height: 300px;\n    border-radius: 3px;\n    ", "\n    <div>\n      <div style=\"display: flex;justify-content: space-between;align-items: center;\">\n        <h1>Basic Alert Modal</h1>\n        <div data-modal-close style=\"cursor:pointer\">\u2717</div>\n      </div>\n      <div>Modal Body</div>\n    </div>\n    ", {
        zIndex: 3000,
        onClick: function (e, modal) {
            var target = e.target;
            if ('modalClose' in target.dataset) {
                console.info('close modal');
                modal.close();
            }
        },
    });
    createButton(modal1, 'Basic Modal');
    /**
     * Modal content needs a scroll
     */
    var modal2 = createModal("\n    padding: 30px;\n    width: 500px;\n    ", "\n    <div style=\"height: 150vh\">\n      <h1>Scroll Modal</h1>\n      <div>Scroll Modal Body</div>\n    </div>\n    ");
    createButton(modal2, 'Basic Modal');
    /**
     * Confirm modal all close options all turned off (esc and clicking on overlay)
     */
    var modal3 = createModal("\n    padding: 30px;\n    width: 500px;\n    ", "\n    <div>\n      <h1>Confirm Modal</h1>\n      <div style=\"height:150px\">Alert Modal Body</div>\n      <div>\n        <button data-modal-confirm>Confirm</button>\n        <button data-modal-cancel>Cancel</button>\n      </div>\n    </div>\n    ", {
        closeOnOverlay: false,
        useKeyboard: false,
        onClick: function (e, modal) {
            var target = e.target;
            if ('modalConfirm' in target.dataset) {
                console.info('confirm modal');
                modal.close();
            }
            if ('modalCancel' in target.dataset) {
                console.info('cancel modal');
                modal.close();
            }
        },
    });
    createButton(modal3, 'Confirm Modal');
    /*
     * Creating new modals in side modals
     */
    var modalInModal = function (n) {
        return createModal("\n      padding: 30px;\n      width: 500px;\n      height: " + (n * 100 + 300) + "px;\n      ", "\n      <div>\n        <h1>Modal Over Modal " + n + "</h1>\n        <div>\n          <button data-modal-new>another modal</button>\n        </div>\n      </div>\n      ", {
            onClick: function (e) {
                var target = e.target;
                if ('modalNew' in target.dataset) {
                    console.info('create modal modal');
                    var modal = modalInModal(n + 1);
                    modal.open();
                }
            },
        });
    };
    createButton(modalInModal(0), 'Modal Over Modal');

}());
//# sourceMappingURL=bundle.js.map
