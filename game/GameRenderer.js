import DomRenderer from "../core/renderer/dom/DomRenderer";
import EditorRenderer from "../editor/EditorRenderer";
import NullableNodeRenderer from "../core/renderer/generic/NullableNodeRenderer";
import GlobalAudioRenderer from "../core/audio/global/GlobalAudioRenderer";
import MenuRenderer from "./menu/MenuRenderer";
import ConditionalNodeRenderer from "../core/renderer/generic/ConditionalNodeRenderer";
import DOMHelper from "../core/helper/DOMHelper";

export default class GameRenderer extends DomRenderer {

	/**
	 * @type GameModel
	 */
	model;

	constructor(model, dom) {
		super(model, model, dom);

		this.model = model;
		this.loading = null;
		this.addClass('wegge-host');

		this.addChild(
			new GlobalAudioRenderer(
				this.model,
				this.model.audio
			)
		);

		this.addChild(
			new NullableNodeRenderer(
				this.game,
				this.model.menu,
				(m) => new MenuRenderer(this.game, m, this.menuLayer)
			)
		);

		this.addChild(
			new ConditionalNodeRenderer(
				this.game,
				this.model.isInDebugMode,
				() => this.model.isInDebugMode.get(),
				() => new EditorRenderer(this.game, this.model.editor, this.editorLayer)
			)
		);

		this.addAutoEvents(
			this.model.assets,
			['session-finished-loaders-changed', 'session-total-loaders-changed'],
			() => this.updateLoading(),
			true
		);

		this.addAutoEvent(
			window,
			'resize',
			() => this.model.triggerEvent('resize'),
			true
		);
	}

	activateInternal() {
		const initLoading = document.getElementById('initial_loading');
		if (initLoading) DOMHelper.destroyElement(initLoading);

		this.container = this.addElement('div', 'wegge-game-container container container-host');

		this.saveGameLayer = DOMHelper.createElement(this.container, 'div', 'savegame-layer container container-host');
		this.loadingLayer = DOMHelper.createElement(this.container, 'div', 'loading-layer');
		this.menuLayer = DOMHelper.createElement(this.container, 'div', 'menu-layer');
		this.editorLayer = DOMHelper.createElement(this.container, 'div', 'editor-layer');

		this.model.assets.preload(this.model.getResourcesForPreload());
	}

	deactivateInternal() {
		this.removeElement(this.container);
		this.container = null;
		this.saveGameLayer = null;
		this.loadingLayer = null;
		this.menuLayer = null;
		this.editorLayer = null;
	}

	updateLoading() {
		const isLoading = this.model.assets.blockingLoaders > 0;
		if (this.loading && !isLoading) {
			this.removeElement(this.loading);
			this.loading = null;
		}
		if (isLoading) {
			if (!this.loading) {
				this.loading = DOMHelper.createElement(this.loadingLayer, 'div', 'loading');
				const paper = DOMHelper.createElement(this.loading, 'div');
				const inner = DOMHelper.createElement(paper, 'div', 'inner p-3');
				const content = DOMHelper.createElement(inner, 'div', 'm-3 p-3');
				const label1 = DOMHelper.createElement(content, 'h2', null, 'Nahrávám');
				this.label2 = DOMHelper.createElement(content, 'div', 'center');
				const progressWrapper = DOMHelper.createElement(content, 'div', 'progress-wrapper mt-2');
				this.loadingProgress = DOMHelper.createElement(progressWrapper, 'div', 'stretch');
			}
			const portion = this.game.assets.sessionFinishedLoaders / this.game.assets.sessionTotalLoaders;
			this.loadingProgress.style.width = `${Math.round(portion * 100)}%`;
			this.label2.innerText = `${this.game.assets.sessionFinishedLoaders}/${this.game.assets.sessionTotalLoaders}`;
		}
	}

}
