export default class ArrayHelper {

	static remove(arr, el) {
		arr.splice(arr.indexOf(el), 1);
	}

	static random(arr) {
		return arr[ArrayHelper.randomIndex(arr.length)];
	}

	static randomIndex(length) {
		return Math.floor(Math.random() * length);
	}

	static unique(arr) {
		return arr.filter((value, index, self) => self.indexOf(value) === index);
	}

}
