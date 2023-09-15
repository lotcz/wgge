import ModelNodeCollection from "../../core/model/collection/ModelNodeCollection";
import ObjectModel from "../../core/model/ObjectModel";
import StringValue from "../../core/model/value/StringValue";

export default class MenuModel extends ObjectModel {

	/**
	 * @type StringValue
	 */
	name;

	/**
	 * @type ModelNodeCollection<MenuItemModel>
	 */
	items;

	constructor(name = '', persistent = false) {
		super(persistent);

		this.name = this.addProperty('name', new StringValue(name));
		this.items = this.addProperty('items', new ModelNodeCollection());

	}

}
