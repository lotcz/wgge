import SvgRenderer from "../../../../../core/renderer/svg/SvgRenderer";
import ProgressVector3 from "../../../../../core/animation/3d/ProgressVector3";

export default class TankRenderer extends SvgRenderer {

	/**
	 * @type TankModel
	 */
	model;

	/**
	 * @type SubModel
	 */
	sub;

	constructor(game, model, draw, sub) {
		super(game, model, draw);

		this.model = model;
		this.sub = sub;
	}

	activateInternal() {
		this.group = this.draw.group();

		this.drawTank();
	}

	deactivateInternal() {
		this.group.remove();
		this.group = null;
	}

	getPosition() {
		return this.sub.center.add(this.model.position);
	}

	drawTank() {
		if (this.ellipse) this.ellipse.remove();
		if (this.filling) this.filling.remove();

		let color;
		if (this.model.content.isLiquid.get()) {
			color = this.model.shape.color.asRgbColor();
		} else {
			const colorProgress = new ProgressVector3(this.model.shape.color, this.model.content.color);
			color = colorProgress.get(this.model.capacity.progress.get()).asRgbColor();
		}

		this.ellipse = this.drawEllipse(
			this.group,
			this.getPosition(),
			this.model.size,
			{width: this.model.shape.strokeWidth.get(), color: this.model.shape.strokeColor.asRgbColor()},
			color
		);

		if (this.model.content.isLiquid.get()) {
			const height = this.model.size.y * this.model.capacity.progress.get();
			const top = this.model.size.y - height;

			const pos = this.getPosition();

			this.filling = this.group
				.rect(
					this.model.size.x,
					height
				).fill(
					this.model.content.color.asRgbColor()
				).center(
					pos.x,
					pos.y + (top / 2)
				);

			const ellipse = this.drawEllipse(
				this.group,
				pos,
				this.model.size
			);

			const clip = this.draw.clip().add(ellipse);
			this.filling.clipWith(clip);
		}
	}

	renderInternal() {
		this.drawTank();
	}
}
