import IntValue from "./IntValue";

export default class FloatValue extends IntValue {

	/**
	 *
	 * @return Number
	 */
	round() {
		return Math.round(this.get());
	}
}
