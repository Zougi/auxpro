package org.ap.web.rest.servlet.indisponibilities;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.indisponibilities.IIndisponibilitiesStore;
import org.ap.web.service.stores.indisponibilities.IndisponibilitiesStore;

@Path("/indisponibilities")
public class IndisponibilitiesServlet extends ServletBase implements IIndisponibilitiesServlet {

	public static final String PATH = "/indisponibilities";
	
	private IIndisponibilitiesStore _indisponibilitiesStore;
	
	/* CONSTRUCTOR */

	public IndisponibilitiesServlet() throws APException {
		_indisponibilitiesStore = new IndisponibilitiesStore();
	}
	
	/* METHODS */

	public IndisponibilityBean checkIndisponibility(String ayuxiliaryId, String indisponibilityId) throws APException {
		return checkIndisponibility(ayuxiliaryId, _indisponibilitiesStore.getIndisponibility(indisponibilityId));
	}
	public IndisponibilityBean checkIndisponibility(String ayuxiliaryId, IndisponibilityBean indisponibility) throws APException {
		return checkIndisponibility(ayuxiliaryId, indisponibility, false);
	}
	public IndisponibilityBean checkIndisponibility(String ayuxiliaryId, IndisponibilityBean indisponibility, boolean create) throws APException {
		if (indisponibility == null) throw APException.INDISPONIBILITY_NOT_FOUND;
		if (indisponibility.getAuxiliaryId() == null) throw APException.INDISPONIBILITY_AUXILIARY_MISSING;
		if (!ayuxiliaryId.equals(indisponibility.getAuxiliaryId())) {
			if (create) throw APException.INDISPONIBILITY_AUXILIARY_INVALID;
			else throw APException.INDISPONIBILITY_NOT_FOUND;
		}
		return indisponibility;
	}
	
	@Override
	public Response createJSON(SecurityContext sc, IndisponibilityBean indisponibility) {
		try {
			checkIndisponibility(sc.getUserPrincipal().getName(), indisponibility, true);
			indisponibility = _indisponibilitiesStore.createIndisponibility(indisponibility);
			return Response.status(Status.CREATED).entity(indisponibility, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getJSON(SecurityContext sc, String indisponibilityId) {
		try {
			IndisponibilityBean customer = checkIndisponibility(sc.getUserPrincipal().getName(), indisponibilityId);
			return Response.status(Status.OK).entity(customer, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateJSON(SecurityContext sc, String indisponibilityId, IndisponibilityBean indisponibility) {
		try {
			checkIndisponibility(sc.getUserPrincipal().getName(), indisponibility);
			IndisponibilityBean previousIndisponibility = _indisponibilitiesStore.getIndisponibility(indisponibilityId);		
			if (previousIndisponibility == null) throw APException.INDISPONIBILITY_NOT_FOUND;
			if (!previousIndisponibility.getAuxiliaryId().equals(indisponibility.getAuxiliaryId())) throw APException.INDISPONIBILITY_NOT_FOUND;
			indisponibility = _indisponibilitiesStore.updateIndisponibility(indisponibility);
			return Response.status(Status.OK).entity(indisponibility, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteJSON(SecurityContext sc, String indisponibilityId) {
		try {
			checkIndisponibility(sc.getUserPrincipal().getName(), indisponibilityId);
			_indisponibilitiesStore.deleteIndisponibility(indisponibilityId);
			return Response.status(Status.OK).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}
