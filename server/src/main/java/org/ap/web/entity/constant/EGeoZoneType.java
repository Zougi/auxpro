package org.ap.web.entity.constant;

public enum EGeoZoneType {

	POINT  ("Mr"),
	POSTAL ("Mme")
	;
	
	private String _id;
	private EGeoZoneType(String s) { _id = s; }
	
	public String getId() { return _id; }
	
	public static EGeoZoneType fromString(String id) { 
		for (EGeoZoneType civ : EGeoZoneType.values()) {
			if (civ.getId().equals(id)) return civ;
		}
		return POINT;
	}
}
