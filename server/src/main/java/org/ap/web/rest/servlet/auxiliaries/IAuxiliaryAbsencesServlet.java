package org.ap.web.rest.servlet.auxiliaries;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.AbsenceBean;

/**
 * This interface describes the auxiliary absences servlet features.
 * The following actions are available:
 * 
 *  - /auxiliaries/{auxId}/absences         GET    > retrieve all absences of an auxiliary
 *  - /auxiliaries/{auxId}/absences         POST   > create a new absence
 *  - /auxiliaries/{auxId}/absences/{absId} DELETE > deletes an existing absence
 */
public interface IAuxiliaryAbsencesServlet {
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{auxId}/absences")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAbsencesJSON(@Context SecurityContext sc, @PathParam("auxId") final String id);

	@POST
	@RolesAllowed("authenticated")
	@Path("{auxId}/absences")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createAbsenceJSON(@Context SecurityContext sc, @PathParam("auxId") final String id, AbsenceBean absence);
	
	@DELETE
	@RolesAllowed("authenticated")
	@Path("{auxId}/absences/{absId}")
	public Response deleteAbsenceJSON(@Context SecurityContext sc, @PathParam("auxId") final String auxId, @PathParam("absId") final String absId);
}
