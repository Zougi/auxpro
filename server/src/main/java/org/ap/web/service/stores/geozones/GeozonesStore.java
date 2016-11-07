package org.ap.web.service.stores.geozones;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.in;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.GeozoneBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;

public class GeozonesStore implements IGeozonesStore {

	@Override
	public GeozoneBean getGeozone(String id) throws APException {
		Document document = EMongoCollection.GEOZONES.getService().findOne(eq("_id", new ObjectId(id)));
		if (document == null) return null;
		return BeanConverter.convertToBean(document, GeozoneBean.class);
	}
	@Override
	public GeozoneBean createGeozone(GeozoneBean customer) throws APException {
		Document document = BeanConverter.convertToMongo(customer);
		document = EMongoCollection.GEOZONES.getService().create(document);		
		return BeanConverter.convertToBean(document, GeozoneBean.class);
	}
	@Override
	public GeozoneBean updateGeozone(GeozoneBean customer) throws APException {
		GeozoneBean bean = getGeozone(customer.getId());
		if (bean  == null) throw APException.MONGO_ENTITY_NOT_FOUND;
		Document document = BeanConverter.convertToMongo(customer);
		document = EMongoCollection.GEOZONES.getService().update(document);
		return getGeozone(bean.getId());
	}
	@Override
	public GeozoneBean deleteGeozone(String id) throws APException {
		Document document = EMongoCollection.GEOZONES.getService().deleteOne(id);
		if (document == null) throw APException.USER_NAME_INVALID;
		return BeanConverter.convertToBean(document, GeozoneBean.class);
	}
	@Override
	public Map<String, GeozoneBean> get(Set<String> ids) throws APException {
		Set<ObjectId> oIds = new HashSet<ObjectId>();
		for (String id : ids) {
			oIds.add(new ObjectId(id));
		}
		FindIterable<Document> iterable = EMongoCollection.GEOZONES.getService().findAll(in("_id", oIds));
		List<GeozoneBean> list = BeanConverter.convertToBean(iterable, GeozoneBean.class);
		Map<String, GeozoneBean> map = new HashMap<String, GeozoneBean>();
		for (GeozoneBean geozone : list) {
			map.put(geozone.getId(), geozone);
		}
		return map;
	}

	@Override
	public GeozoneBean[] getAuxiliaryGeozones(String id) throws APException {
		FindIterable<Document> documents = EMongoCollection.GEOZONES.getService().findAll(eq("auxiliaryId", id));
		List<GeozoneBean> result = BeanConverter.convertToBean(documents, GeozoneBean.class);
		return result.toArray(new GeozoneBean[result.size()]);
	}
}
