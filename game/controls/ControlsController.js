import ControllerBase from "../../core/controller/ControllerBase";

export default class ControlsController extends ControllerBase {
	dom;

	/**
	 * @type ControlsModel
	 */
	model;

	constructor(game, model, dom) {
		super(game, model);

		this.model = model;
		this.dom = dom || window.document.body;
	}

	activateInternal() {
		this.addAutoEvent(this.dom, 'mousemove', (e) => this.onMouseMove(e));
		this.addAutoEvent(this.dom, 'mouseenter', (e) => this.onMouseEnter(e));
		this.addAutoEvent(this.dom, 'mouseleave', (e) => this.onMouseLeave(e));
		this.addAutoEvent(this.dom, 'mousedown', (e) => this.updateMouseButtons(e));
		this.addAutoEvent(this.dom, 'mouseup', (e) => this.updateMouseButtons(e));
		this.addAutoEvent(this.dom, 'wheel', (e) => this.onZoom(e));
		this.addAutoEvent(this.dom, 'keydown', (e) => this.onKeyDown(e));
		this.addAutoEvent(window, 'keyup', (e) => this.onKeyUp(e));
		this.addAutoEvent(window, 'contextmenu', (e) => this.onContextMenu(e));
	}

	onKeyDown(event) {
		const key = event.keyCode ? event.keyCode : event.charCode;
		if (this.game.isInDebugMode.get()) console.log(key);
		this.model.triggerEvent(`key-down-${key}`);
		this.model.triggerEvent(`key-down`, key);
	}

	onKeyUp(event) {
		const key = event.keyCode ? event.keyCode : event.charCode;
		switch (key) {
			case 27: /*Esc*/
				this.model.triggerEvent('esc-key');
				break;
			case 192: /*~*/
				this.model.triggerEvent('debug-key');
				break;
			default:
				this.model.triggerEvent(`key-up-${key}`);
				this.model.triggerEvent(`key-up`, key);
		}

	}

	onMouseMove(e) {
		this.model.mouseCoordinates.set(e.clientX, e.clientY);
		this.model.isMouseOver.set(true);
	}

	onMouseEnter() {
		this.model.isMouseOver.set(true);
	}

	onMouseLeave() {
		this.model.isMouseOver.set(false);
		this.model.mouseDownLeft.set(false);
		this.model.mouseDownRight.set(false);
	}

	onContextMenu(e) {
		if (!(e.ctrlKey && this.game.isInDebugMode.get())) {
			e.preventDefault();
		}
		e.stopPropagation();
		return false;
	}

	updateMouseButtons(e) {
		const left = ((e.buttons === 1) || (e.buttons === 3));
		const right = (e.buttons === 2);
		this.model.mouseDownLeft.set(left);
		this.model.mouseDownRight.set(right);
	}

	onZoom(e) {
		this.model.triggerEvent('zoom', e.deltaY > 0 ? 1 : -1);
	}

}
