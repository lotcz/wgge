import ObjectModel from "../model/ObjectModel";
import StringValue from "../model/value/StringValue";
import FloatValue from "../model/value/FloatValue";
import BoolValue from "../model/value/BoolValue";

export default class AudioModel extends ObjectModel {

	/**
	 * @type StringValue
	 */
	url;

	/**
	 * @type FloatValue
	 */
	volume;

	/**
	 * @type BoolValue
	 */
	playing;

	/**
	 * @type BoolValue
	 */
	loop;

	constructor(persistent = true) {
		super(persistent);

		this.url = this.addProperty('uri', new StringValue());
		this.volume = this.addProperty('volume', new FloatValue(1));
		this.playing = this.addProperty('audioOn', new BoolValue(true));
		this.loop = this.addProperty('loop', new BoolValue(false));
	}
}
