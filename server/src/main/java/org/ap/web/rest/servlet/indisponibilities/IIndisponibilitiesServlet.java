package org.ap.web.rest.servlet.indisponibilities;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.IndisponibilityBean;

/**
 * This interface describes the indisponibilities servlet features.
 * The following actions are available:
 * 
 *  - /indisponibilities                     POST   > creates a new indisponibility
 *  - /indisponibilities/{indisponibilityId} GET    > get an indisponibility
 *  - /indisponibilities/{indisponibilityId} PUT    > updates an indisponibility
 *  - /indisponibilities/{indisponibilityId} DELETE > deletes an indisponibility
 */
public interface IIndisponibilitiesServlet {
	
	@POST
	@RolesAllowed("authenticated")
	@Path("")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createJSON(@Context SecurityContext sc, IndisponibilityBean absence);

	@GET
	@RolesAllowed("authenticated")
	@Path("{indisponibilityId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getJSON(@Context SecurityContext sc, @PathParam("indisponibilityId") final String indisponibilityId);
	
	@PUT
	@RolesAllowed("authenticated")
	@Path("{indisponibilityId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateJSON(@Context SecurityContext sc, @PathParam("indisponibilityId") final String indisponibilityId, IndisponibilityBean absence);
	
	@DELETE
	@RolesAllowed("authenticated")
	@Path("{indisponibilityId}")
	public Response deleteJSON(@Context SecurityContext sc, @PathParam("indisponibilityId") final String indisponibilityId);
}
