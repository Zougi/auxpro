package org.ap.web.rest.entity.user;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import org.ap.web.rest.security.annotation.PrivateInformation;

@XmlRootElement
public class UserBean extends CredentialsBean {
	
	private boolean active;
	private boolean tutoSkipped;
	private String type;
	private Date registrationDate;

	public UserBean() {}
	
	@PrivateInformation
	public boolean getActive() { return active; }
	public void setActive(boolean active) { this.active = active; }
	
	@PrivateInformation
	public boolean getTutoSkipped() { return tutoSkipped; }
	public void setTutoSkipped(boolean tutoSkipped) { this.tutoSkipped = tutoSkipped; }
	
	public String getType() { return type; }
	public void setType(String type) { this.type = type; }
	
	public Date getRegistrationDate() { return registrationDate; }
	public void setRegistrationDate(Date date) { this.registrationDate = date; }
}
