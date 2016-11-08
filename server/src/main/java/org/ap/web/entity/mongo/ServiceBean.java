package org.ap.web.entity.mongo;

import javax.xml.bind.annotation.XmlRootElement;

import org.ap.web.entity.MongoEntity;
import org.ap.web.rest.security.annotation.PrivateInformation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown = true, value = {"_id"})
public class ServiceBean extends MongoEntity {

	private String avatar;
	private boolean tutoSkipped;

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

	private String socialReason;
	private String function;
	private String siret;

	public ServiceBean() {}

	@PrivateInformation
	public boolean getTutoSkipped() { return tutoSkipped; }
	public void setTutoSkipped(boolean tutoSkipped) { this.tutoSkipped = tutoSkipped; }
	
	public String getAvatar() { return avatar; }
	public void setAvatar(String avatar) { this.avatar = avatar; }
	
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
	
	public String getSocialReason() { return socialReason; }
	public void setSocialReason(String socialReason) { this.socialReason = socialReason; }

	public String getFunction() { return function; }
	public void setFunction(String function) { this.function = function; }

	public String getSiret() { return siret; }
	public void setSiret(String siret) { this.siret = siret; }

	public boolean getProfileCompleted() {
		return (
				getEmailChecked() &&
				getPhoneChecked() &&
				getAddressChecked() &&
				socialReason != null &&
				function != null &&
				siret != null
				);
	}
	public void setProfileCompleted(boolean profileCompleted) {}
}
