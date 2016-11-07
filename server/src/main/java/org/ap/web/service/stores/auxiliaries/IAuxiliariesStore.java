package org.ap.web.service.stores.auxiliaries;

import java.util.Map;
import java.util.Set;

import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.GeozoneBean;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;

public interface IAuxiliariesStore {

	// CRUD
	
	public AuxiliaryBean get(String id) throws APException;
	
	public AuxiliaryBean create(UserBean bean) throws APException;
	
	public AuxiliaryBean update(AuxiliaryBean bean) throws APException;

	public AuxiliaryBean delete(String id) throws APException;
	
	// SIMPLE
	
	public AuxiliaryBean[] get() throws APException;
	
	// COMPLEX
	
	public Map<String, AuxiliaryBean> get(Set<String> ids) throws APException;

	// GEO ZONE CRUD

	public AuxiliaryBean getGeoZones(String id) throws APException;

	public AuxiliaryBean createGeoZone(String id, GeozoneBean bean) throws APException;

	public AuxiliaryBean deleteGeoZone(String id, GeozoneBean bean) throws APException;
}
