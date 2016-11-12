package org.ap.web.helpers;

public class GeoHelper {

	public static double getDistance(double lat1, double lon1, double lat2, double lon2) {
		int R = 6371000;
		double dLat = GeoHelper.deg2rad(lat2-lat1);
		double dLon = GeoHelper.deg2rad(lon2-lon1); 
		double a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) + 
			Math.cos(GeoHelper.deg2rad(lat1)) * Math.cos(GeoHelper.deg2rad(lat2)) *
			Math.sin(dLon/2) * Math.sin(dLon/2); 
		double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		double d = R * c; // Distance in m
		return d;
	}
	
	public static double deg2rad(double deg) {
		return deg * (Math.PI / 180);
	}
}
