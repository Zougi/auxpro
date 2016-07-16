package org.ap.web.service.stores.indisponibilities;

import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.internal.APException;

public interface IIndisponibilitiesStore {
	
	public IndisponibilityBean[] getAuxIndisponibilities(String auxId) throws APException;
	
	public IndisponibilityBean getIndisponibility(String absId) throws APException;

	public IndisponibilityBean createIndisponibility(IndisponibilityBean bean) throws APException;
	
	public IndisponibilityBean updateIndisponibility(IndisponibilityBean bean) throws APException;
	
	public IndisponibilityBean deleteIndisponibility(String absId) throws APException;
}
