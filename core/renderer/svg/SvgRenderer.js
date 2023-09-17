import RendererBase from "../RendererBase";
import StringHelper from "../../helper/StringHelper";
import Vector2 from "../../model/vector/Vector2";
import {SVG} from "@svgdotjs/svg.js";

export default class SvgRenderer extends RendererBase {

	/**
	 * @type {SVG.Container}
	 */
	draw;

	/**
	 *
	 * @param {GameModel} game
	 * @param {ModelBase} model
	 * @param {SVG.Container} draw
	 */
	constructor(game, model, draw) {
		super(game, model);
		this.draw = draw;
	}

	getDefs() {
		return this.draw.root().defs();
	}

	refExists(uri) {
		const token = StringHelper.token(uri);
		return this.getDefs().findOne('#' + token);
	}

	getRef(uri) {
		const token = StringHelper.token(uri);
		const ref = this.getDefs().findOne('#' + token);
		if (!ref) {
			if (this.game.isInDebugMode.get()) console.warn(`Resource ${uri} (token: ${token}) not found!`)
		}
		return ref;
	}

	setRef(uri, ref) {
		const token = StringHelper.token(uri);
		const resource = this.getDefs().findOne('#' + token);
		if (!resource) {
			this.getDefs().add(ref);
			ref.attr({id: token});
		} else {
			if (this.game.isInDebugMode.get()) console.log(`Resource ${uri} already loaded.`);
		}
	}

	loadImageRef(uri, onLoaded) {
		if (this.refExists(uri)) {
			onLoaded(this.getRef(uri));
			return;
		}
		this.game.assets.getAsset(
			uri,
			(img) => {
				if (this.refExists(uri)) {
					onLoaded(this.getRef(uri));
					return;
				}
				const image = this.getDefs().image(img.src, () => {
					this.setRef(uri, image);
					onLoaded(image);
				});
			}
		);
	}

	rotate(element, rotation) {
		let lastRotation = element.remember('rotation');
		if (!lastRotation) {
			lastRotation = 0;
		}
		element.rotate(rotation - lastRotation);
		element.remember('rotation', rotation);
	}

	/**
	 *
	 * @param {SVG.Container|null|undefined} parent
	 * @param {Vector2} center
	 * @param {Vector2} size
	 * @param {SVG.StrokeData} stroke
	 * @param {string|Color|SVG.FillData} fill
	 *
	 * @returns SVG.Ellipse
	 */
	drawEllipse(
		parent,
		center,
		size = new Vector2(5, 2),
		stroke = {width: 1, color: 'gray'},
		fill = 'transparent'
	) {
		if (!parent) parent = this.draw;
		return parent
			.ellipse(size.x, size.y)
			.stroke(stroke)
			.fill(fill)
			.center(center.x, center.y);
	}

	/**
	 *
	 * @param {SVG.Container|null|undefined} parent
	 * @param {Vector2} start
	 * @param {Vector2} end
	 * @param {object|SVG.StrokeData} stroke
	 * @param {string|Color|SVG.FillData} fill
	 *
	 * @returns SVG.Line
	 */
	drawLine(
		parent,
		start,
		end = 3,
		stroke = {width: 1, color: 'black'},
		fill = 'transparent'
	) {
		if (!parent) parent = this.draw;
		return parent
			.line(start.x, start.y, end.x, end.y)
			.stroke(stroke)
			.fill(fill);
	}

}
