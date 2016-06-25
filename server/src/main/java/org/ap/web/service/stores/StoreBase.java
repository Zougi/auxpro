package org.ap.web.service.stores;

import static com.mongodb.client.model.Filters.eq;

import java.util.List;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.MongoEntity;
import org.ap.web.internal.APException;
import org.ap.web.service.EMongoCollection;
import org.bson.Document;
import org.bson.types.ObjectId;

import com.mongodb.client.FindIterable;

public class StoreBase<T extends MongoEntity> {

	private EMongoCollection _collection;
	private Class<T> _class;
	
	protected StoreBase(EMongoCollection collection, Class<T> clazz) {
		_collection = collection;
		_class = clazz;
	}

	protected T getEntityById(String id) throws APException {
		Document document = _collection.getService().findOne(eq("_id", new ObjectId(id)));
		if (document == null) return null; 
		return BeanConverter.convertToBean(document, _class);
	}
	
	protected List<T> getEntityByMemberId(String member, String id) throws APException {
		FindIterable<Document> documents = _collection.getService().findAll(eq("member", id));
		return BeanConverter.convertToBean(documents, _class);
	}
	
	protected T createEntity(T entity) throws APException {
		Document document = BeanConverter.convertToMongo(entity);
		document = _collection.getService().create(document);		
		return BeanConverter.convertToBean(document, _class);
	}
	
	protected T updateEntity(T bean) throws APException {
		Document document = BeanConverter.convertToMongo(bean);
		document = _collection.getService().update(document);
		if (document == null) throw APException.MONGO_ENTITY_NOT_FOUND;
		return getEntityById(bean.getId());
	}
	
	protected T deleteEntity(String id) throws APException {
		Document document = _collection.getService().deleteOne(id);
		if (document == null) throw APException.MONGO_ENTITY_NOT_FOUND;
		return BeanConverter.convertToBean(document, _class);
	}	
}
