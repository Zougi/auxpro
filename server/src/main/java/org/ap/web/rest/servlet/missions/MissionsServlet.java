package org.ap.web.rest.servlet.missions;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.MissionBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.customers.CustomersStore;
import org.ap.web.service.stores.customers.ICustomersStore;
import org.ap.web.service.stores.interventions.IInterventionsStore;
import org.ap.web.service.stores.interventions.InterventionsStore;
import org.ap.web.service.stores.missions.IMissionsStore;
import org.ap.web.service.stores.missions.MissionsStore;

@Path("/missions")
public class MissionsServlet extends ServletBase implements IMissionsServlet {

	/* STATIC */

	public static final String PATH = "/missions";

	/* ATTRIBUTES */

	private ICustomersStore _customersStore;
	private IInterventionsStore _interventionsStore;
	private IMissionsStore _missionStore;

	/* CONSTRUCTOR */

	public MissionsServlet() throws APException {
		_customersStore = new CustomersStore();
		_interventionsStore = new InterventionsStore();
		_missionStore = new MissionsStore();
	}
	
	public void checkMission(String id, MissionBean offer) throws APException {
		try {
			checkServiceMission(id, offer);
		} catch (APException e) {
			checkAuxiliaryMission(id, offer);
		}
	}

	public void checkServiceMission(String serviceId, MissionBean mission) throws APException {
		if (mission.getServiceId() == null) throw APException.INVALID_REQUEST_DATA;
		if (!serviceId.equals(mission.getServiceId())) throw APException.OPERATION_NOT_ALLOWED;

		if (mission.getCustomerId() == null) throw APException.INVALID_REQUEST_DATA;
		CustomerBean customer = _customersStore.getCustomer(mission.getCustomerId());
		if (customer == null) throw APException.INVALID_REQUEST_DATA;
		if (!serviceId.equals(customer.getServiceId())) throw APException.OPERATION_NOT_ALLOWED;

		if (mission.getInterventionId() == null) throw APException.INVALID_REQUEST_DATA;
		InterventionBean intervention = _interventionsStore.getIntervention(mission.getInterventionId());
		if (intervention == null) throw APException.INVALID_REQUEST_DATA;
		if (!customer.getId().equals(intervention.getCustomerId())) throw APException.INVALID_REQUEST_DATA;
		if (!serviceId.equals(intervention.getServiceId())) throw APException.OPERATION_NOT_ALLOWED;
	}
	
	public void checkAuxiliaryMission(String auxiliaryId, MissionBean mission) throws APException {
		if (mission.getAuxiliaryId() == null) throw APException.INVALID_REQUEST_DATA;
		if (!auxiliaryId.equals(mission.getAuxiliaryId())) throw APException.OPERATION_NOT_ALLOWED;
		
		if (mission.getInterventionId() == null) throw APException.INVALID_REQUEST_DATA;
		InterventionBean intervention = _interventionsStore.getIntervention(mission.getInterventionId());
		if (intervention == null) throw APException.INVALID_REQUEST_DATA;
		if (!auxiliaryId.equals(intervention.getAuxiliaryId())) throw APException.INVALID_REQUEST_DATA;
	}

	/* METHODS */

	@Override
	public Response getMissionJSON(SecurityContext sc, String missionId) {
		try {
			MissionBean mission = _missionStore.getMission(missionId);
			if (mission == null) throw APException.MISSION_NOT_FOUND;
			checkMission(sc.getUserPrincipal().getName(), mission);
			return Response.status(200).entity(mission, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateMissionJSON(SecurityContext sc, String missionId, MissionBean mission) {
		try {
			checkAuxiliaryMission(sc.getUserPrincipal().getName(), mission);
			MissionBean previousMission = _missionStore.getMission(missionId);
			if (previousMission == null) throw APException.MISSION_NOT_FOUND;
			if (!previousMission.getServiceId().equals(mission.getServiceId())) throw APException.OPERATION_NOT_ALLOWED;
			if (!previousMission.getCustomerId().equals(mission.getCustomerId())) throw APException.OPERATION_NOT_ALLOWED;
			if (!previousMission.getInterventionId().equals(mission.getInterventionId())) throw APException.OPERATION_NOT_ALLOWED;
			if (!previousMission.getAuxiliaryId().equals(mission.getAuxiliaryId())) throw APException.OPERATION_NOT_ALLOWED;
			mission.setId(previousMission.getId());
			mission = _missionStore.updateMission(mission);
			return Response.status(200).entity(mission, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteMissionJSON(SecurityContext sc, String missionId) {
		try {
			MissionBean mission = _missionStore.getMission(missionId);
			if (mission == null) throw APException.MISSION_NOT_FOUND;
			_missionStore.deleteMission(missionId);
			return Response.status(200).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}
