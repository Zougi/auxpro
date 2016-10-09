package org.ap.web.entity.mongo;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoObject;

@MongoObject
public class AuxiliaryInfoBean extends MongoEntity {
	
	private boolean entrepeneur;
	private String diploma;
	private String description;
	
	/* CONSTRUCTORS */
	public AuxiliaryInfoBean() { }
	
	/* GETTERS & SETTERS */
	
	public boolean getEntrepeneur() { return entrepeneur; }
	public void setEntrepeneur(boolean entrepeneur) { this.entrepeneur = entrepeneur; }

	public String getDiploma() { return diploma; }
	public void setDiploma(String diploma) { this.diploma = diploma; }

	public String getDescription() { return description; }
	public void setDescription(String description) { this.description = description; }

}