package org.ap.web.entity.mongo;

import java.time.LocalDateTime;

import javax.xml.bind.annotation.XmlRootElement;

import org.ap.web.rest.security.annotation.PrivateInformation;

@XmlRootElement
public class UserBean extends CredentialsBean {
	
	private String id;
	private String type;
	
	private String avatar;
	
	private boolean profileActive;
	private boolean profileComplete;

	private boolean tutoSkipped;
	private LocalDateTime registrationDate;

	public UserBean() {}
	
	@PrivateInformation
	public String getId() { return id; }
	public void setId(String id) { this.id = id; }
	
	@PrivateInformation
	public boolean getProfileActive() { return profileActive; }
	public void setProfileActive(boolean active) { this.profileActive = active; }
	
	@PrivateInformation
	public boolean getProfileComplete() { return profileComplete; }
	public void setProfileComplete(boolean profileComplete) { this.profileComplete = profileComplete; }
	
	@PrivateInformation
	public boolean getTutoSkipped() { return tutoSkipped; }
	public void setTutoSkipped(boolean tutoSkipped) { this.tutoSkipped = tutoSkipped; }
	
	public String getAvatar() { return avatar; }
	public void setAvatar(String avatar) { this.avatar = avatar; }
	
	public String getType() { return type; }
	public void setType(String type) { this.type = type; }
	
	public LocalDateTime getRegistrationDate() { return registrationDate; }
	public void setRegistrationDate(LocalDateTime date) { this.registrationDate = date; }
}
