import ObjectModel from "../../core/model/ObjectModel";
import ModelNodeTable from "../../core/model/collection/table/ModelNodeTable";
import ImageModel from "./image/ImageModel";

export default class ResourcesModel extends ObjectModel {

	/**
	 * @type ModelNodeTable
	 */
	images;

	constructor() {
		super();

		this.images = this.addProperty('images', new ModelNodeTable((id) => new ImageModel(id)));
		//this.sounds = this.addProperty('sounds', new ModelNodeTable((id) => new Model3dModel(id)));

	}

}
