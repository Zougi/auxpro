package org.ap.web.service.stores.user;

import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;

public interface IUserStore {

	public UserBean check(String username, String password) throws APException;
	
	public UserBean get(String id) throws APException;
}
