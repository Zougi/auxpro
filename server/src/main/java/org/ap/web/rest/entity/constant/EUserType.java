package org.ap.web.rest.entity.constant;

public enum EUserType {

	/* MEMBERS */
	
	ADMIN,
	GUEST,
	AUXILIARY,
	SERVICE,
	;
	
	/* ATTRIBUTES */
	
	
	/* CONSTRUCTOR */
	
	private EUserType() { }
	
	/* METHODS */
	
	public String getId() {
		return name().toLowerCase();
	}
	
	public static EUserType byId(String id) {
		if (id == null) return null;
		for (EUserType type : EUserType.values()) {
			if (type.name().equals(id.toUpperCase())) {
				return type;
			}
		}
		return null;
	}
}
