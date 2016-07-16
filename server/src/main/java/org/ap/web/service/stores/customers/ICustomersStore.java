package org.ap.web.service.stores.customers;

import java.util.Map;
import java.util.Set;

import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.internal.APException;

public interface ICustomersStore {

	// CRUD

	public CustomerBean getCustomer(String id) throws APException;

	public CustomerBean createCustomer(CustomerBean customer) throws APException;

	public CustomerBean updateCustomer(CustomerBean customer) throws APException;

	public CustomerBean deleteCustomer(String id) throws APException;
	
	// COMPLEX
	
	public Map<String, CustomerBean> get(Set<String> ids) throws APException;

	public CustomerBean[] getServiceCustomers(String id) throws APException;
}
