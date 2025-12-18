import Dictionary from "../../../core/Dictionary";
import Collection from "../../../core/Collection";
import ImageLoader from "./loader/ImageLoader";
import AudioLoader from "./loader/AudioLoader";
import NodeWithEvents from "../../../core/model/event/NodeWithEvents";
import StringHelper from "../../../core/helper/StringHelper";

const ASSET_TYPE_LOADERS = {
	'aud': AudioLoader,
	'img': ImageLoader
}

/**
 * Keeps cached raw resources like images, sounds and 3D models
 */
export default class AssetCache extends NodeWithEvents {

	/**
	 * @type ResourcesModel
	 */
	resources;

	/**
	 * @type Dictionary
	 */
	cache;

	/**
	 * @type Collection
	 */
	loaders;

	/**
	 * @type int
	 */
	totalLoaders = 0;

	/**
	 * @type int
	 */
	blockingLoaders = 0;

	/**
	 * @type int
	 */
	sessionTotalLoaders = 0;

	/**
	 * @type int
	 */
	sessionFinishedLoaders = 0;

	constructor(resources) {
		super();
		this.resources = resources;
		this.cache = new Dictionary();
		this.loaders = new Collection();
		this.loaders.addOnAddListener((loader) => this.loaderAdded(loader));
		this.loaders.addOnRemoveListener((loader) => this.loaderRemoved(loader));

	}

	loaderAdded(loader) {
		this.updateLoadingState();
		if (!loader.isPreloading) {
			this.sessionTotalLoaders++;
			this.triggerEvent('session-total-loaders-changed', this.sessionTotalLoaders);
		}

	}

	loaderRemoved(loader) {
		this.updateLoadingState();
		if (!loader.isPreloading) {
			this.sessionFinishedLoaders++;
			if (this.blockingLoaders === 0) {
				this.sessionFinishedLoaders = 0;
				this.sessionTotalLoaders = 0;
			}
			this.triggerEvent('session-finished-loaders-changed', this.sessionFinishedLoaders);
		}
	}

	updateLoadingState() {
		const total = this.loaders.count();
		if (this.totalLoaders !== total) {
			this.totalLoaders = total;
			this.triggerEvent('total-loaders-changed', total);
		}
		const blocking = this.loaders.filter((l) => l.isPreloading === false).length;
		if (this.blockingLoaders !== blocking) {
			this.blockingLoaders = blocking;
			this.triggerEvent('blocking-loaders-changed', blocking);
		}
	}

	resetCache(name = null) {
		if (name) {
			this.cache.remove(name);
		} else {
			this.cache.reset();
		}
	}

	loaderFailed(loader, msg, onError) {
		console.error(`Loading of asset '${loader.uri}' failed: ${msg}`);
		if (onError) onError(msg);
		this.loaders.remove(loader);
	}

	loaderSucceeded(loader, resource, onLoaded) {
		if (this.cache.exists(loader.uri)) {
			this.cache.set(loader.uri, resource);
			console.warn(`Resource ${loader.uri} was already present then loaded and replaced.`);
		} else {
			this.cache.add(loader.uri, resource);
		}
		if (onLoaded) onLoaded(resource);
		this.loaders.remove(loader);
	}

	loadAsset(uri, onLoaded = null, onError = null) {
		if (typeof uri !== 'string') {
			console.log('uri is not a string', uri);
			return;
		}

		if (this.cache.exists(uri)) {
			if (onLoaded) {
				onLoaded(this.cache.get(uri));
			}
		} else {
			const existingLoader = this.loaders.find((l) => l.uri === uri);
			if (existingLoader) {
				if (onLoaded || onError) {
					existingLoader.addLoaderEventsListeners(onLoaded, onError);
				}
				return;
			}

			const assetType = StringHelper.extractId(uri, 0);
			if (ASSET_TYPE_LOADERS[assetType] === undefined) {
				console.error(`Valid resource type could not be inferred from URI '${uri}'!`);
			}

			const loaderType = ASSET_TYPE_LOADERS[assetType];
			const loader = new loaderType(this, uri, onLoaded === null);
			this.loaders.add(loader);
			loader.load(
				(resource) => this.loaderSucceeded(loader, resource, onLoaded),
				(msg) => this.loaderFailed(loader, msg, onError)
			);
		}
	}

	loadImage(url, onLoaded) {
		this.loadAsset(url, onLoaded);
	}

	loadAudio(materialId, onLoaded) {
		this.loadAsset(`mat/${materialId}`, onLoaded);
	}

	resetMaterial(materialId) {
		this.resetCache(`mat/${materialId}`);
	}

	preload(resources) {
		console.log('Preloading:', resources);
		resources.forEach((r) => this.loadAsset(r));
	}

	load(resources) {
		console.log('Loading:', resources);
		resources.forEach((r) => this.loadAsset(r, () => undefined));
	}
}
