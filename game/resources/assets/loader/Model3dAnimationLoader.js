import AssetLoader from "./AssetLoader";
import StringHelper from "../../../../core/helper/StringHelper";
import AnimationHelper from "../../../../core/animation/3d/AnimationHelper";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";

/**
 * Loads an AnimationHelper for 3d model
 */
export default class Model3dAnimationLoader extends AssetLoader {

	loadInternal() {

		const id = StringHelper.extractId(this.uri);
		const model = this.assets.resources.models3d.getById(id);

		if (!model) {
			this.fail(`3D model id ${id} (${this.uri}) not found!`);
			return;
		}

		this.assets.getAsset(model.uri.get(), (gltf) => {
			const anim = new AnimationHelper(SkeletonUtils.clone(gltf.scene), gltf.animations);
			anim.mesh.scale.set(model.scale.x, model.scale.y, model.scale.z);
			this.finish(anim);
		});
	}

}
