import AssetLoader from "./AssetLoader";
import StringHelper from "../../../../core/helper/StringHelper";

/**
 * Loads a 3d model
 */
export default class Model3dLoader extends AssetLoader {

	loadInternal() {

		const id = StringHelper.extractId(this.uri);
		const model = this.assets.resources.models3d.getById(id);

		if (!model) {
			this.fail(`3D model id ${id} (${this.uri}) not found!`);
			return;
		}

		this.assets.getAsset(model.uri.get(), (gltf) => {
			const mesh = gltf.scene.clone();
			mesh.scale.set(model.scale.x, model.scale.y, model.scale.z);
			this.finish(mesh);
		});
	}

}
