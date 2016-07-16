package org.ap.web.service.stores.indisponibilities;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.stores.StoreBase;
import org.bson.Document;

import static com.mongodb.client.model.Filters.*;

import java.util.List;

public class IndisponibilitiesStore extends StoreBase<IndisponibilityBean> implements IIndisponibilitiesStore {

	public IndisponibilitiesStore() {
		super(EMongoCollection.INDISPONIBILITIES, IndisponibilityBean.class);
	}
	
	/* METHODS */
	
	@Override
	public IndisponibilityBean[] getAuxIndisponibilities(String id) throws APException {
		List<IndisponibilityBean> result = getEntityWhere(eq("auxiliaryId", id));
		return result.toArray(new IndisponibilityBean[result.size()]);
	}
	@Override
	public IndisponibilityBean getIndisponibility(String absId) throws APException {
		return getEntityById(absId);
	}
	@Override
	public IndisponibilityBean createIndisponibility(IndisponibilityBean bean) throws APException {
		return createEntity(bean);
	}
	@Override
	public IndisponibilityBean updateIndisponibility(IndisponibilityBean indisponibility) throws APException {
		IndisponibilityBean bean = getIndisponibility(indisponibility.getId());
		if (bean  == null) throw APException.MONGO_ENTITY_NOT_FOUND;
		Document document = BeanConverter.convertToMongo(indisponibility);
		document = EMongoCollection.INDISPONIBILITIES.getService().update(document);
		return getIndisponibility(bean.getId());
	}
	@Override
	public IndisponibilityBean deleteIndisponibility(String id) throws APException {
		return deleteEntity(id);
	}
}
