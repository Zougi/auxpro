package org.ap.web.entity.mongo;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class CustomerBean extends MongoEntity {

	private PersonBean person;
	private ContactBean contact;
	
	private SkillsBean skills;
	
	public CustomerBean() {}

	public PersonBean getPerson() { return person; }
	public void setPerson(PersonBean person) { this.person = person; }

	public ContactBean getContact() { return contact; }
	public void setContact(ContactBean contact) { this.contact = contact; }

	public SkillsBean getSkills() { return skills; }
	public void setSkills(SkillsBean skills) { this.skills = skills; };
}
