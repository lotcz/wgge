export default class StringHelper {

	static shorten(text, length = 25, ellipsis = '...') {
		if (text === null || text === undefined || typeof text !== 'string') {
			return text;
		}
		if (text.length <= length) {
			return text;
		}
		let short = text.substring(0, length - ellipsis.length);
		short += ellipsis;
		return short;
	}

	static hash(value) {
		let hash = 0;
		if (value.length === 0) return hash;
		for (let i = 0; i < value.length; i++) {
			let ch = value.charCodeAt(i);
			hash = ((hash << 5) - hash) + ch;
			hash = hash & hash;
		}
		return hash;
	}

	static token(value) {
		let hash = StringHelper.hash(value);
		if (hash === 0) return null;
		let token = 'a';
		if (hash < 0) {
			token = 'b';
			hash = -hash;
		}
		return token + hash;
	}

	static paragraphize(text) {
		if ((!text) || typeof text !== 'string') return '';
		const arr = text.split(/(\<br\>|\<br\/\>|\n)/);
		const strings = arr.filter((t) => StringHelper.stripHtmlTags(t.trim()).length > 0);
		return strings.reduce((prev, current) => prev.concat(`<p>${current}</p>`), '');
	}

	static extractWord(str, pos = 0, sep = ' ') {
		const words = str.split(sep);
		if (words.length > pos) return words[pos];
		return null;
	}

	static extractId(str, pos = 1) {
		return StringHelper.extractWord(str, pos, '/');
	}

	static stripHtmlTags(text) {
		if ((!text) || typeof text !== 'string') return '';
		return text.replace(/(<([^>]+)>)/gi, '');
	}

}
