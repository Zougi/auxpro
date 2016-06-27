package org.ap.web.service.stores.interventions;

import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.stores.StoreBase;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.util.List;

public class InterventionsStore extends StoreBase<InterventionBean> implements IInterventionsStore {

	public InterventionsStore() {
		super(EMongoCollection.INTERVENTIONS, InterventionBean.class);
	}
	
	@Override
	public InterventionBean[] getCustomerInterventions(String sId, String cId) throws APException {
		List<InterventionBean> result = getEntityWhere(and(eq("serviceId", sId), eq("customerId", cId)));
		return result.toArray(new InterventionBean[result.size()]);
	}
	@Override
	public InterventionBean[] getServiceInterventions(String id) throws APException {
		List<InterventionBean> result = getEntityWhere(eq("serviceId", id));
		return result.toArray(new InterventionBean[result.size()]);
	}
	@Override
	public InterventionBean[] getAuxiliaryInterventions(String id) throws APException {
		List<InterventionBean> result = getEntityWhere(eq("auxiliaryId", id));
		return result.toArray(new InterventionBean[result.size()]);
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
