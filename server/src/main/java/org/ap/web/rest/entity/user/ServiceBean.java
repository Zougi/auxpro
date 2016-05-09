package org.ap.web.rest.entity.user;

import javax.xml.bind.annotation.XmlRootElement;

import org.ap.web.rest.entity.constant.EUserType;
import org.ap.web.rest.entity.contact.AddressBean;

@XmlRootElement
public class ServiceBean extends UserBean {
	
	private String phone;
	private AddressBean address;
	
	private String society;
	private String social;
	private String siret;
	
	public ServiceBean() {
		setType(EUserType.SERVICE.getId());
	}
	
	public String getSociety() { return society; }
	public void setSociety(String society) { this.society = society; }
	
	public String getPhone() { return phone; }
	public void setPhone(String phone) { this.phone = phone; }
	
	public AddressBean getAddress() { return address; }
	public void setAddress(AddressBean address) { this.address = address; }
	
	public String getSocialReason() { return social; }
	public void setSocialReason(String social) { this.social = social; }
	
	public String getSiret() { return siret; }
	public void setSiret(String siret) { this.siret = siret; }
}
