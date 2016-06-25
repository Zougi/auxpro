package org.ap.web.service.stores.interventions;

import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.stores.StoreBase;

import java.util.List;

public class InterventionsStore extends StoreBase<InterventionBean> implements IInterventionsStore {

	public InterventionsStore() {
		super(EMongoCollection.INTERVENTIONS, InterventionBean.class);
	}
	
	@Override
	public List<InterventionBean> getCustomerInterventions(String id) throws APException {
		return getEntityByMemberId("customerId", id);
	}
	@Override
	public List<InterventionBean> getServiceInterventions(String id) throws APException {
		return getEntityByMemberId("serviceId", id);
	}
	@Override
	public List<InterventionBean> getAuxiliaryInterventions(String id) throws APException {
		return getEntityByMemberId("auxiliaryId", id);
	}
	@Override
	public InterventionBean createIntervention(InterventionBean bean) throws APException {
		return createEntity(bean);
	}
	@Override
	public InterventionBean getIntervention(String id) throws APException {
		return getEntityById(id);
	}
	@Override
	public InterventionBean updateIntervention(InterventionBean bean) throws APException {
		return updateEntity(bean);
	}
	@Override
	public InterventionBean deleteIntervention(String id) throws APException {
		return deleteEntity(id);
	}
}
