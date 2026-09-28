import Dictionary from "../../core/Dictionary";
import Collection from "../../core/Collection";
import ImageLoader from "./loader/ImageLoader";
import AudioLoader from "./loader/AudioLoader";
import NodeWithEvents from "../../core/model/event/NodeWithEvents";
import StringHelper from "../../core/helper/StringHelper";
import ObjectModel from "../../core/model/ObjectModel";
import ResourcesModel from "../resources/ResourcesModel";
import IntValue from "../../core/model/value/IntValue";

/**
 * Keeps cached raw resources like images, sounds and 3D models
 */
export default class AssetCache extends ObjectModel {

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
	 * @type IntValue
	 */
	totalLoaders;

	/**
	 * @type IntValue
	 */
	preloadingLoaders;

	/**
	 * @type IntValue
	 */
	sessionTotalLoaders;

	/**
	 * @type IntValue
	 */
	sessionFinishedLoaders;

	constructor(resources) {
		super(false);

		this.loaderClasses = new Dictionary(
			{
				'aud': AudioLoader,
				'img': ImageLoader
			}
		);
		this.resources = resources;
		this.cache = new Dictionary();
		this.loaders = new Collection();

		this.totalLoaders = this.addProperty('totalLoaders', new IntValue(0));
		this.preloadingLoaders = this.addProperty('preloadingLoaders', new IntValue(0));
		this.sessionTotalLoaders = this.addProperty('sessionTotalLoaders', new IntValue(0));
		this.sessionFinishedLoaders = this.addProperty('sessionFinishedLoaders', new IntValue(0));

		this.loaders.addOnAddListener((loader) => this.loaderAdded(loader));
		this.loaders.addOnRemoveListener((loader) => this.loaderRemoved(loader));

	}

	registerLoaderClass(id, cls) {
		this.loaderClasses.set(id, cls);
	}

	updateLoadingState() {
		this.totalLoaders.set(this.loaders.count());
		this.preloadingLoaders.set(this.loaders.count((l) => l.isPreloading));
	}

	loaderAdded(loader) {
		if (this.totalLoaders.equalsTo(0)) {
			this.sessionFinishedLoaders.set(0);
			this.sessionTotalLoaders.set(0);
		}
		this.updateLoadingState();
		this.sessionTotalLoaders.increase();
	}

	loaderRemoved(loader) {
		this.updateLoadingState();
		this.sessionFinishedLoaders.increase();
	}

	resetCache(uri = null) {
		if (uri) {
			this.cache.remove(uri);
		} else {
			this.cache.reset();
		}
	}

	loaderFailed(loader, msg, onError) {
		console.error(`Loading of asset '${loader.uri}' failed: ${msg}`);
		if (onError) onError(msg);
		this.loaders.remove(loader);
	}

	loaderSucceeded(loader, asset, onLoaded) {
		if (this.cache.exists(loader.uri)) {
			this.cache.set(loader.uri, asset);
			console.warn(`Asset ${loader.uri} was already present then loaded and replaced.`);
		} else {
			this.cache.add(loader.uri, asset);
		}
		if (onLoaded) onLoaded(asset);
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
			const loaderClass = this.loaderClasses.get(assetType);
			if (!loaderClass) {
				console.error(`Valid resource type could not be inferred from URI '${uri}'!`);
			}
			const loader = new loaderClass(this, uri, onLoaded === null);
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
