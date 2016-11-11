package org.ap.web.entity.constant;

public enum EMissionStatus {

	PENDING  (),
	CANCELED (),
	DONE_1S  (),
	DONE_2S  (),
	DONE_3S  (),
	DONE_4S  (),
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
