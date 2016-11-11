package org.ap.web.service.stores.missions;

import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.MissionBean;
import org.ap.web.internal.APException;

public interface IMissionsStore {
	
	public MissionBean[] getCustomerMissions(String serviceId, String customerId) throws APException;
	
	public MissionBean[] getServiceMissions(String serviceId) throws APException;
	
	public MissionBean[] getAuxiliaryMissions(String auxiliaryId) throws APException;
	
	public MissionBean[] getInterventionMissions(String interventionId) throws APException;

	public MissionBean[] createMissions(InterventionBean bean) throws APException;
	
	public MissionBean createMission(MissionBean bean) throws APException;
	
	public MissionBean getMission(String id) throws APException;
	
	public MissionBean updateMission(MissionBean bean) throws APException;
	
	public MissionBean deleteMission(String id) throws APException;	
}
