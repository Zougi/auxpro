export default class MathUtils {

	static round(nb, decimals) {
		let factor = 10 * decimals;
		return Math.round(nb*factor)/factor;
	}
}