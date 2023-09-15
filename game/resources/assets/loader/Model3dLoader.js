import AssetLoader from "./AssetLoader";
import NumberHelper from "../../../../core/helper/NumberHelper";

/**
 * Loads a 3d model
 */
export default class Model3dLoader extends AssetLoader {

	loadInternal() {

		const id = NumberHelper.extractId(this.uri);
		const model = this.assets.resources.models3d.getById(id);

		this.assets.getAsset(model.uri.get(), (gltf) => {
			const mesh = gltf.scene.clone();
			mesh.scale.set(model.scale.x, model.scale.y, model.scale.z);
			this.finish(mesh);
		});
	}

}
