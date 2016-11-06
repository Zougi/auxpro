package org.ap.web.service.stores.services;

import java.util.Map;
import java.util.Set;

import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;

public interface IServicesStore {

	public ServiceBean[] get() throws APException;
	
	public Map<String, ServiceBean> get(Set<String> ids) throws APException;
	
	public ServiceBean[] get(int postal) throws APException;
	
	public ServiceBean get(String id) throws APException;
	
	public ServiceBean create(UserBean bean) throws APException;
	
	public ServiceBean update(ServiceBean bean) throws APException;
	
	public ServiceBean delete(String id) throws APException;
}
