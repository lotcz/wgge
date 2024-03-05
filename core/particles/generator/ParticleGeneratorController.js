import ParticleController from "../ParticleController";
import ControllerBase from "../../controller/ControllerBase";
import Vector3 from "../../model/vector/Vector3";
import CollectionController from "../../controller/CollectionController";

export default class ParticleGeneratorController extends ControllerBase {

	/**
	 * @type ParticleGeneratorModel
	 */
	model;

	constructor(game, model) {
		super(game, model);

		this.model = model;

		this.addChild(
			new CollectionController(
				this.game,
				this.model.particles,
				(m) => new ParticleController(this.game, m)
			)
		);
	}

	activateInternal() {
		this.particleMaxTimeout = (1 / this.model.particlesPerSecond.get()) * 1000;
		this.particleTimeout = Math.random() * this.particleMaxTimeout;
	}

	updateInternal(delta) {
		if (this.model.on.get()) {
			this.particleTimeout -= delta;
			while (this.particleTimeout < 0) {
				this.addParticle();
				this.particleTimeout += this.particleMaxTimeout;
			}
		}
	}

	addParticle() {
		const particle = this.model.particleTemplate.clone();

		particle.position.set(
			this.model.position.add(
				new Vector3(
					this.model.particlePositionSpread.x * (-0.5 + Math.random()),
					this.model.particlePositionSpread.y * (-0.5 + Math.random()),
					this.model.particlePositionSpread.z * (-0.5 + Math.random())
				)
			)
		);

		particle.scale.set(this.model.particleTemplate.scale.get() + (this.model.particleScaleSpread.get() * (-0.5 + Math.random())));
		particle.lifetime.set(this.model.particleTemplate.lifetime.get() + (this.model.particleLifetimeSpread.get() * (-0.5 + Math.random())))
		particle.movement.set(
			this.model.particleTemplate.movement.add(
				new Vector3(
					this.model.particleMovementSpread.x * (-0.5 + Math.random()),
					this.model.particleMovementSpread.y * (-0.5 + Math.random()),
					this.model.particleMovementSpread.z * (-0.5 + Math.random())
				)
			)
		);

		this.model.particles.add(particle);
	}

}
