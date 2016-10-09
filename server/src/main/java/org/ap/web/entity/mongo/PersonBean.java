package org.ap.web.entity.mongo;

import java.time.LocalDate;

import org.ap.web.entity.constant.EPersonSex;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown=true)
public class PersonBean {

	private EPersonSex civility = EPersonSex.NULL;
	
	private String firstName;
	private String lastName;
	
	private String socialNumber;
	private String nationality;
	private int ciNumber;
	
	private LocalDate birthDate;
	private AddressBean birthPlace;
	
	/* CONSTRUCTORS */
	
	public PersonBean() {
		birthPlace = new AddressBean();
	}
	
	/* GETTERS & SETTERS */
	
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
	
	public LocalDate getBirthDate() { return birthDate; }
	public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }
	
	public AddressBean getBirthPlace() { return birthPlace; }
	public void setBirthPlace(AddressBean birthPlace) { this.birthPlace = birthPlace; }
	
	/* ADDITIONNAL METHODS */
	
	public boolean isCompleted() {
		return (
			!getCivility().equals(EPersonSex.NULL) &&  
			getFirstName() != null &&
			getLastName() != null &&
			getSocialNumber() != null &&
			getNationality() != null &&
			getCiNumber() != 0 &&
			getBirthDate() != null &&
			getBirthPlace() != null
		);
	}
	public void setCompleted() {}
}
