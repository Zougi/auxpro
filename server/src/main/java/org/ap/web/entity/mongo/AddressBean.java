package org.ap.web.entity.mongo;

import javax.xml.bind.annotation.XmlRootElement;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown=true)
public class AddressBean {
		
	private String address;
	private int postalCode;
	private String city;
	private String country;

	private String lattitude;
	private String longitude;
	
	/* CONSTRUCTORS */
	
	public AddressBean() {}
	
	/* GETTERS & SETTERS */
	
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
	
	/* ADDITIONNAL METHODS */
	
	public boolean isCompleted() {
		return (
			getAddress() != null &&
			getCity() != null &&
			getCountry() != null &&
			getPostalCode() != 0 &&
			getLattitude() != null &&
			getLongitude() != null
		);
	}
}
