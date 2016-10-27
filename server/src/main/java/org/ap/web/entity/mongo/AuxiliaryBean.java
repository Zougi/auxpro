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
	private AuxiliaryInfoBean infos;
	private GeoZoneBean[] geoZones;
	
	/* CONSTRUCTORS */
	
	public AuxiliaryBean() {
		user = new UserBean();
		person = new PersonBean();
		contact = new ContactBean();
		skills = new SkillsBean();
	}
	
	/* GETTERS & SETTERS */
	
	public UserBean getUser() { return user; }
	public void setUser(UserBean user) { this.user = user; }
	
	public PersonBean getPerson() { return person; }
	public void setPerson(PersonBean person) { this.person = person; }
	
	public ContactBean getContact() { return contact; }
	public void setContact(ContactBean contact) { this.contact = contact; }
	
	public SkillsBean getSkills() { return skills; }
	public void setSkills(SkillsBean skills) { this.skills = skills; }
	
	public GeoZoneBean[] getGeoZones() { return geoZones; }
	public void setGeoZones(GeoZoneBean[] geoZones) { this.geoZones = geoZones; }

	public AuxiliaryInfoBean getInfos() { return infos;	}
	public void setInfos(AuxiliaryInfoBean infos) { this.infos = infos; }
	
	public boolean getProfileCompleted() {
		return (
			getPerson().isCompleted() &&
			getInfos().isCompleted() &&
			getContact().isCompleted() &&
			getSkills().isCompleted() &&
			(getGeoZones() != null && getGeoZones().length > 0)			
		);
	}
	public void setProfileCompleted(boolean profileCompleted) {}
}
