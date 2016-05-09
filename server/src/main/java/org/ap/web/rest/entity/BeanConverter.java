package org.ap.web.rest.entity;

import java.util.List;

import org.ap.web.internal.APException;
import org.ap.web.rest.entity.constant.EAuxCivility;
import org.ap.web.rest.entity.constant.EUserType;
import org.ap.web.rest.entity.error.ErrorBean;
import org.ap.web.rest.entity.error.ErrorDetailsBean;
import org.ap.web.rest.entity.user.AuxiliaryBean;
import org.ap.web.rest.entity.user.CredentialsBean;
import org.ap.web.rest.entity.user.ServiceBean;
import org.ap.web.rest.entity.user.UserBean;
import org.ap.web.service.MongoConstants;
import org.bson.Document;

public class BeanConverter {
	
	public static ErrorBean convert(APException ape) {
		ErrorBean exBean = new ErrorBean();
		ErrorDetailsBean bean = new ErrorDetailsBean();
		bean.setCode(ape.getCode());
		bean.setMessage(ape.getMessage());
		exBean.setError(bean);
		return exBean;
	}
	
	public static CredentialsBean convertToCredentials(Document credentials) {
		CredentialsBean bean = new CredentialsBean();
		fillCredentials(credentials, bean);
		return bean;
	}
	public static void fillCredentials(Document credentials, CredentialsBean bean) {
		bean.setName(credentials.getString(MongoConstants.Users.NAME));
		bean.setEmail(credentials.getString(MongoConstants.Users.EMAIL));
		//!\\ PASSWORD IS NEVER LOADED FROM DB
	}
	public static Document convertToDocument(CredentialsBean credentials){
		return new Document()
				.append(MongoConstants.Users.NAME, credentials.getName())
				.append(MongoConstants.Users.EMAIL, credentials.getEmail())
				.append(MongoConstants.Users.PASSWORD, credentials.getPassword());
	}
	
	public static UserBean[] convertToUsers(List<Document> users) {
		UserBean[] beans = new UserBean[users.size()];
		for (int i = 0 ; i < beans.length ; i++) {
			beans[i] = convertToUser(users.get(i));
		}
		return beans;
	}
	public static UserBean convertToUser(Document user) {
		UserBean bean = new UserBean();
		fillUser(user, bean);
		return bean;
	}
	public static void fillUser(Document user, UserBean bean) {
		fillCredentials(user, bean);
		bean.setActive(user.getBoolean(MongoConstants.Users.ACTIVE));
		bean.setTutoSkipped(user.getBoolean(MongoConstants.Users.TUTOSKIPPED));
		bean.setType(EUserType.byId(user.getString(MongoConstants.Users.TYPE)).getId());
		bean.setRegistrationDate(user.getDate(MongoConstants.Users.REGISTRATION));
	}
	public static Document convertToDocument(UserBean user){
		Document doc = convertToDocument((CredentialsBean)user);
		return doc
				.append(MongoConstants.Users.TUTOSKIPPED, user.getTutoSkipped())
				.append(MongoConstants.Users.ACTIVE, user.getActive())
				.append(MongoConstants.Users.TYPE, EUserType.byId(user.getType()).getId())
				.append(MongoConstants.Users.REGISTRATION, user.getRegistrationDate());
	}
	
	public static AuxiliaryBean[] convertToAuxiliaries(List<Document> auxs) {
		AuxiliaryBean[] beans = new AuxiliaryBean[auxs.size()];
		for (int i = 0 ; i < beans.length ; i++) {
			beans[i] = convertToAuxiliary(auxs.get(i));
		}
		return beans;
	}
	public static AuxiliaryBean convertToAuxiliary(Document aux) {
		AuxiliaryBean bean = new AuxiliaryBean();
		fillAuxiliary(aux, bean);
		return bean;
	}
	public static void fillAuxiliary(Document aux, AuxiliaryBean bean) {
		fillUser(aux, bean);
		bean.setCivility(aux.getString(MongoConstants.Auxiliaries.CIVILITY));
		bean.setFirstName(aux.getString(MongoConstants.Auxiliaries.FIRST_NAME));
		bean.setLastName(aux.getString(MongoConstants.Auxiliaries.LAST_NAME));
		bean.setPhone(aux.getString(MongoConstants.Auxiliaries.PHONE));
		bean.setBirthDate(aux.getDate(MongoConstants.Auxiliaries.BIRTHDATE));
		bean.setBirthPlace(aux.getString(MongoConstants.Auxiliaries.BIRTHPLACE));
		bean.setDiploma(aux.getString(MongoConstants.Auxiliaries.DIPLOMA));
		//Object o = aux.get(MongoConstants.Auxiliaries.ADDRESS);
		//System.out.println("address: " + o);
		//System.out.println(aux.toJson());
	}
	public static Document convertToDocument(AuxiliaryBean aux){
		Document doc = convertToDocument((UserBean)aux);
		return doc
				.append(MongoConstants.Auxiliaries.CIVILITY, EAuxCivility.fromString(aux.getCivility()).getId())
				.append(MongoConstants.Auxiliaries.FIRST_NAME, aux.getFirstName())
				.append(MongoConstants.Auxiliaries.LAST_NAME, aux.getLastName())
				.append(MongoConstants.Auxiliaries.BIRTHDATE, aux.getBirthDate())
				.append(MongoConstants.Auxiliaries.BIRTHPLACE, aux.getBirthPlace())
				.append(MongoConstants.Auxiliaries.DIPLOMA, aux.getDiploma())
				.append(MongoConstants.Auxiliaries.PHONE, aux.getPhone());		
	}
	
	public static ServiceBean[] convertToServices(List<Document> sads) {
		ServiceBean[] beans = new ServiceBean[sads.size()];
		for (int i = 0 ; i < beans.length ; i++) {
			beans[i] = convertToService(sads.get(i));
		}
		return beans;
	}
	public static ServiceBean convertToService(Document sad) {
		ServiceBean bean = new ServiceBean();
		fillService(sad, bean);
		return bean;
	}
	public static void fillService(Document doc, ServiceBean bean) {
		fillUser(doc, bean);
		bean.setSociety(doc.getString(MongoConstants.Services.SOCIETY));
		bean.setPhone(doc.getString(MongoConstants.Services.PHONE));
		bean.setSocialReason(doc.getString(MongoConstants.Services.SOCIALREASON));
		bean.setSiret(doc.getString(MongoConstants.Services.SIRET));
	}
	public static Document convertToDocument(ServiceBean sad){
		Document doc = convertToDocument((UserBean)sad);
		return doc
				.append(MongoConstants.Services.SOCIETY, sad.getSociety())
				.append(MongoConstants.Services.SOCIALREASON, sad.getSocialReason())
				.append(MongoConstants.Services.SIRET, sad.getSiret())
				.append(MongoConstants.Services.PHONE, sad.getPhone());		
	}
}