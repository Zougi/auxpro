package org.ap.web.service.stores.interventions;

import java.util.List;

import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;

public interface IInterventionsStore {
	
	public List<InterventionBean> getCustomerInterventions(String id) throws APException;
	
	public List<InterventionBean> getServiceInterventions(String id) throws APException;
	
	public List<InterventionBean> getAuxiliaryInterventions(String id) throws APException;

	public InterventionBean createIntervention(InterventionBean bean) throws APException;
	
	public InterventionBean getIntervention(String id) throws APException;
	
	public InterventionBean updateIntervention(InterventionBean bean) throws APException;
	
	public InterventionBean deleteIntervention(String id) throws APException;	
}
