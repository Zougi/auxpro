package org.ap.web.service.stores.auxiliaries;

import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.CredentialsBean;
import org.ap.web.entity.mongo.GeoZoneBean;
import org.ap.web.internal.APException;

public interface IAuxiliariesStore {

	public AuxiliaryBean[] get() throws APException;
	
	public AuxiliaryBean check(String name, String password) throws APException;
	
	public AuxiliaryBean get(String id) throws APException;
	
	public AuxiliaryBean getGeoZones(String id) throws APException;
	
	public AuxiliaryBean create(CredentialsBean bean) throws APException;
	
	public AuxiliaryBean update(AuxiliaryBean bean) throws APException;

	public AuxiliaryBean delete(String id) throws APException;

	AuxiliaryBean createGeoZone(String id, GeoZoneBean bean) throws APException;

	AuxiliaryBean deleteGeoZone(String id, GeoZoneBean bean) throws APException;
}
