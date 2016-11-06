package org.ap.web.entity.auxiliary;

import org.ap.web.entity.mongo.GeoZoneBean;

public class AuxiliaryGeozonesBean {

	private GeoZoneBean geoZone1;
	private GeoZoneBean geoZone2;
	private GeoZoneBean geoZone3;

	/* CONSTRUCTORS */

	public AuxiliaryGeozonesBean() {}

	/* GETTERS & SETTERS */

	public GeoZoneBean getGeoZone1() { return geoZone1; }
	public void setGeoZone1(GeoZoneBean geoZone) { this.geoZone1 = geoZone; }

	public GeoZoneBean getGeoZone2() { return geoZone2; }
	public void setGeoZone2(GeoZoneBean geoZone) { this.geoZone2 = geoZone; }

	public GeoZoneBean getGeoZone3() { return geoZone3; }
	public void setGeoZone3(GeoZoneBean geoZone) { this.geoZone3 = geoZone; }
}
