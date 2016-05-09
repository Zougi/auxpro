package org.ap.web.rest.servlet.missions;

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

import org.ap.web.rest.entity.user.ServiceBean;

/**
 * This interface describes the services servlet features.
 * The following actions are available:
 *  - /services          GET    > list existing services
 *  - /services/{servId} GET    > retrieve a service details
 *  - /services/{servId} POST   > create a new service
 *  - /services/{servId} PUT    > update an existing service
 *  - /services/{servId} DELETE > delete a service
 */
public interface IMissionsServlet {

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServicesJSON(@Context SecurityContext sc);
	
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createServiceJSON(@Context SecurityContext sc, ServiceBean service);
	
	@GET
	@Path("{servId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServiceJSON(@Context SecurityContext sc, @PathParam("servId") final String id);

	@PUT
	@Path("{servId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateServiceJSON(@Context SecurityContext sc, @PathParam("servId") final String id, ServiceBean service);
	
	@DELETE
	@RolesAllowed("admin")
	@Path("{servId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response deleteServiceJSON(@Context SecurityContext sc, @PathParam("servId") final String id);
}
