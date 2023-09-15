import * as localForage from "localforage";
import ControllerBase from "../core/controller/ControllerBase";
import EditorController from "../editor/EditorController";
import ControlsController from "./controls/ControlsController";

export default class GameController extends ControllerBase {

	/**
	 * @type GameModel
	 */
	model;

	constructor(model) {
		super(model, model);

		this.model = model;

		this.isResourcesDirty = false;
		this.resourcesTimeOut = null;

		this.addChild(new ControlsController(this.game, this.model.controls));
		this.addChild(new EditorController(this.game, this.model.editor));

		this.addAutoEvent(
			this.model,
			'new-game',
			() => this.runOnUpdate(() => this.startNewGame())
		);

		this.addAutoEvent(
			this.model,
			'show-main-menu',
			() => this.showMainMenu()
		);

		this.addAutoEvent(
			window,
			'resize',
			() => {
				this.runOnUpdate(() => this.model.viewBoxSize.set(window.innerWidth, window.innerHeight));
			},
			true
		);

		this.addAutoEvent(
			this.model.controls,
			'debug-key',
			() => {
				this.model.isInDebugMode.invert();
			}
		);

		this.addAutoEvent(
			this.model,
			'save-ui',
			() => {
				this.saveGameToStorage().then(() => {
					console.log('savegame saved');
				});
				this.saveResourcesToStorage().then(() => {
					console.log('resources saved');
				});
			}
		);

	}

	activateInternal() {
		this.loadResourcesFromStorage().then(() => {
			this.model.resources.addOnDirtyListener(() => this.isResourcesDirty = true);
			this.showMainMenu();
		});
	}

	updateInternal(delta) {

		// saving of resources during debugging
		if (this.game.isInDebugMode.get()) {
			this.resourcesTimeOut = (this.resourcesTimeOut === null) ? 3000 : this.resourcesTimeOut - delta;
			if (this.isResourcesDirty && this.resourcesTimeOut <= 0) {
				this.resourcesTimeOut = null;
				this.isResourcesDirty = false;
				this.saveResourcesToStorage().then(() => {
					this.resourcesTimeOut = null;
					console.log('resources saved');
				});
			}
		}
	}

	async loadResourcesFromStorage() {
		try {
			const state = await localForage.getItem('wegge-resources');
			if (state) {
				this.model.resources.restoreState(state);
			} else {
				console.log('nothing in storage');
			}
		} catch (err) {
			console.error(err);
		}
	}

	async saveResourcesToStorage() {
		const state = this.model.resources.getState();
		try {
			await localForage.setItem('wegge-resources', state);
		} catch (err) {
			console.error(err);
		}
	}

	async loadGameFromStorage() {
		try {
			const state = await localForage.getItem('wegge-autosave');
			if (state) {
				const saveGame = this.saveGameFactory();
				saveGame.restoreState(state);
				this.model.saveGame.set(saveGame);
				this.model.menu.set(null);
			} else {
				console.log('no saved game in storage');
			}
		} catch (err) {
			console.error('Error when loading saved game.', err);
		}
	}

	async saveGameToStorage() {
		const saveGame = this.model.saveGame.get();
		if (!saveGame) return;
		const state = saveGame.getState();
		try {
			await localForage.setItem('wegge-autosave', state);
		} catch (err) {
			console.error(err);
		}
	}

	hideMenu() {
		this.model.menu.set(null);
	}

}
