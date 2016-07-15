package org.ap.web.entity.constant;

public enum EOfferStatus {

	PENDING  ("PENDING"),
	REJECTED ("REJECTED"),
	ACCEPTED ("ACCEPTED"),
	;
	
	private String _id;
	private EOfferStatus(String s) { _id = s; }
	
	public String getId() { return _id; }
	
	public static EOfferStatus fromString(String id) { 
		for (EOfferStatus e : EOfferStatus.values()) {
			if (e.getId().equals(id)) return e;
		}
		return PENDING;
	}
}
