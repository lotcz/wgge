import ObjectModel from "../core/model/ObjectModel";
import Vector2 from "../core/model/vector/Vector2";
import ControlsModel from "./controls/ControlsModel";
import ResourcesModel from "./resources/ResourcesModel";
import EditorModel from "../editor/EditorModel";
import NullableNode from "../core/model/value/NullableNode";
import BoolValue from "../core/model/value/BoolValue";
import GlobalAudioModel from "../core/audio/global/GlobalAudioModel";
import AssetCache from "./resources/assets/AssetCache";

export default class GameModel extends ObjectModel {

	/**
	 * @type BoolValue
	 */
	isInDebugMode;

	/**
	 * @type EditorModel
	 */
	editor;

	/**
	 * @type NullableNode<MenuModel>
	 */
	menu;

	/**
	 * @type Vector2
	 */
	viewBoxSize;

	/**
	 * @type NullableNode<SaveGameModel>
	 */
	saveGame;

	/**
	 * @type ResourcesModel
	 */
	resources;

	/**
	 * @type AssetCache
	 */
	assets;

	/**
	 * @type GlobalAudioModel
	 */
	audio;

	/**
	 * @type ControlsModel
	 */
	controls;

	constructor(debugModeEnabled = true) {
		super(false);

		this.isInDebugMode = this.addProperty('isInDebugMode', new BoolValue(debugModeEnabled));
		this.editor = this.addProperty('editor', new EditorModel());
		this.menu = this.addProperty('menu', new NullableNode());

		this.viewBoxSize = this.addProperty('viewBoxSize', new Vector2());
		this.saveGame = this.addProperty('saveGame', new NullableNode());
		this.resources = this.addProperty('resources', new ResourcesModel());
		this.assets = new AssetCache(this.resources);
		this.audio = this.addProperty('audio', new GlobalAudioModel());
		this.controls = this.addProperty('controls', new ControlsModel());
	}

}
