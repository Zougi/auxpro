package org.ap.web.service.stores.auxiliaries;

import org.ap.web.common.EmailValidator;
import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.auxiliary.AuxiliaryBean;
import org.ap.web.entity.mongo.GeoZoneBean;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.stores.StoreBase;
import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;

import static com.mongodb.client.model.Filters.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class AuxiliariesStore extends StoreBase<AuxiliaryBean> implements IAuxiliariesStore {

	public AuxiliariesStore() {
		super(EMongoCollection.AUXILIARIES, AuxiliaryBean.class);
	}
	
	@Override
	public AuxiliaryBean[] get() throws APException {
		FindIterable<Document> iterable = EMongoCollection.AUXILIARIES.getService().find();
		List<AuxiliaryBean> result = BeanConverter.convertToBean(iterable, AuxiliaryBean.class);
		return result.toArray(new AuxiliaryBean[result.size()]);
	}
	@Override
	public AuxiliaryBean get(String id) throws APException {
		return getEntityById(id);
	}
	@Override
	public AuxiliaryBean create(UserBean bean) throws APException {
		if (!EmailValidator.getInstance().isValid(bean.getName())) throw APException.USER_NAME_INVALID;
		if (EMongoCollection.AUXILIARIES.getService().findOne(eq("name", bean.getName())) != null) throw APException.USER_NAME_INUSE;
		if (EMongoCollection.AUXILIARIES.getService().findOne(eq("email", bean.getName())) != null) throw APException.USER_EMAIL_INUSE;
		AuxiliaryBean auxiliary = new AuxiliaryBean();
		auxiliary.setEmail(bean.getName());
		return createEntity(auxiliary);
	}
	@Override
	public AuxiliaryBean update(AuxiliaryBean bean) throws APException {
		Document initial = EMongoCollection.AUXILIARIES.getService().findOne(eq("_id", new ObjectId(bean.getId())));
		if (initial == null) throw APException.USER_NAME_INVALID;
		AuxiliaryBean previous = BeanConverter.convertToBean(initial, AuxiliaryBean.class);
		bean.setId(previous.getId());
		return updateEntity(bean);
	}
	@Override
	public AuxiliaryBean delete(String id) throws APException {
		return deleteEntity(id);
	}
	@Override
	public Map<String, AuxiliaryBean> get(Set<String> ids) throws APException {
		Set<ObjectId> oIds = new HashSet<ObjectId>();
		for (String id : ids) {
			oIds.add(new ObjectId(id));
		}
		FindIterable<Document> iterable = EMongoCollection.AUXILIARIES.getService().findAll(in("_id", oIds));
		List<AuxiliaryBean> list = BeanConverter.convertToBean(iterable, AuxiliaryBean.class);
		Map<String, AuxiliaryBean> map = new HashMap<String, AuxiliaryBean>();
		for (AuxiliaryBean auxiliary : list) {
			map.put(auxiliary.getId(), auxiliary);
		}
		return map;
	}

	@Override
	public AuxiliaryBean getGeoZones(String id) throws APException {
		List<String> projections = new ArrayList<String>();
		projections.add("geoZones");
		AuxiliaryBean auxiliary = getEntityById(id, projections);
		return auxiliary;
	}
	
	@Override
	public AuxiliaryBean createGeoZone(String id, GeoZoneBean bean) throws APException {
		return pushToEntity(id, "geoZones", BeanConverter.convertToMongo(bean));
	}
	
	@Override
	public AuxiliaryBean deleteGeoZone(String id, GeoZoneBean bean) throws APException {
		Map<String, String> matchingfields = new LinkedHashMap<String, String>();
		matchingfields.put("lattitude", bean.getLattitude());
		matchingfields.put("longitude", bean.getLongitude());
		return deleteFromArray(id, matchingfields);
	}
}
