import GameController from "../../game/GameController";
import DemoSaveGameController from "./save/DemoSaveGameController";
import DemoSaveGameModel from "./save/DemoSaveGameModel";
import MenuModel from "../../game/menu/MenuModel";
import MenuItemModel from "../../game/menu/item/MenuItemModel";
import NullableNodeController from "../../core/controller/NullableNodeController";

export default class DemoGameController extends GameController {

	/**
	 * @type DemoGameModel
	 */
	model;

	constructor(model) {
		super(model, model);

		this.model = model;

		this.addChild(
			new NullableNodeController(
				this.game,
				this.model.saveGame,
				(m) => new DemoSaveGameController(this.game, m)
			)
		);

	}

	startNewGame() {
		const save = new DemoSaveGameModel();
		this.model.saveGame.set(save);
		this.model.menu.set(null);
	}

	showMainMenu() {
		const menu = new MenuModel('Menu');
		menu.items.add(new MenuItemModel('New Game', () => this.startNewGame()));
		menu.items.add(new MenuItemModel('Load', () => this.loadGameFromStorage()));

		if (this.model.saveGame.isSet()) {
			menu.items.add(new MenuItemModel('Save', () => this.saveGameToStorage().then(() => this.hideMenu())));
			menu.items.add(new MenuItemModel('Resume', () => this.hideMenu()));
		}

		this.model.menu.set(menu);
	}

}
