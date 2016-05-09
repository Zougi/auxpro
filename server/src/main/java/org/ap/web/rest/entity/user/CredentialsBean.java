package org.ap.web.rest.entity.user;

import javax.xml.bind.annotation.XmlRootElement;

import org.ap.web.rest.security.annotation.PrivateInformation;
import org.ap.web.rest.security.annotation.SecretInformation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown=true)
public class CredentialsBean {
	
	private String name;
	private String password;
	private String email;

	public CredentialsBean() {}
	
	@PrivateInformation
	public String getName() { return name; }
	public void setName(String username) { this.name = username; }
	
	@SecretInformation
	public String getPassword() { return password; }
	public void setPassword(String password) { this.password = password; }
	
	@PrivateInformation
	public String getEmail() { return email; }
	public void setEmail(String email) { this.email = email; }
}
