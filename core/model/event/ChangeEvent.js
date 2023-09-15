export default class ChangeEvent {

	/**
	 * @type string|undefined
	 */
	key;

	/**
	 * @type any
	 */
	old;

	/**
	 * @type any
	 */
	value;

	constructor(value, old = undefined, key = undefined) {
		this.key = key;
		this.old = old;
		this.value = value;
	}

}
