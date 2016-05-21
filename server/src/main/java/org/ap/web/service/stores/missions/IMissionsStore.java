package org.ap.web.service.stores.missions;

import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.entity.mongo.MissionBean;
import org.ap.web.internal.APException;

public interface IMissionsStore {

	public MissionBean[] getOffers() throws APException;
	
	public AbsenceBean[] getAuxAbsences(String id) throws APException;
	
	public MissionBean[] getAuxMissions(String id) throws APException;
	
	public MissionBean[] getSadMissions(String id) throws APException;
}
