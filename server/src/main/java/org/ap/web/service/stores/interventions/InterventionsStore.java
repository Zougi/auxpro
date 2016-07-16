package org.ap.web.service.stores.interventions;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.stores.StoreBase;
import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.in;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
	public Map<String, InterventionBean> get(Set<String> ids) throws APException {
		Set<ObjectId> oIds = new HashSet<ObjectId>();
		for (String id : ids) {
			oIds.add(new ObjectId(id));
		}
		FindIterable<Document> iterable = EMongoCollection.INTERVENTIONS.getService().findAll(in("_id", oIds));
		List<InterventionBean> list = BeanConverter.convertToBean(iterable, InterventionBean.class);
		Map<String, InterventionBean> map = new HashMap<String, InterventionBean>();
		for (InterventionBean intervention : list) {
			map.put(intervention.getId(), intervention);
		}
		return map;
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
