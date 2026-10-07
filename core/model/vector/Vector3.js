import ModelBase from "../ModelBase";

export const ZERO_VECTOR3 = new Vector3(0, 0, 0);

export default class Vector3 extends ModelBase {
	x;
	y;
	z;

	constructor(x = undefined, y = undefined, z = undefined, persistent = true) {
		super(persistent);

		this.x = 0;
		this.y = 0;
		this.z = 0;

		if (y === undefined && typeof x === 'object') {
			if (x.length === 3) {
				this.setFromArray(x);
			} else {
				this.set(x);
			}
		} else if (x !== undefined && z !== undefined) {
			this.set(x, y, z);
		}
	}

	equalsTo(v) {
		return (v) ? this.x === v.x && this.y === v.y && this.z === v.z : false;
	}

	set(x, y = undefined, z = undefined) {
		if (y === undefined && typeof x === 'object') {
			this.set(x.x, x.y, x.z);
			return;
		}

		x = Number(x);
		y = Number(y);
		z = Number(z);

		if ((this.x !== x || this.y !== y || this.z !== z)) {
			const old = this.clone();
			this.x = x;
			this.y = y;
			this.z = z;
			this.makeDirty();
			this.triggerEvent('change', {oldValue: old, newValue: this});
		}
	}

	add(v) {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	}

	multiply(s) {
		return new Vector3(this.x * s, this.y * s, this.z * s);
	}

	subtract(v) {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	}

	toArray() {
		return [this.x, this.y, this.z];
	}

	setFromArray(arr) {
		if (typeof arr === 'object' && arr.length === 3) {
			this.set(arr[0], arr[1], arr[2]);
		}
	}

	static fromArray(arr) {
		const v = new Vector3();
		v.setFromArray(arr);
		return v;
	}

	clone() {
		return new Vector3(this);
	}

	getStateInternal() {
		return this.toArray();
	}

	restoreStateInternal(state) {
		this.setFromArray(state);
	}

	asRgbColor() {
		return `rgb(${Math.round(this.x)}, ${Math.round(this.y)}, ${Math.round(this.z)})`;
	}

	/**
	 * Components in 0-1 range (three.js style)
	 * @returns {number}
	 */
	asHexColor() {
		const r = Math.round(Math.min(Math.max(this.x, 0), 1) * 255);
		const g = Math.round(Math.min(Math.max(this.y, 0), 1) * 255);
		const b = Math.round(Math.min(Math.max(this.z, 0), 1) * 255);
		return (r << 16) | (g << 8) | b;
	}

	size() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
	}

	distanceTo(v) {
		return this.subtract(v).size();
	}

	static zero() {
		return ZERO_VECTOR3;
	}
}
