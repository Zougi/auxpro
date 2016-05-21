package org.ap.web.entity.mongo;

import java.util.Date;

import org.ap.web.entity.constant.EPersonSex;

public class PersonBean {

	private EPersonSex civility = EPersonSex.NULL;
	
	private String firstName;
	private String lastName;
	
	private Date birthDate;
	private String birthPlace;
	
	public PersonBean() {}
	
	public String getCivility() { return civility.getId(); }
	public void setCivility(String civility) { this.civility = EPersonSex.fromString(civility); }
	
	public String getFirstName() { return firstName; }
	public void setFirstName(String firstname) { this.firstName = firstname; }
	
	public String getLastName() { return lastName; }
	public void setLastName(String lastName) { this.lastName = lastName; }
	
	public Date getBirthDate() { return birthDate; }
	public void setBirthDate(Date birthDate) { this.birthDate = birthDate; }
	
	public String getBirthPlace() { return birthPlace; }
	public void setBirthPlace(String birthPlace) { this.birthPlace = birthPlace; }
}
