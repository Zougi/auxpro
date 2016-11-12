package org.ap.web.entity.constant;

public enum EMissionStatus {

	PENDING,
	CANCELED,
	COMPLETED,
	;
	
	private EMissionStatus() {}
	
	public String getId() { return name(); }
	
	public static EMissionStatus fromString(String id) { 
		for (EMissionStatus e : EMissionStatus.values()) {
			if (e.getId().equals(id.toUpperCase())) return e;
		}
		return PENDING;
	}
}
