export default class GeozoneHelper {

	static isCompleted(geozone) {
		if (geozone) {
			let isZone = (geozone.lattitude && geozone.longitude && geozone.radius && true);
			let isCity = (geozone.lattitude && geozone.longitude && geozone.postalCode && geozone.city && true);
			return isZone || isCity;
		} else {
			return false;
		}
	}
}