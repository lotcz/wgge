import ObjectModel from "../core/model/ObjectModel";
import NullableNode from "../core/model/value/NullableNode";
import BoolValue from "../core/model/value/BoolValue";

export default class EditorModel extends ObjectModel {

	/**
	 * @type BoolValue
	 */
	isVisible;

	/**
	 * @type NullableNode
	 */
	activeTable;

	/**
	 * @type NullableNode
	 */
	activeForm;

	/**
	 * @type NullableNode<MaterialModel>
	 */
	activeMaterial;

	constructor() {
		super();

		this.activeTable = this.addProperty('activeTable', new NullableNode());
		this.activeForm = this.addProperty('activeForm', new NullableNode());
		this.activeMaterial = this.addProperty('activeMaterial', new NullableNode());

		this.isVisible = this.addProperty('isVisible', new BoolValue(true));

	}

}
