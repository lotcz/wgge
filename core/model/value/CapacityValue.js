import FloatValue from "./FloatValue";

export default class CapacityValue extends FloatValue {

	/**
	 *
	 * @type FloatValue
	 */
	min;

	/**
	 *
	 * @type FloatValue
	 */
	max;

	/**
	 *
	 * @type FloatValue
	 */
	progress;

	constructor(min = 0, max = 1, value = 0.5) {
		super(value);

		this.min = new FloatValue(min);
		this.max = new FloatValue(max);

		this.progress = new FloatValue(value, false);

		this.addEventListener('change', () => this.update())
		this.min.addEventListener('change', () => this.propUpdated())
		this.max.addEventListener('change', () => this.propUpdated())

		this.update();
	}

	update() {
		if (this.min.get() > this.max.get()) return this.min.set(this.max.get());
		if (this.get() < this.min.get()) return this.set(this.min.get());
		if (this.get() > this.max.get()) return this.set(this.max.get());
		this.progress.set((this.get() - this.min.get()) / this.max.get());
	}

	propUpdated() {
		this.update();
		this.triggerEvent('change');
	}
}
