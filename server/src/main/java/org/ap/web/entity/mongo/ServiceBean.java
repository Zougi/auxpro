package org.ap.web.entity.mongo;

import javax.xml.bind.annotation.XmlRootElement;

import org.ap.web.entity.MongoEntity;
import org.ap.web.rest.security.annotation.PrivateInformation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown = true, value = {"_id"})
public class ServiceBean extends MongoEntity {

	private String name;
	private String avatar;
	private boolean tutoSkipped;

	private String email;
	private boolean emailChecked;
	private String phone;
	private boolean phoneChecked;
	private AddressBean address;
	private boolean addressChecked;

	private String society;
	private String social;
	private String siret;

	public ServiceBean() {}

	@PrivateInformation
	public String getName() { return name; }
	public void setName(String name) { this.name = name; }

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

	public AddressBean getAddress() { return address; }
	public void setAddress(AddressBean address) { this.address = address; }
	public boolean getAddressChecked() { return addressChecked; }
	public void setAddressChecked(boolean addressChecked) { this.addressChecked = addressChecked; };
	public String getSociety() { return society; }
	public void setSociety(String society) { this.society = society; }

	public String getSocialReason() { return social; }
	public void setSocialReason(String social) { this.social = social; }

	public String getSiret() { return siret; }
	public void setSiret(String siret) { this.siret = siret; }

	public boolean getProfileCompleted() {
		return (
				getEmailChecked() &&
				getPhoneChecked() &&
				getAddressChecked() &&
				society != null &&
				social != null &&
				siret != null
				);
	}
	public void setProfileCompleted(boolean profileCompleted) {}
}
