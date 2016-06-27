package org.ap.web.rest.servlet.services;

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
 * This interface describes the services customer interventions servlet features.
 * The following actions are available:
 *  - /services/{servId}/customers/{custId}/interventions           GET    > list interventions for the customer
 *  - /services/{servId}/customers/{custId}/interventions           POST   > create a new intervention for this customer
 *  - /services/{servId}/customers/{custId}/interventions/{interId} PUT    > update an existing intervention
 *  - /services/{servId}/customers/{custId}/interventions/{interId} DELETE > delete an intervention
 */
public interface IServiceCustomerInterventionsServlet {

	@GET
	@RolesAllowed("authenticated")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getInterventionsJSON(
			@Context SecurityContext sc, 
			@PathParam("servId") String sId, 
			@PathParam("custId") String cId);
	
	@POST
	@RolesAllowed("authenticated")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createInterventionJSON(
			@Context SecurityContext sc, 
			@PathParam("servId") String sId, 
			@PathParam("custId") String cId, 
			InterventionBean intervention);
	
	@PUT
	@RolesAllowed("authenticated")
	@Path("{interId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateInterventionJSON(
			@Context SecurityContext sc, 
			@PathParam("servId") String sId, 
			@PathParam("custId") String cId, 
			@PathParam("interId") String iId,
			InterventionBean customer);
	
	@DELETE
	@RolesAllowed("authenticated")
	@Path("{interId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response deleteInterventionJSON(
			@Context SecurityContext sc, 
			@PathParam("servId") String sId, 
			@PathParam("custId") String cId,
			@PathParam("interId") String iId);
}
