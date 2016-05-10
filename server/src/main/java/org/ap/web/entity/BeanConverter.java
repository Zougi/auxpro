package org.ap.web.entity;

import java.io.IOException;
import java.util.List;

import org.ap.web.entity.error.ErrorBean;
import org.ap.web.entity.error.ErrorDetailsBean;
import org.ap.web.entity.user.AuxiliaryBean;
import org.ap.web.entity.user.CredentialsBean;
import org.ap.web.entity.user.ServiceBean;
import org.ap.web.entity.user.UserBean;
import org.ap.web.internal.APException;
import org.ap.web.internal.Mappers;
import org.bson.Document;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

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

	// CREDENTIALS
	public static Document convertToDocument(CredentialsBean credentials) throws APException {
		return convertToMongo(credentials);
	}
	public static CredentialsBean convertToCredentials(Document document) throws APException {
		return (CredentialsBean)convertToBean(document, CredentialsBean.class);
	}

	// USER
	public static Document convertToDocument(UserBean user) throws APException {
		return convertToMongo(user);
	}
	public static UserBean convertToUser(Document document) throws APException {
		return (UserBean)convertToBean(document, UserBean.class);
	}
	public static UserBean[] convertToUsers(List<Document> users) throws APException {
		UserBean[] beans = new UserBean[users.size()];
		for (int i = 0 ; i < beans.length ; i++) {
			beans[i] = convertToUser(users.get(i));
		}
		return beans;
	}

	// AUXILIARY
	public static Document convertToDocument(AuxiliaryBean auxiliary) throws APException {
		return convertToMongo(auxiliary);
	}
	public static AuxiliaryBean convertToAuxiliary(Document document) throws APException {
		return (AuxiliaryBean)convertToBean(document, AuxiliaryBean.class);
	}
	public static AuxiliaryBean[] convertToAuxiliaries(List<Document> auxs) throws APException {
		AuxiliaryBean[] beans = new AuxiliaryBean[auxs.size()];
		for (int i = 0 ; i < beans.length ; i++) {
			beans[i] = convertToAuxiliary(auxs.get(i));
		}
		return beans;
	}

	// SERVICE
	public static Document convertToDocument(ServiceBean user) throws APException {
		return convertToMongo(user);
	}
	public static ServiceBean convertToService(Document document) throws APException {
		return (ServiceBean)convertToBean(document, ServiceBean.class);
	}
	public static ServiceBean[] convertToServices(List<Document> sads) throws APException {
		ServiceBean[] beans = new ServiceBean[sads.size()];
		for (int i = 0 ; i < beans.length ; i++) {
			beans[i] = convertToService(sads.get(i));
		}
		return beans;
	}
	
	/* HELPERS */
	
	public static Document convertToMongo(Object o) throws APException {
		try {
			String json = Mappers.DEFAULT.getMapper().writeValueAsString(o);
			return Document.parse(json);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
			throw APException.JSON_GENERATION_EX;
		} catch (JsonMappingException e) {
			e.printStackTrace();
			throw APException.JSON_MAPPING_EX;
		} catch (IOException e) {
			e.printStackTrace();
			throw APException.JSON_IO_EX;
		}
	}
	@SuppressWarnings("unchecked")
	public static Object convertToBean(Document document, @SuppressWarnings("rawtypes") Class clazz) throws APException {
		try {
			String json = document.toJson();
			return Mappers.MONGO.getMapper().readValue(json, clazz);
		} catch (JsonMappingException e) {
			e.printStackTrace();
			throw APException.JSON_MAPPING_EX;
		} catch (JsonParseException e) {
			e.printStackTrace();
			throw APException.JSON_MAPPING_EX;
		} catch (IOException e) {
			e.printStackTrace();
			throw APException.JSON_IO_EX;
		}
	}
}