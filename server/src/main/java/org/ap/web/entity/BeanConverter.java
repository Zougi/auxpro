package org.ap.web.entity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.ap.web.entity.error.ErrorBean;
import org.ap.web.entity.error.ErrorDetailsBean;
import org.ap.web.internal.APException;
import org.ap.web.internal.Mappers;
import org.bson.Document;
import org.bson.types.ObjectId;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.Block;
import com.mongodb.client.FindIterable;

public class BeanConverter {

	// ERROR
	public static ErrorBean convert(APException ape) {
		ErrorBean exBean = new ErrorBean();
		ErrorDetailsBean bean = new ErrorDetailsBean();
		bean.setCode(ape.getCode());
		bean.setMessage(ape.getMessage());
		exBean.setError(bean);
		return exBean;
	}

	// BEANS
	public static String beanToString(Object o) throws APException {
		try { 
			return Mappers.CLIENT.getMapper().writeValueAsString(o);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			throw APException.JSON_PROCESSING_EX;
		}
	}
	public static <T> T localStringToBean(String json, Class<T> clazz) throws APException {
		return stringToBean(json, clazz, Mappers.DEFAULT.getMapper());
	}
	public static <T> T stringToBean(String json, Class<T> clazz) throws APException {
		return stringToBean(json, clazz, Mappers.DEFAULT.getMapper());
	}
	public static <T> T mongoStringToBean(String json, Class<T> clazz) throws APException {
		return stringToBean(json, clazz, Mappers.DEFAULT.getMapper());
	}
	public static <T> T stringToBean(String json, Class<T> clazz, ObjectMapper mapper) throws APException {
		try { 
			return mapper.readValue(json, clazz);
		} catch (JsonParseException e) {
			e.printStackTrace();
			throw APException.JSON_PARSE_EX;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			throw APException.JSON_PROCESSING_EX;
		} catch (IOException e) {
			e.printStackTrace();
			throw APException.JSON_IO_EX;
		}
	}
	public static Document convertToMongo(MongoEntity o) throws APException {
		Document result = convertToMongoDocument(o);
		result.remove("id");
		if (o.getId() != null) {
			result.append("_id", new ObjectId(o.getId()));
		}
		return result;
	}
	public static Document convertToMongo(Object o) throws APException {
		return convertToMongoDocument(o);
	}
	
	public static Document convertToMongoDocument(Object o) throws APException {
		String json = beanToString(o);
		return Document.parse(json);
	}
	public static <T> T convertToBean(Document document, Class<T> clazz) throws APException {
		String json = document.toJson();
		T o = mongoStringToBean(json, clazz);
		if (MongoEntity.class.isAssignableFrom(clazz)) {
			String id = document.get("_id", ObjectId.class).toString();
			((MongoEntity)o).setId(id);;
		}
		return o;			
	}
	public static <T> List<T> convertToBean(FindIterable<Document> iterable, final Class<T> c) {
		final List<T> result = new ArrayList<T>();
		iterable.forEach(new Block<Document>() {
			@Override
			public void apply(final Document document) {
				try {
					result.add(BeanConverter.convertToBean(document, c));
				} catch (Exception e) {
					e.printStackTrace();					
				}
			}
		});
		return result;
	}

}