package org.ap.web.entity.constant;

public enum EPersonSex {

	M    ("Mr"),
	F    ("Mme"),
	NULL (""),
	;
	
	private String _id;
	private EPersonSex(String s) { _id = s; }
	
	public String getId() { return _id; }
	
	public static EPersonSex fromString(String id) { 
		for (EPersonSex civ : EPersonSex.values()) {
			if (civ.getId().equals(id)) return civ;
		}
		return NULL;
	}
}
