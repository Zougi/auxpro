package org.ap.web.entity.mongo;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class CustomerBean extends MongoEntity {

	private PersonBean person;
	private ContactBean contact;
	
	private AddressBean[] addresses;
	
	private SkillsBean skills;
	
	@MongoId
	private String serviceId;
	
	public CustomerBean() {}

	public PersonBean getPerson() { return person; }
	public void setPerson(PersonBean person) { this.person = person; }

	public ContactBean getContact() { return contact; }
	public void setContact(ContactBean contact) { this.contact = contact; }

	public SkillsBean getSkills() { return skills; }
	public void setSkills(SkillsBean skills) { this.skills = skills; }

	public AddressBean[] getAddresses() { return addresses; }
	public void setAddresses(AddressBean[] addresses) { this.addresses = addresses; };

	public String getServiceId() { return serviceId; }
	public void setServiceId(String serviceId) { this.serviceId = serviceId; }
}
