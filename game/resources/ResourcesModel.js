import ModelNodeTable from "../../core/model/collection/table/ModelNodeTable";
import MaterialModel from "./material/MaterialModel";
import ObjectModel from "../../core/model/ObjectModel";
import Model3dModel from "./3d/3DModel";

export default class ResourcesModel extends ObjectModel {

	/**
	 * @type ModelNodeTable
	 */
	materials;

	/**
	 * @type ModelNodeTable<Model3dModel>
	 */
	models3d;

	constructor() {
		super();

		this.materials = this.addProperty('materials', new ModelNodeTable((id) => new MaterialModel(id)));
		this.models3d = this.addProperty('models3d', new ModelNodeTable((id) => new Model3dModel(id)));

	}

}
