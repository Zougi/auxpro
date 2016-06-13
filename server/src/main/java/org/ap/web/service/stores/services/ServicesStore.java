package org.ap.web.service.stores.services;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.in;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.ap.web.common.EmailValidator;
import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.CredentialsBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;

public class ServicesStore implements IServicesStore {

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
	public ServiceBean check(String name, String password) throws APException {
		Document document = EMongoCollection.SERVICES.getService().findOne(and(eq("user.name", name), eq("user.password", password)));
		if (document == null) return null;
		return BeanConverter.convertToBean(document, ServiceBean.class);
	}
	@Override
	public ServiceBean get(String id) throws APException {
		Document document = EMongoCollection.SERVICES.getService().findOne(eq("_id", new ObjectId(id)));
		if (document == null) return null;
		return BeanConverter.convertToBean(document, ServiceBean.class);
	}
	@Override
	public ServiceBean create(CredentialsBean bean) throws APException {
		if (!EmailValidator.getInstance().isValid(bean.getName())) throw APException.USER_NAME_INVALID;
		if (!EmailValidator.getInstance().isValid(bean.getEmail())) throw APException.USER_EMAIL_INVALID;
		if (EMongoCollection.SERVICES.getService().findOne(eq("user.name", bean.getName())) != null) throw APException.USER_NAME_INUSE;
		if (EMongoCollection.SERVICES.getService().findOne(eq("user.email", bean.getEmail())) != null) throw APException.USER_EMAIL_INUSE;
		ServiceBean auxiliary = new ServiceBean();
		UserBean user = new UserBean();
		user.setName(bean.getName());
		user.setEmail(bean.getEmail());
		user.setPassword(bean.getPassword());
		auxiliary.setUser(user);
		Document document = BeanConverter.convertToMongo(auxiliary);
		document = EMongoCollection.SERVICES.getService().create(document);		
		return BeanConverter.convertToBean(document, ServiceBean.class);
	}
	@Override
	public ServiceBean update(ServiceBean bean) throws APException {
		if (EMongoCollection.SERVICES.getService().findOne(eq("user.name", bean.getUser().getName())) == null) throw APException.USER_NAME_INVALID;
		Document document = BeanConverter.convertToMongo(bean);
		document = EMongoCollection.SERVICES.getService().update(document);
		return BeanConverter.convertToBean(document, ServiceBean.class);
	}
	@Override
	public ServiceBean delete(String id) throws APException {
		Document document = EMongoCollection.SERVICES.getService().deleteOne(id);
		if (document == null) throw APException.USER_NAME_INVALID;
		return BeanConverter.convertToBean(document, ServiceBean.class);
	}
}
