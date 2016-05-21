package org.ap.web.service.stores.user;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.AccountBean;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.stores.auxiliaries.AuxiliariesStore;
import org.ap.web.service.stores.auxiliaries.IAuxiliariesStore;
import org.ap.web.service.stores.services.IServicesStore;
import org.ap.web.service.stores.services.ServicesStore;
import org.bson.Document;
import org.bson.types.ObjectId;

public class UserStore implements IUserStore {

	private IAuxiliariesStore _auxStore;
	private IServicesStore _sadStore;
	
	public UserStore() {
		_auxStore = new AuxiliariesStore();
		_sadStore = new ServicesStore();
	}

	@Override
	public UserBean check(String name, String password) throws APException {
		Document document = EMongoCollection.ACCOUNTS.getService().findOne(and(eq("user.name", name), eq("user.password", password)));
		if (document != null) {
			AccountBean bean = BeanConverter.convertToBean(document, AccountBean.class);
			UserBean user = bean.getUser();
			user.setId(bean.getId());
			return user;
		}
		AuxiliaryBean aux = _auxStore.check(name, password);
		if (aux != null) {
			UserBean user = aux.getUser();
			user.setId(aux.getId());
			return user;
		}
		ServiceBean sad = _sadStore.check(name, password);
		if (sad != null) {
			UserBean user = sad.getUser();
			user.setId(sad.getId());
			return user;
		}
		return null;
	}
	@Override
	public UserBean get(String id) throws APException {
		Document document = EMongoCollection.ACCOUNTS.getService().findOne(eq("_id", new ObjectId(id)));
		if (document != null) {
			UserBean user = BeanConverter.convertToBean(document, AccountBean.class).getUser();
			user.setId(id);
			return user;
		}
		AuxiliaryBean aux = _auxStore.get(id);
		if (aux != null) {
			UserBean user = aux.getUser();
			user.setId(id);
			return user;
		}
		ServiceBean sad = _sadStore.get(id);
		if (sad != null) {
			UserBean user = sad.getUser();
			user.setId(id);
			return user;
		}
		return null;
	}
}
