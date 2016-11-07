package org.ap.web.entity.mongo;

import java.time.LocalDate;

import org.ap.web.entity.MongoEntity;
import org.ap.web.entity.constant.EPersonSex;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties(ignoreUnknown = true, value = {"_id"})
public class CustomerBean extends MongoEntity {

	/* ATTRIBUTES */
	
	@MongoId
	private String serviceId;

	private EPersonSex civility = EPersonSex.NULL;
	private String firstName;
	private String lastName;
	private String nationality;
	private LocalDate birthDate;

	private String email;
	private String phone;
	
	private String address;
	private int postalCode;
	private String city;
	private String country;
	private String lattitude;
	private String longitude;
	
	private int housework;
	private int nursing;
	private int childhood;
	private int shopping;
	private int compagny;
	private int administrative;
	private int doityourself;	
	
	/* CONSTRUCTOR */
	
	public CustomerBean() {}

	/* METHODS */
	
	public String getServiceId() { return serviceId; }
	public void setServiceId(String serviceId) { this.serviceId = serviceId; }
	
	public String getCivility() { return civility.getId(); }
	public void setCivility(String civility) { this.civility = EPersonSex.fromString(civility); }
	
	public String getFirstName() { return firstName; }
	public void setFirstName(String firstname) { this.firstName = firstname; }
	
	public String getLastName() { return lastName; }
	public void setLastName(String lastName) { this.lastName = lastName; }
	
	public String getNationality() { return nationality; }
	public void setNationality(String nationality) { this.nationality = nationality; }
	
	public LocalDate getBirthDate() { return birthDate; }
	public void setBirthDate(LocalDate birthDate) { this.birthDate = birthDate; }
	
	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }

	public String getPhone() { return phone; }
	public void setPhone(String phone) { this.phone = phone; }

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
}
