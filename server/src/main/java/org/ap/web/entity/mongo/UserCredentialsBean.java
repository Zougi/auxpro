package org.ap.web.entity.mongo;

import javax.xml.bind.annotation.XmlRootElement;

import org.ap.web.rest.security.annotation.PrivateInformation;
import org.ap.web.rest.security.annotation.SecretInformation;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@XmlRootElement
@JsonIgnoreProperties(ignoreUnknown=true)
public class UserCredentialsBean {
	
	private String name;
	private String password;
	private String type;

	public UserCredentialsBean() {}
	
	@PrivateInformation
	public String getName() { return name; }
	public void setName(String username) { this.name = username; }
	
	@SecretInformation
	public String getPassword() { return password; }
	public void setPassword(String password) { this.password = password; }

	@PrivateInformation
	public String getType() { return type; }
	public void setType(String type) { this.type = type; }	
}
