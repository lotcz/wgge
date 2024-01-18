export default class HttpHelper {

	static async processRequest(url, body = null, method = 'GET') {
		return fetch(url, {
			method: method,
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-uri
			body: body ? JSON.stringify(body) : null // body data type must match "Content-Type" header
		});
	}

	static async get(url) {
		return HttpHelper.processRequest(url)
	}

	static async post(url, body) {
		return HttpHelper.processRequest(url, body, 'POST')
	}

	/**
	 *
	 * @param {string} fileName
	 * @param {string} data
	 */
	static fakeDownload(fileName, data) {
		const element = document.createElement('a');
		element.style.display = 'none';
		element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(data));
		element.setAttribute('download', 'resources.json');
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

}
