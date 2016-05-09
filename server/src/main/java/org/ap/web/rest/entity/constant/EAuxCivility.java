package org.ap.web.rest.entity.constant;

public enum EAuxCivility {

	MR   ("Mr"),
	MS   ("Mme"),
	NULL (""),
	;
	
	private String _id;
	private EAuxCivility(String s) { _id = s; }
	
	public String getId() { return _id; }
	
	public static EAuxCivility fromString(String id) { 
		for (EAuxCivility civ : EAuxCivility.values()) {
			if (civ.getId().equals(id)) return civ;
		}
		return NULL;
	}
}
