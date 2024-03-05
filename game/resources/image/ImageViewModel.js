import ObjectModel from "../../../core/model/ObjectModel";
import FloatValue from "../../../core/model/value/FloatValue";
import Vector2 from "../../../core/model/vector/Vector2";
import ImageModel from "./ImageModel";
import ImageHelper from "../../../core/helper/ImageHelper";
import NumberHelper from "../../../core/helper/NumberHelper";

export default class ImageViewModel extends ObjectModel {

	/**
	 * @type ImageModel
	 */
	image;

	/**
	 * @type Vector2
	 */
	viewSize;

	/**
	 * @type FloatValue
	 */
	opacity;

	/**
	 * @type FloatValue
	 */
	actualOpacity;

	/**
	 * @type Vector2
	 */
	coordinates;

	/**
	 * @type Vector2
	 */
	actualCoordinates;

	/**
	 * @type FloatValue
	 */
	zoom;

	/**
	 * @type FloatValue
	 */
	actualZoom;

	constructor(persistent = true) {
		super(persistent);

		this.image = this.addProperty('image', new ImageModel());

		this.viewSize = this.addProperty('viewSize', new Vector2());

		this.opacity = this.addProperty('opacity', new FloatValue(1));
		this.actualOpacity = this.addProperty('actualOpacity', new FloatValue(1));

		this.coordinates = this.addProperty('coordinates', new Vector2());
		this.actualCoordinates = this.addProperty('actualCoordinates', new Vector2());

		this.zoom = this.addProperty('zoom', new FloatValue(1));
		this.actualZoom = this.addProperty('actualZoom', new FloatValue(1));

		this.opacity.addEventListener('change', () => this.updateOpacity());

		this.zoom.addEventListener('change', () => this.updateZoom());
		this.viewSize.addEventListener('change', () => this.updateZoom());
		this.image.size.addEventListener('change', () => this.updateZoom());

		this.coordinates.addEventListener('change', () => this.updateCoordinates());
		this.viewSize.addEventListener('change', () => this.updateCoordinates());
		this.actualZoom.addEventListener('change', () => this.updateCoordinates());
		this.image.size.addEventListener('change', () => this.updateCoordinates());

		this.updateOpacity();
		this.updateZoom();
	}

	updateOpacity() {
		this.actualOpacity.set(NumberHelper.between(0, 1, this.opacity.get()));
	}

	updateCoordinates() {
		this.actualCoordinates.set(
			ImageHelper.sanitizeCenter(
				this.image.size,
				this.viewSize,
				this.actualZoom.get(),
				this.coordinates
			)
		);
	}

	updateZoom() {
		this.actualZoom.set(
			ImageHelper.sanitizeZoom(
				this.image.size,
				this.viewSize,
				this.zoom.get()
			)
		);
	}

}
