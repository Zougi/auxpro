package org.ap.web.service.stores.auxiliaries;

import org.ap.web.common.EmailValidator;
import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.CredentialsBean;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;

import static com.mongodb.client.model.Filters.*;

import java.util.Date;
import java.util.List;

public class AuxiliariesStore implements IAuxiliariesStore {

	@Override
	public AuxiliaryBean[] get() throws APException {
		FindIterable<Document> iterable = EMongoCollection.AUXILIARIES.getService().find();
		List<AuxiliaryBean> result = BeanConverter.convertToBean(iterable, AuxiliaryBean.class);
		return result.toArray(new AuxiliaryBean[result.size()]);
	}
	@Override
	public AuxiliaryBean check(String name, String password) throws APException {
		Document document = EMongoCollection.AUXILIARIES.getService().findOne(and(eq("user.name", name), eq("user.password", password)));
		if (document == null) return null;
		return BeanConverter.convertToBean(document, AuxiliaryBean.class);
	}
	@Override
	public AuxiliaryBean get(String id) throws APException {
		Document document = EMongoCollection.AUXILIARIES.getService().findOne(eq("_id", new ObjectId(id)));
		if (document == null) return null;
		return BeanConverter.convertToBean(document, AuxiliaryBean.class);
	}
	@Override
	public AuxiliaryBean create(CredentialsBean bean) throws APException {
		if (!EmailValidator.getInstance().isValid(bean.getName())) throw APException.USER_NAME_INVALID;
		if (!EmailValidator.getInstance().isValid(bean.getEmail())) throw APException.USER_EMAIL_INVALID;
		if (EMongoCollection.AUXILIARIES.getService().findOne(eq("user.name", bean.getName())) != null) throw APException.USER_NAME_INUSE;
		if (EMongoCollection.AUXILIARIES.getService().findOne(eq("user.email", bean.getEmail())) != null) throw APException.USER_EMAIL_INUSE;
		AuxiliaryBean auxiliary = new AuxiliaryBean();
		UserBean user = new UserBean();
		user.setName(bean.getName());
		user.setEmail(bean.getEmail());
		user.setPassword(bean.getPassword());
		user.setRegistrationDate(new Date());
		auxiliary.setUser(user);
		Document document = BeanConverter.convertToMongo(auxiliary);
		document = EMongoCollection.AUXILIARIES.getService().create(document);		
		return BeanConverter.convertToBean(document, AuxiliaryBean.class);
	}
	@Override
	public AuxiliaryBean update(AuxiliaryBean bean) throws APException {
		Document initial = EMongoCollection.AUXILIARIES.getService().findOne(eq("user.name", bean.getUser().getName()));
		if (initial == null) throw APException.USER_NAME_INVALID;
		AuxiliaryBean previous = BeanConverter.convertToBean(initial, AuxiliaryBean.class);
		bean.setId(previous.getId());
		bean.getUser().setPassword(previous.getUser().getPassword());
		Document document = BeanConverter.convertToMongo(bean);
		document = EMongoCollection.AUXILIARIES.getService().update(document);
		return BeanConverter.convertToBean(document, AuxiliaryBean.class);
	}
	@Override
	public AuxiliaryBean delete(String id) throws APException {
		Document document = EMongoCollection.AUXILIARIES.getService().deleteOne(id);
		if (document == null) throw APException.USER_NAME_INVALID;
		return BeanConverter.convertToBean(document, AuxiliaryBean.class);
	}
}
