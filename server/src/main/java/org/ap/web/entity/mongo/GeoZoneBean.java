package org.ap.web.entity.mongo;

public class GeoZoneBean {

	private String lattitude;
	private String longitude;
	
	private String radius;
	
	private int postalCode;
	private String city;
	
	public GeoZoneBean() {}
	
	public String getLattitude() { return lattitude; }
	public void setLattitude(String lattitude) { this.lattitude = lattitude; }

	public String getLongitude() { return longitude; }
	public void setLongitude(String longitude) { this.longitude = longitude; }
	
	public String getRadius() { return radius; }
	public void setRadius(String radius) { this.radius = radius; }

	public int getPostalCode() { return postalCode; }
	public void setPostalCode(int postalCode) { this.postalCode = postalCode; }

	public String getCity() { return city; }
	public void setCity(String city) { this.city = city; }
}
