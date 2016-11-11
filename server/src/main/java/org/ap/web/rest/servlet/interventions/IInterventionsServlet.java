package org.ap.web.rest.servlet.interventions;

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

import org.ap.web.entity.mongo.InterventionBean;

/**
 * This interface describes the interventions servlet features.
 * The following actions are available:
 * 
 *  - /interventions           POST      > create a new intervention
 *  - /interventions/{interId} GET       > get an intervention details
 *  - /interventions/{interId} PUT       > update an existing intervention
 *  - /interventions/{interId} DELETE    > delete an intervention
 *  
 *  - /interventions/{interId}/match GET > returns the best auxiliary match for an intervention
 */
public interface IInterventionsServlet {
	
	@POST
	@RolesAllowed("authenticated")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	@Path("/")
	public Response createInterventionJSON(@Context SecurityContext sc, InterventionBean intervention);

	@GET
	@RolesAllowed("authenticated")
	@Path("/{interventionId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getInterventionJSON(@Context SecurityContext sc, @PathParam("interventionId") String interventionId);
	
	@PUT
	@RolesAllowed("authenticated")
	@Path("/{interventionId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateInterventionJSON(@Context SecurityContext sc, @PathParam("interventionId") String interventionId, InterventionBean customer);

	@DELETE
	@RolesAllowed("authenticated")
	@Path("/{interventionId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response deleteInterventionJSON(@Context SecurityContext sc, @PathParam("interventionId") String interventionId);
	
	@GET
	@RolesAllowed("authenticated")
	@Path("/{interventionId}/match")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getInterventionMatchJSON(@Context SecurityContext sc, @PathParam("interventionId") String interventionId);
}
