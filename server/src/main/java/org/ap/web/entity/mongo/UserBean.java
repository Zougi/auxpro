package org.ap.web.entity.mongo;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import org.ap.web.rest.security.annotation.PrivateInformation;
import org.ap.web.rest.security.annotation.SecretInformation;

@XmlRootElement
public class UserBean extends CredentialsBean {
	
	private String id;
	private String type;
	
	private boolean active;
	private boolean tutoSkipped;
	private Date registrationDate;

	public UserBean() {}
	
	@SecretInformation
	public String getId() { return id; }
	public void setId(String id) { this.id = id; }
	
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
