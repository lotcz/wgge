export default class NumberHelper {

	static round(number, decimals) {
		const d = Math.pow(10, decimals);
		return Math.round(number * d) / d;
	}

	static random(min, max) {
		const diff = max - min;
		return min + (diff * Math.random());
	}

	/**
		Returns n if n is between min and max. Return min if n lower than min or return max if n is greater than max.
	 */
	static between(min, max, n) {
		const minimum = Math.min(min, max);
		const maximum = Math.max(min, max);
		return Math.min(maximum, Math.max(minimum, n));
	}

	static isBetween(n, min, max) {
		const minimum = Math.min(min, max);
		const maximum = Math.max(min, max);
		return n >= minimum && n <= maximum;
	}

}
