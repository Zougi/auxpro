package org.ap.web.service.stores.customers;

import static com.mongodb.client.model.Filters.eq;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.bson.Document;
import org.bson.types.ObjectId;

public class CustomersStore implements ICustomersStore {

	@Override
	public CustomerBean get(String id) throws APException {
		Document document = EMongoCollection.CUSTOMERS.getService().findOne(eq("_id", new ObjectId(id)));
		if (document == null) return null;
		return BeanConverter.convertToBean(document, CustomerBean.class);
	}
}
