package org.ap.web.service.stores.customers;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Filters.in;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;

public class CustomersStore implements ICustomersStore {

	@Override
	public CustomerBean get(String id) throws APException {
		Document document = EMongoCollection.CUSTOMERS.getService().findOne(eq("_id", new ObjectId(id)));
		if (document == null) return null;
		return BeanConverter.convertToBean(document, CustomerBean.class);
	}
	
	@Override
	public Map<String, CustomerBean> get(Set<String> ids) throws APException {
		Set<ObjectId> oIds = new HashSet<ObjectId>();
		for (String id : ids) {
			oIds.add(new ObjectId(id));
		}
		FindIterable<Document> iterable = EMongoCollection.CUSTOMERS.getService().findAll(in("_id", oIds));
		List<CustomerBean> list = BeanConverter.convertToBean(iterable, CustomerBean.class);
		Map<String, CustomerBean> map = new HashMap<String, CustomerBean>();
		for (CustomerBean customer : list) {
			map.put(customer.getId(), customer);
		}
		return map;
	}
}
