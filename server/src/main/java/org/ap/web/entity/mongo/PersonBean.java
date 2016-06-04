package org.ap.web.entity.mongo;

import java.util.Date;

import org.ap.web.entity.constant.EPersonSex;

public class PersonBean {

	private EPersonSex civility = EPersonSex.NULL;
	
	private String firstName;
	private String lastName;
	
	private String socialNumber;
	private String nationality;
	private int ciNumber;
	
	private Date birthDate;
	private AddressBean birthPlace;
	
	public PersonBean() {}
	
	public String getCivility() { return civility.getId(); }
	public void setCivility(String civility) { this.civility = EPersonSex.fromString(civility); }
	
	public String getFirstName() { return firstName; }
	public void setFirstName(String firstname) { this.firstName = firstname; }
	
	public String getLastName() { return lastName; }
	public void setLastName(String lastName) { this.lastName = lastName; }
	
	public String getSocialNumber() { return socialNumber; }
	public void setSocialNumber(String socialNumber) { this.socialNumber = socialNumber; }
	
	public String getNationality() { return nationality; }
	public void setNationality(String nationality) { this.nationality = nationality; }
	
	public int getCiNumber() { return ciNumber; }
	public void setCiNumber(int ciNumber) { this.ciNumber = ciNumber; }
	
	public Date getBirthDate() { return birthDate; }
	public void setBirthDate(Date birthDate) { this.birthDate = birthDate; }
	
	public AddressBean getBirthPlace() { return birthPlace; }
	public void setBirthPlace(AddressBean birthPlace) { this.birthPlace = birthPlace; }
}
