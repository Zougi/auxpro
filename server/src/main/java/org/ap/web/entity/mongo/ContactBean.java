package org.ap.web.entity.mongo;

import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown=true)
public class ContactBean {
	
	private String email;
	private boolean emailChecked;
	private String phone;
	private boolean phoneChecked;
	private AddressBean address;
	private boolean addressChecked;
	
	/* CONSTRUCTORS */
	
	public ContactBean() {
		address = new AddressBean();
	}

	/* GETTERS & SETTERS */
	
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
	
	/* ADDITIONNAL METHODS */
	
	public boolean isCompleted() {
		return (
			getEmail() != null &&
			getPhone() != null &&
			getAddress().isCompleted()
		);
	}
	public void setCompleted() {}
	
	public boolean isValidated() {
		return (
			getEmailChecked() &&
			getPhoneChecked() &&
			getAddressChecked()
		);
	}
	public void setValidated() {}
}
