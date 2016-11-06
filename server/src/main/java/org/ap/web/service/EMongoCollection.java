package org.ap.web.service;

import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.entity.auxiliary.AuxiliaryBean;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.entity.mongo.TokenBean;
import org.ap.web.entity.mongo.UserBean;

public enum EMongoCollection {

	AUXILIARIES       (AuxiliaryBean.class),
	CUSTOMERS         (CustomerBean.class),
	INDISPONIBILITIES (IndisponibilityBean.class),
	INTERVENTIONS     (InterventionBean.class),
	OFFERS            (OfferBean.class),
	SERVICES          (ServiceBean.class),
	TOKENS            (TokenBean.class),
	USERS             (UserBean.class),
	;
	
	private String _name;
	private Class<?> _clazz;
	private MongoService _service;
	
	private EMongoCollection(Class<?> clazz) {
		_name = name().toLowerCase().replace("_", ".");
		_clazz = clazz;
		_service = new MongoService(this);
	}
	
	public String getName() {
		return _name;
	}
	public Class<?> getClazz() {
		return _clazz;
	}
	public MongoService getService() {
		return _service;
	}
}
