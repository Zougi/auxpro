package org.ap.web.entity.mongo;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class AuxiliaryBean extends MongoEntity {
	
	private UserBean user;
	private PersonBean person;
	private ContactBean contact;
	private SkillsBean skills;
	private String diploma;
	
	public AuxiliaryBean() { }
	
	public UserBean getUser() { return user; }
	public void setUser(UserBean user) { this.user = user; }
	
	public PersonBean getPerson() { return person; }
	public void setPerson(PersonBean person) { this.person = person; }
	
	public ContactBean getContact() { return contact; }
	public void setContact(ContactBean contact) { this.contact = contact; }
	
	public String getDiploma() { return diploma; }
	public void setDiploma(String diploma) { this.diploma = diploma; }

	public SkillsBean getSkills() { return skills; }
	public void setSkills(SkillsBean skills) { this.skills = skills; }
}
