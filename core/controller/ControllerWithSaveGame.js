import ControllerWithTimeout from "./ControllerWithTimeout";

export default class ControllerWithSaveGame extends ControllerWithTimeout {

	/**
	 * @type DemoSaveGameModel
	 */
	saveGame;

	/**
	 * @param {DemoGameModel} game
	 * @param {ObjectModel} model
	 * @param {DemoSaveGameModel} saveGame
	 */
	constructor(game, model, saveGame = null) {
		super(game, model);
		if (!saveGame) {
			saveGame = this.game.saveGame.get();
		}
		this.saveGame = saveGame;

		if (!this.saveGame) {
			console.error('no SaveGameModel provided for controller!');
		}
	}

}
