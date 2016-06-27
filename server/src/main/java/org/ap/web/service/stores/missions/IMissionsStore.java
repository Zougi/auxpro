package org.ap.web.service.stores.missions;

import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;

public interface IMissionsStore {

	public InterventionBean[] getOffers() throws APException;
	
	public AbsenceBean createAuxAbsences(AbsenceBean bean) throws APException;
	
	public AbsenceBean[] getAuxAbsences(String id) throws APException;
	
	public InterventionBean[] getAuxMissions(String id) throws APException;
	
	public InterventionBean[] getSadMissions(String id) throws APException;
}
