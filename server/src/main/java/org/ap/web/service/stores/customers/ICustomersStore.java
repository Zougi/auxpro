package org.ap.web.service.stores.customers;

import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.internal.APException;

public interface ICustomersStore {
	
	public CustomerBean get(String id) throws APException;
}
