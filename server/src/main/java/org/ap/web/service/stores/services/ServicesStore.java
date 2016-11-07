package org.ap.web.service.stores.services;

import static com.mongodb.client.model.Filters.*;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.ap.web.common.EmailValidator;
import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.stores.StoreBase;
import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;

public class ServicesStore extends StoreBase<ServiceBean> implements IServicesStore {

	public ServicesStore() {
		super(EMongoCollection.SERVICES, ServiceBean.class);
	}

	@Override
	public ServiceBean[] get() throws APException {
		FindIterable<Document> iterable = EMongoCollection.SERVICES.getService().find();
		List<ServiceBean> result = BeanConverter.convertToBean(iterable, ServiceBean.class);
		return result.toArray(new ServiceBean[result.size()]);
	}
	@Override
	public Map<String, ServiceBean> get(Set<String> ids) throws APException {
		Set<ObjectId> oIds = new HashSet<ObjectId>();
		for (String id : ids) {
			oIds.add(new ObjectId(id));
		}
		FindIterable<Document> iterable = EMongoCollection.SERVICES.getService().findAll(in("_id", oIds));
		List<ServiceBean> list = BeanConverter.convertToBean(iterable, ServiceBean.class);
		Map<String, ServiceBean> map = new HashMap<String, ServiceBean>();
		for (ServiceBean service : list) {
			map.put(service.getId(), service);
		}
		return map;
	}
	@Override
	public ServiceBean[] get(int postal) throws APException {
		FindIterable<Document> iterable = EMongoCollection.SERVICES.getService().findAll(eq("contact.address.postalCode", postal));
		List<ServiceBean> result = BeanConverter.convertToBean(iterable, ServiceBean.class);
		return result.toArray(new ServiceBean[result.size()]);
	}
	
	@Override
	public ServiceBean get(String id) throws APException {
		Document document = EMongoCollection.SERVICES.getService().findOne(eq("_id", new ObjectId(id)));
		if (document == null) return null;
		return BeanConverter.convertToBean(document, ServiceBean.class);
	}
	@Override
	public ServiceBean create(UserBean bean) throws APException {
		if (!EmailValidator.getInstance().isValid(bean.getName())) throw APException.USER_NAME_INVALID;
		if (EMongoCollection.SERVICES.getService().findOne(eq("name", bean.getName())) != null) throw APException.USER_NAME_INUSE;
		if (EMongoCollection.SERVICES.getService().findOne(eq("email", bean.getName())) != null) throw APException.USER_EMAIL_INUSE;
		ServiceBean service = new ServiceBean();
		service.setEmail(bean.getName());
		Document document = BeanConverter.convertToMongo(service);
		document = EMongoCollection.SERVICES.getService().create(document);		
		return BeanConverter.convertToBean(document, ServiceBean.class);
	}
	@Override
	public ServiceBean update(ServiceBean bean) throws APException {
		Document initial = EMongoCollection.SERVICES.getService().findOne(eq("_id", new ObjectId(bean.getId())));
		if (initial == null) throw APException.USER_NAME_INVALID;
		ServiceBean previous = BeanConverter.convertToBean(initial, ServiceBean.class);
		bean.setId(previous.getId());
		return updateEntity(bean);
	}
	@Override
	public ServiceBean delete(String id) throws APException {
		Document document = EMongoCollection.SERVICES.getService().deleteOne(id);
		if (document == null) throw APException.USER_NAME_INVALID;
		return BeanConverter.convertToBean(document, ServiceBean.class);
	}
}
