package org.ap.web.rest.entity.constant;

public enum EUserRole {

	/* MEMBERS */
	
	ADMIN,
	AUTHENTICATED,
	;
	
	/* ATTRIBUTES */
	
	
	/* CONSTRUCTOR */
	
	private EUserRole() { }
	
	/* METHODS */
	
	public String getId() {
		return name().toLowerCase();
	}
	public static EUserRole byId(String id) {
		if (id == null) return null;
		for (EUserRole type : EUserRole.values()) {
			if (type.name().equals(id.toUpperCase())) {
				return type;
			}
		}
		return null;
	}
}
