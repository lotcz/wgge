import NumberHelper from "./NumberHelper";
import Vector2 from "../model/vector/Vector2";

export default class ImageHelper {

	/**
	 *
	 * @param {Vector2} size
	 * @param {Vector2} viewBoxSize
	 * @param {Number} zoom
	 * @param {Number} min
	 * @param {Number} max
	 * @returns {number}
	 */
	static sanitizeZoom(size, viewBoxSize, zoom = 0.0, min = 0.0, max = Number.MAX_VALUE) {
		if (size.size() === 0) return 1;

		const minZoomX = viewBoxSize.x / size.x;
		const minZoomY = viewBoxSize.y / size.y;

		min = Math.max(min, minZoomX, minZoomY);
		return NumberHelper.between(min, max, zoom);
	}

	static sanitizeCenter(size, viewBoxSize, zoom, coordinates) {
		const result = new Vector2(coordinates);
		const vbs = viewBoxSize.multiply((1 / zoom) * 0.5);
		result.x = Math.max(vbs.x, result.x);
		result.x = Math.min(size.x - vbs.x, result.x);
		result.y = Math.max(vbs.y, result.y);
		result.y = Math.min(size.y - vbs.y, result.y);
		return result;
	}

}

