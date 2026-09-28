import AssetLoader from "./AssetLoader";

/**
 * Loads a single Image
 */
export default class ImageLoader extends AssetLoader {

	constructor(assets, uri, preload = false) {
		super(assets, uri, preload);

		this.image = new Image();

		this.successHandler = () =>  {
			this.finish(this.image);
			this.imageLoadingFinished()
		}

		this.errorHandler = (msg) => {
			this.fail(msg);
			this.imageLoadingFinished();
		}

	}

	loadInternal() {
		this.image.addEventListener('load', this.successHandler);
		this.image.addEventListener('error', this.errorHandler);
		this.image.src = this.url();
	}

	imageLoadingFinished() {
		this.image.removeEventListener('error', this.errorHandler);
		this.image.removeEventListener('load', this.successHandler);
	}
}
