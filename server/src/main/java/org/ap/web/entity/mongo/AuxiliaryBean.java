package org.ap.web.entity.mongo;

import java.time.LocalDate;

import org.ap.web.entity.MongoEntity;
import org.ap.web.entity.constant.EPersonSex;
import org.ap.web.internal.annotation.MongoObject;
import org.ap.web.rest.security.annotation.PrivateInformation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class AuxiliaryBean extends MongoEntity {

	/* ATTRIBUTES */

	private String avatar;
	private boolean tutoSkipped;

	private EPersonSex civility = EPersonSex.NULL;
	private String firstName;
	private String lastName;
	private String socialNumber;
	private String nationality;
	private String ciNumber;
	private LocalDate birthDate;
	private String birthCity;
	private String birthCountry;

	private String email;
	private boolean emailChecked;
	private String phone;
	private boolean phoneChecked;
	private String address;
	private int postalCode;
	private String city;
	private String country;
	private String lattitude;
	private String longitude;
	private boolean addressChecked;

	private boolean entrepreneur;
	private String diploma;
	private String diplomaCopy;
	private boolean diplomaChecked;
	private String description;

	private int[] answers;

	private int housework;
	private int nursing;
	private int childhood;
	private int shopping;
	private int compagny;
	private int administrative;
	private int doityourself;

	/* CONSTRUCTORS */

	public AuxiliaryBean() {}

	/* GETTERS & SETTERS */

	@PrivateInformation
	public boolean getTutoSkipped() { return tutoSkipped; }
	public void setTutoSkipped(boolean tutoSkipped) { this.tutoSkipped = tutoSkipped; }

	public String getAvatar() { return avatar; }
	public void setAvatar(String avatar) { this.avatar = avatar; }

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

	public String getCiNumber() { return ciNumber; }
	public void setCiNumber(String ciNumber) { this.ciNumber = ciNumber; }

	public LocalDate getBirthDate() { return birthDate; }
	public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }

	public String getBirthCity() { return birthCity; }
	public void setBirthCity(String birthCity) { this.birthCity = birthCity; }

	public String getBirthCountry() { return birthCountry; }
	public void setBirthCountry(String birthCountry) { this.birthCountry = birthCountry; }

	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }
	public boolean getEmailChecked() { return emailChecked; }
	public void setEmailChecked(boolean emailChecked) { this.emailChecked = emailChecked; }

	public String getPhone() { return phone; }
	public void setPhone(String phone) { this.phone = phone; }
	public boolean getPhoneChecked() { return phoneChecked; }
	public void setPhoneChecked(boolean phoneChecked) { this.phoneChecked = phoneChecked; }

	public String getAddress() { return address; }
	public void setAddress(String address) { this.address = address; }
	public int getPostalCode() { return postalCode; }
	public void setPostalCode(int postalCode) { this.postalCode = postalCode; }
	public String getCity() { return city; }
	public void setCity(String city) { this.city = city; }
	public String getCountry() { return country; }
	public void setCountry(String country) { this.country = country; }
	public String getLattitude() { return lattitude; }
	public void setLattitude(String lattitude) { this.lattitude = lattitude; }
	public String getLongitude() { return longitude; }
	public void setLongitude(String longitude) { this.longitude = longitude; }
	public boolean getAddressChecked() { return addressChecked; }
	public void setAddressChecked(boolean addressChecked) { this.addressChecked = addressChecked; };

	public boolean getEntrepreneur() { return entrepreneur; }
	public void setEntrepreneur(boolean entrepreneur) { this.entrepreneur = entrepreneur; }

	public String getDiploma() { return diploma; }
	public void setDiploma(String diploma) { this.diploma = diploma; }
	public String getDiplomaCopy() { return diplomaCopy; }
	public void setDiplomaCopy(String diplomaCopy) { this.diplomaCopy = diplomaCopy; }
	public boolean getDiplomaChecked() { return diplomaChecked; }
	public void setDiplomaChecked(boolean diplomaChecked) { this.diplomaChecked = diplomaChecked; }

	public String getDescription() { return description; }
	public void setDescription(String description) { this.description = description; }

	public int[] getAnswers() { return answers; }
	public void setAnswers(int[] answers) { this.answers = answers; }

	public int getHousework() { return housework; }
	public void setHousework(int housework) { this.housework = housework; }

	public int getNursing() { return nursing; }
	public void setNursing(int nursing) { this.nursing = nursing; }

	public int getChildhood() { return childhood; }
	public void setChildhood(int childhood) { this.childhood = childhood; }

	public int getShopping() { return shopping; }
	public void setShopping(int shopping) { this.shopping = shopping; }	

	public int getCompagny() { return compagny; }
	public void setCompagny(int compagny) { this.compagny = compagny; }

	public int getAdministrative() { return administrative; }
	public void setAdministrative(int administrative) { this.administrative = administrative; }

	public int getDoityourself() { return doityourself; }
	public void setDoityourself(int doityourself) { this.doityourself = doityourself; }

	public boolean getProfileCompleted() {
		return (
				!getCivility().equals(EPersonSex.NULL) &&  
				getFirstName() != null &&
				getLastName() != null &&
				getSocialNumber() != null &&
				getNationality() != null &&
				getCiNumber() != null &&
				getBirthDate() != null &&
				getBirthCity() != null &&
				getBirthCountry() != null &&
				getEmail() != null &&
				getPhone() != null &&
				getAddress() != null &&
				getCity() != null &&
				getCountry() != null &&
				getPostalCode() != 0 &&
				getLattitude() != null &&
				getLongitude() != null &&
				getDescription() != null
				);
	}
	public void setProfileCompleted(boolean profileCompleted) {}
}
