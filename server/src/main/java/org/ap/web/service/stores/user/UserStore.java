package org.ap.web.service.stores.user;

import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;

import java.time.LocalDateTime;

import org.ap.web.common.EmailValidator;
import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.entity.mongo.UserCredentialsBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.ap.web.service.stores.StoreBase;
import org.bson.Document;
import org.bson.types.ObjectId;

public class UserStore extends StoreBase<UserBean> implements IUsersStore {

	private static final String MONGO_ID = "_id";
	private static final String NAME = "name";
	private static final String PASSWORD = "password";
	
	public UserStore() {
		super(EMongoCollection.USERS, UserBean.class);
	}

	@Override
	public UserBean check(String name, String password) throws APException {
		Document document = EMongoCollection.USERS.getService().findOne(and(eq(NAME, name), eq(PASSWORD, password)));
		if (document != null) {
			return BeanConverter.convertToBean(document, UserBean.class);
		}
		return null;
	}
	@Override
	public UserBean get(String id) throws APException {
		Document document = EMongoCollection.USERS.getService().findOne(eq(MONGO_ID, new ObjectId(id)));
		if (document != null) {
			return BeanConverter.convertToBean(document, UserBean.class);
		}
		return null;
	}

	@Override
	public UserBean create(UserCredentialsBean bean) throws APException {
		if (!EmailValidator.getInstance().isValid(bean.getName())) throw APException.USER_NAME_INVALID;
		if (EMongoCollection.USERS.getService().findOne(eq("name", bean.getName())) != null) throw APException.USER_NAME_INUSE;
		UserBean user = new UserBean();
		user.setType(bean.getType());
		user.setName(bean.getName());
		user.setPassword(bean.getPassword());
		user.setRegistrationDate(LocalDateTime.now());
		user.setProfileActive(true);
		return createEntity(user);
	}
}
