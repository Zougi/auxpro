package org.ap.web.service.stores.geozones;

import java.util.Map;
import java.util.Set;

import org.ap.web.entity.mongo.GeozoneBean;
import org.ap.web.internal.APException;

public interface IGeozonesStore {

	// CRUD

	public GeozoneBean getGeozone(String id) throws APException;

	public GeozoneBean createGeozone(GeozoneBean geozone) throws APException;

	public GeozoneBean updateGeozone(GeozoneBean geozone) throws APException;

	public GeozoneBean deleteGeozone(String id) throws APException;
	
	// COMPLEX
	
	public Map<String, GeozoneBean> get(Set<String> ids) throws APException;

	public GeozoneBean[] getAuxiliaryGeozones(String id) throws APException;
}
