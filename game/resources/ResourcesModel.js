import ObjectModel from "../../core/model/ObjectModel";

export default class ResourcesModel extends ObjectModel {

	/**
	 * @type ModelNodeTable
	 */
	images;

	/**
	 * @type ModelNodeTable
	 */
	sounds;

	constructor() {
		super();

		//this.images = this.addProperty('images', new ModelNodeTable((id) => new ImageModel(id)));
		//this.sounds = this.addProperty('sounds', new ModelNodeTable((id) => new Model3dModel(id)));

	}

}
