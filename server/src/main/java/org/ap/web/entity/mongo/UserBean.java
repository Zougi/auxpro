package org.ap.web.entity.mongo;

import java.time.LocalDateTime;

import javax.xml.bind.annotation.XmlRootElement;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoId;
import org.ap.web.rest.security.annotation.PrivateInformation;
import org.ap.web.rest.security.annotation.SecretInformation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown=true)
public class UserBean extends MongoEntity {
	
	/* ATTRIBUTES */
	
	@MongoId
	private String userId;

	private String name;
	private String password;
	private String type;
	private boolean profileActive;
	private LocalDateTime registrationDate;
	
	/* CONSTRUCTOR */

	public UserBean() {}
	
	/* METHODS */
	
	@PrivateInformation
	public String getUserId() { return userId; }
	public void setUserId(String userId) { this.userId = userId; }
	
	@PrivateInformation
	public String getName() { return name; }
	public void setName(String name) { this.name = name; }
	
	@SecretInformation
	public String getPassword() { return password; }
	public void setPassword(String password) { this.password = password; }
	
	@PrivateInformation
	public boolean getProfileActive() { return profileActive; }
	public void setProfileActive(boolean active) { this.profileActive = active; }
	
	public String getType() { return type; }
	public void setType(String type) { this.type = type; }
	
	public LocalDateTime getRegistrationDate() { return registrationDate; }
	public void setRegistrationDate(LocalDateTime date) { this.registrationDate = date; }

}
