import Vector2 from "../../model/vector/Vector2";
import CanvasRenderer from "./CanvasRenderer";

export default class ImageCanvasRenderer extends CanvasRenderer {

	/**
	 * @type ImageViewModel
	 */
	model;

	constructor(game, model, canvas) {
		super(game, model, canvas);

		this.model = model;
		this.image = null;

	}

	activateInternal() {
		this.reloadImage();
	}

	deactivateInternal() {
		this.image = null;
	}

	renderInternal() {
		if (this.model.image.uri.isDirty) {
			this.reloadImage();
			return;
		}
		this.renderImage();
	}

	renderImage() {
		if (!(this.image && this.context2d)) return;
		const size = this.model.viewSize.multiply(1 / this.model.actualZoom.get());
		const start = this.model.actualCoordinates.subtract(size.multiply(0.5));
		this.drawImage(
			this.image,
			new Vector2(0, 0),
			this.model.viewSize,
			start,
			size,
			this.model.actualOpacity.get()
		);
	}

	reloadImage() {
		this.image = null;
		if (this.model.image.uri.isEmpty()) return;
		this.game.assets.getAsset(this.model.image.uri.get(), (img) => {
			this.image = img;
			this.model.image.size.set(img.width, img.height);
			this.renderImage();
		});
	}

}
