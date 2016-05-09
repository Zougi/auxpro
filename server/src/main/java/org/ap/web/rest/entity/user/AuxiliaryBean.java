package org.ap.web.rest.entity.user;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import org.ap.web.rest.entity.constant.EAuxCivility;
import org.ap.web.rest.entity.constant.EUserType;
import org.ap.web.rest.entity.contact.AddressBean;

@XmlRootElement
public class AuxiliaryBean extends UserBean {
	
	private EAuxCivility civility = EAuxCivility.NULL;
	private String firstName;
	private String lastName;
	private String phone;
	private AddressBean address;
	private Date birthDate;
	private String birthPlace;
	private String diploma;

	public AuxiliaryBean() {
		setType(EUserType.AUXILIARY.getId());
	}
	
	public String getCivility() { return civility.getId(); }
	public void setCivility(String civility) { this.civility = EAuxCivility.fromString(civility); }
	
	public String getFirstName() { return firstName; }
	public void setFirstName(String firstname) { this.firstName = firstname; }
	
	public String getLastName() { return lastName; }
	public void setLastName(String lastName) { this.lastName = lastName; }
	
	public String getPhone() { return phone; }
	public void setPhone(String phone) { this.phone = phone; }
	
	public AddressBean getAddress() { return address; }
	public void setAdress(AddressBean adress) { this.address = adress; }
	
	public Date getBirthDate() { return birthDate; }
	public void setBirthDate(Date birthDate) { this.birthDate = birthDate; }
	
	public String getBirthPlace() { return birthPlace; }
	public void setBirthPlace(String birthPlace) { this.birthPlace = birthPlace; }
	
	public String getDiploma() { return diploma; }
	public void setDiploma(String diploma) { this.diploma = diploma; }
}
