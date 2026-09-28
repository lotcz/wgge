import AssetLoader from "./AssetLoader";

/**
 * Loads a single audio file (Audio object)
 */
export default class AudioLoader extends AssetLoader {

	constructor(assets, uri, preload = false) {
		super(assets, uri, preload);

		this.audio = new Audio();

		this.successHandler = () => {
			this.finish(this.audio);
			this.audioLoadingFinished()
		}

		this.errorHandler = (msg) => {
			this.fail(msg);
			this.audioLoadingFinished();
		}
	}

	loadInternal() {
		this.audio.addEventListener('canplaythrough', this.successHandler);
		this.audio.addEventListener('error', this.errorHandler);
		this.audio.src = this.url();
	}

	audioLoadingFinished() {
		this.audio.removeEventListener('canplaythrough', this.errorHandler);
		this.audio.removeEventListener('load', this.successHandler);
	}

}
