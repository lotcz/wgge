import ParticleRenderer from "../ParticleRenderer";
import ThreeRenderer from "../../renderer/three/ThreeRenderer";
import CollectionRenderer from "../../renderer/generic/CollectionRenderer";

export default class ParticleGeneratorRenderer extends ThreeRenderer {

	/**
	 * @type ParticleGeneratorModel
	 */
	model;

	constructor(game, model, scene) {
		super(game, model, scene);

		this.model = model;

		this.addChild(
			new CollectionRenderer(
				this.game,
				this.model.particles,
				(m) => new ParticleRenderer(this.game, m, this.scene)
			)
		);
	}


}
