import NodeWithEvents from "../../../../core/model/event/NodeWithEvents";

/**
 * Loads a single raw resource.
 */
export default class AssetLoader extends NodeWithEvents {

	uri;

	/**
	 * @type AssetCache
	 */
	assets;

	constructor(assets, uri, preload = false) {
		super();
		this.assets = assets;
		this.uri = uri;
		this.isPreloading = preload;
	}

	load(onLoaded, onError = null) {
		this.addLoaderEventsListeners(onLoaded, onError);
		this.loadInternal();
	}

	/**
	 * Override this and then call this.finish(result) or this.fail(msg)
	 */
	loadInternal() {
		// do something
		this.fail('No loadInternal method override!');
	}

	finish(result) {
		this.triggerEvent('load', result);
	}

	fail(msg) {
		this.triggerEvent('error', msg);
	}

	addLoaderEventsListeners(onLoaded = null, onError = null) {
		if (onLoaded) this.addEventListener('load', onLoaded);
		if (onError) this.addEventListener('error', onError);
	}

	url() {
		return AssetLoader.urlFromUri(this.uri);
	}

	static urlFromUri(uri) {
		return 'assets/' + uri;
	}

}
