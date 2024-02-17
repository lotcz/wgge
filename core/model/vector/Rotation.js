import DirtyValue from "../value/DirtyValue";

const ROTATION_RANGE = 2 * Math.PI;

/**
 * Keeps track of rotation in radians that is always in interval (-pi, +pi> which equals to (-180, 180> degrees
 */
export default class Rotation extends DirtyValue {

	static normalizeValue(rads) {
		let result = rads % ROTATION_RANGE;
		if (result > (ROTATION_RANGE / 2)) {
			result = result - ROTATION_RANGE;
		}
		if (result <= (-ROTATION_RANGE / 2)) {
			result = result + ROTATION_RANGE;
		}
		return result;
	}

	static diff(a, b) {
		return Rotation.normalizeValue(Rotation.normalizeValue(a) - Rotation.normalizeValue(b));
	}

	static radToDeg(rads) {
		return rads * 180 / Math.PI;
	}

	static degToRad(degs) {
		return degs * Math.PI / 180;
	}

	set(rads) {
		super.set(Rotation.normalizeValue(rads));
	}

	add(rads) {
		return new Rotation(this.get() + rads);
	}

	subtract(value) {
		return new Rotation(Rotation.diff(this.get(), value));
	}

	equalsTo(value) {
		return (this.value === Rotation.normalizeValue(value));
	}

	clone() {
		return new Rotation(this.value);
	}

	setDegrees(degs) {
		this.set(Rotation.degToRad(degs));
	}

	getDegrees() {
		return Rotation.radToDeg(this.get());
	}

}
