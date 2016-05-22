package org.ap.web.rest.servlet.auxiliaries;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.CredentialsBean;
import org.ap.web.entity.mongo.MissionBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.auxiliaries.AuxiliariesStore;
import org.ap.web.service.stores.auxiliaries.IAuxiliariesStore;
import org.ap.web.service.stores.missions.IMissionsStore;
import org.ap.web.service.stores.missions.MissionsStore;

@Path("/auxiliaries")
public class AuxiliariesServlet extends ServletBase implements IAuxiliariesServlet {

	/* STATIC */

	public static final String PATH = "/auxiliaries";  

	/* ATTRIBUTES */

	private IAuxiliariesStore _auxStore;
	private IMissionsStore _misStore;

	/* CONSTRUCTOR */

	public AuxiliariesServlet() throws APException {
		_auxStore = new AuxiliariesStore();
		_misStore = new MissionsStore();
	}
	public AuxiliariesServlet(IAuxiliariesStore auxStore, IMissionsStore misStore) throws APException {
		_auxStore = auxStore;
		_misStore = misStore;
	}

	/* METHODS */

	// IUserServlet Implementation //

	@Override
	public Response getAuxiliariesJSON(SecurityContext sc) {
		try {
			AuxiliaryBean[] users = _auxStore.get();
			return Response.status(200).entity(users, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createAuxiliaryJSON(SecurityContext sc, CredentialsBean bean) {
		try {
			AuxiliaryBean auxiliary = _auxStore.create(bean);
			return Response.status(201).entity(auxiliary, resolveAnnotations(sc, auxiliary)).build();
		} catch (APException e) {
			return sendException(e);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).build();
		}
	}
	@Override
	public Response getAuxiliaryJSON(SecurityContext sc, String id) {
		try {
			AuxiliaryBean bean = _auxStore.get(id);
			if (bean == null) return Response.status(Status.NOT_FOUND).build();
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateAuxiliaryJSON(SecurityContext sc, String id, AuxiliaryBean bean) {
		try {
			if (!sc.getUserPrincipal().getName().equals(id)) return Response.status(403).build();
			bean = _auxStore.update(bean);
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteAuxiliaryJSON(SecurityContext sc, String id) {
		try {
			_auxStore.delete(id);
			return Response.status(200).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response postAuxiliaryIDCard(SecurityContext sc, String id) {
		try {
			throw APException.NOT_IMPLEMENTED;
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getAuxiliaryMissionsJSON(SecurityContext sc, String id) {
		try {
			if (_auxStore.get(id) == null) return Response.status(Status.NOT_FOUND).build();
			if (!sc.isUserInRole("admin") && !sc.getUserPrincipal().getName().equals(id)) return Response.status(Status.FORBIDDEN).build();
			MissionBean[] missions = _misStore.getAuxMissions(id);
			return Response.status(200).entity(missions).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getAuxiliaryAbsencesJSON(SecurityContext sc, String id) {
		try {
			if (_auxStore.get(id) == null) return Response.status(Status.NOT_FOUND).build();
			if (!sc.isUserInRole("admin") && !sc.getUserPrincipal().getName().equals(id)) return Response.status(Status.FORBIDDEN).build();
			AbsenceBean[] absences = _misStore.getAuxAbsences(id);
			return Response.status(200).entity(absences).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createAuxiliaryAbsenceJSON(SecurityContext sc, String id, AbsenceBean absence) {
		try {
			String idSc = sc.getUserPrincipal().getName();
			if (!idSc.equals(id)) return Response.status(Status.FORBIDDEN).build();
			absence.setAuxiliaryId(id);
			absence.setId(null);
			absence = _misStore.createAuxAbsences(absence);
			return Response.status(201).entity(absence, resolveAnnotations(sc, absence)).build();
		} catch (APException e) {
			return sendException(e);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).build();
		}
	}
}