package org.ap.web.service;

import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.entity.mongo.AccountBean;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.MissionBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.entity.mongo.TokenBean;

public enum EMongoCollection {

	ABSENCES          (AbsenceBean.class),
	AUXILIARIES       (AuxiliaryBean.class),
	CUSTOMERS         (CustomerBean.class),
	MISSIONS_OFFERS   (MissionBean.class),
	MISSIONS_AFFECTED (MissionBean.class),
	SERVICES          (ServiceBean.class),
	TOKENS            (TokenBean.class),
	ACCOUNTS          (AccountBean.class),
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
