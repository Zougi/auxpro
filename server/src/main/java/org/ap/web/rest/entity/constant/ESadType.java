package org.ap.web.rest.entity.constant;

public enum ESadType {

	PREST ("prest"),
	MAND  ("mand"),
	;
	
	private String _id;

	private ESadType(String s) { _id = s; }
	
	public String getId() { return _id; }
	
	public static ESadType fromString(String id) { 
		for (ESadType type : ESadType.values()) {
			if (type.getId().equals(id)) return type;
		}
		return null;
	}
}
