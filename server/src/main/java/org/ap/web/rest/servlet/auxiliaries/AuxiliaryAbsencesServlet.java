package org.ap.web.rest.servlet.auxiliaries;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.absences.AbsencesStore;
import org.ap.web.service.stores.absences.IAbsencesStore;
import org.ap.web.service.stores.auxiliaries.AuxiliariesStore;
import org.ap.web.service.stores.auxiliaries.IAuxiliariesStore;

@Path("/auxiliaries")
public class AuxiliaryAbsencesServlet extends ServletBase implements IAuxiliaryAbsencesServlet {

	private IAuxiliariesStore _auxiliaryStore;
	private IAbsencesStore _absencesStore;
	
	/* CONSTRUCTOR */

	public AuxiliaryAbsencesServlet() throws APException {
		_absencesStore = new AbsencesStore();
		_auxiliaryStore = new AuxiliariesStore();
	}
	
	/* METHODS */

	@Override
	public Response getAbsencesJSON(SecurityContext sc, String id) {
		try {
			if (_auxiliaryStore.get(id) == null) return Response.status(Status.NOT_FOUND).build();
			if (!sc.isUserInRole("admin") && !sc.getUserPrincipal().getName().equals(id)) return Response.status(Status.FORBIDDEN).build();
			AbsenceBean[] absences = _absencesStore.getAuxAbsences(id);
			return Response.status(200).entity(absences).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createAbsenceJSON(SecurityContext sc, String id, AbsenceBean absence) {
		try {
			String idSc = sc.getUserPrincipal().getName();
			if (!idSc.equals(id)) return Response.status(Status.FORBIDDEN).build();
			absence.setAuxiliaryId(id);
			absence.setId(null);
			absence = _absencesStore.createAbsence(absence);
			return Response.status(Status.CREATED.getStatusCode()).entity(absence, resolveAnnotations(sc, absence)).build();
		} catch (APException e) {
			return sendException(e);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).build();
		}
	}
	@Override
	public Response deleteAbsenceJSON(SecurityContext sc, String auxId, String absId) {
		try {
			if (!sc.isUserInRole("admin") && !sc.getUserPrincipal().getName().equals(auxId)) return Response.status(Status.FORBIDDEN).build();
			AbsenceBean absence = _absencesStore.getAbsence(absId);
			if (absence == null) return Response.status(Status.NOT_FOUND).build();
			if (absence.getAuxiliaryId().equals(auxId)) return Response.status(Status.FORBIDDEN).build();
			absence = _absencesStore.deleteAbsence(absId);
			return Response.status(Status.ACCEPTED.getStatusCode()).entity(absence, resolveAnnotations(sc, absence)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}

}
