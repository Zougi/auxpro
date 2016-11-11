package org.ap.web.entity.constant;

public enum EOfferStatus {

	PENDING,
	ACCEPTED,
	DECLINED,
	CONFIRMED,
	REJECTED,
	EXPIRED,
	;
	
	private EOfferStatus() {}
	
	public String getId() { return name(); }
	
	public static EOfferStatus fromString(String id) {
		for (EOfferStatus e : EOfferStatus.values()) {
			if (e.getId().equals(id)) return e;
		}
		return PENDING;
	}
}
