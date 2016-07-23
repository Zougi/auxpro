package org.ap.web.entity.mongo;

import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.annotation.MongoObject;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@MongoObject
@JsonIgnoreProperties({"_id"})
public class AccountBean extends MongoEntity {
	
	private UserBean user;
	
	public AccountBean() {
		user = new UserBean();
	}
	
	public UserBean getUser() { return user; }
	public void setUser(UserBean user) { this.user = user; }
}
