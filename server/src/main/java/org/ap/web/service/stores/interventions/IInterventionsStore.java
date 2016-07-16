package org.ap.web.service.stores.interventions;

import java.util.Map;
import java.util.Set;

import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;

public interface IInterventionsStore {
	
	// CRUD
	
	public InterventionBean createIntervention(InterventionBean bean) throws APException;
	
	public InterventionBean getIntervention(String id) throws APException;
	
	public InterventionBean updateIntervention(InterventionBean bean) throws APException;
	
	public InterventionBean deleteIntervention(String id) throws APException;
	
	// COMPLEX
	
	public InterventionBean[] getCustomerInterventions(String sId, String cId) throws APException;
	
	public InterventionBean[] getServiceInterventions(String id) throws APException;
	
	public InterventionBean[] getAuxiliaryInterventions(String id) throws APException;
	
	public Map<String, InterventionBean> get(Set<String> ids) throws APException;
}