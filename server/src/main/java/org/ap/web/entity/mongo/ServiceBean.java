package org.ap.web.entity.mongo;

import javax.xml.bind.annotation.XmlRootElement;

import org.ap.web.entity.MongoEntity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown = true, value = {"_id"})
public class ServiceBean extends MongoEntity {
	
	private UserBean user;
	private ContactBean contact;
	
	private String society;
	private String social;
	private String siret;
	
	public ServiceBean() {
		user = new UserBean();
		contact = new ContactBean();
	}
	
	public UserBean getUser() { return user; }
	public void setUser(UserBean user) { this.user = user; }
	
	public ContactBean getContact() { return contact; }
	public void setContact(ContactBean contact) { this.contact = contact; }

	public String getSociety() { return society; }
	public void setSociety(String society) { this.society = society; }
		
	public String getSocialReason() { return social; }
	public void setSocialReason(String social) { this.social = social; }
	
	public String getSiret() { return siret; }
	public void setSiret(String siret) { this.siret = siret; }
}
