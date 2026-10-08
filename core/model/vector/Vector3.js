import ModelBase from "../ModelBase";
import NumberHelper from "../../helper/NumberHelper";

export default class Vector3 extends ModelBase {

	_isVector3 = true;

	x;

	y;

	z;

	constructor(x = undefined, y = undefined, z = undefined, persistent = true) {
		super(persistent);

		this.x = 0;
		this.y = 0;
		this.z = 0;

		if (y === undefined && Vector3.isVector3(x)) {
			this.set(x.x, x.y, x.z);
		} else if (x !== undefined && z !== undefined) {
			this.set(x, y, z);
		}
	}

	static isVector3(v) {
		if (v === null || v === undefined) return false;
		return typeof v === 'object' && v._isVector3;
	}

	equalsTo(v) {
		return (v) ? this.x === v.x && this.y === v.y && this.z === v.z : false;
	}

	set(x, y = undefined, z = undefined) {
		if (y === undefined && Vector3.isVector3(x)) {
			return this.set(x.x, x.y, x.z);
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

		return this;
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

	size() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
	}

	distanceTo(v) {
		return this.subtract(v).size();
	}

	static zero() {
		return ZERO_VECTOR3;
	}

	toString(decimals = 2) {
		return `[${NumberHelper.round(this.x, decimals)},${NumberHelper.round(this.y, decimals)},${NumberHelper.round(this.z, decimals)}]`;
	}
}

export const ZERO_VECTOR3 = new Vector3(0, 0, 0);
