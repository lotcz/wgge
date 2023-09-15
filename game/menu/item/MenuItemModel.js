import ObjectModel from "../../../core/model/ObjectModel";
import StringValue from "../../../core/model/value/StringValue";
import BoolValue from "../../../core/model/value/BoolValue";

export default class MenuItemModel extends ObjectModel {

	/**
	 * @type StringValue
	 */
	text;

	/**
	 * @type BoolValue
	 */
	isActive;

	constructor(text = '', onClick = null, persistent = false) {
		super(persistent);

		this.text = this.addProperty('text', new StringValue(text));
		this.isActive = this.addProperty('isActive', new BoolValue(false));

		if (onClick) {
			this.addEventListener(
				'click',
				onClick
			);
		}
	}

}
