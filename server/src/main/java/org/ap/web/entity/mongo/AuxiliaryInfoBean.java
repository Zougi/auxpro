package org.ap.web.entity.mongo;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class AuxiliaryInfoBean extends MongoEntity {
	
	private boolean profileComplete;
	private boolean entrepeneur;
	private String diploma;
	
	public AuxiliaryInfoBean() { }
	
	public boolean getEntrepeneur() { return entrepeneur; }
	public void setEntrepeneur(boolean entrepeneur) { this.entrepeneur = entrepeneur; }

	public String getDiploma() { return diploma; }
	public void setDiploma(String diploma) { this.diploma = diploma; }

	public boolean getProfileComplete() { return profileComplete; }
	public void setProfileComplete(boolean profileComplete) { this.profileComplete = profileComplete; }

}