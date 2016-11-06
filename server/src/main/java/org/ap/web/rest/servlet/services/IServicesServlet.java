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
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.UserCredentialsBean;
import org.ap.web.entity.mongo.ServiceBean;

/**
 * This interface describes the services servlet features.
 * The following actions are available:
 * 
 *  - /services GET > list existing services
 *  
 *  - /services/{serviceId} GET    > retrieve a service details
 *  - /services/{serviceId} POST   > create a new service
 *  - /services/{serviceId} PUT    > update an existing service
 *  - /services/{serviceId} DELETE > delete a service
 *
 *  - /services/{serviceId}/customers     GET > list service customers
 *  - /services/{serviceId}/interventions GET > list service interventions
 *  - /services/{serviceId}/offers        GET > list service offers
 *  - /services/{serviceId}/auxiliaries   GET > list service auxiliaries
 */
public interface IServicesServlet {

	// SERVICES

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServicesJSON(@Context SecurityContext sc, @QueryParam("postal") int postal);

	// SERVICE

	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createServiceJSON(@Context SecurityContext sc, UserCredentialsBean credentials);

	@GET
	@RolesAllowed("authenticated")
	@Path("{serviceId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServiceJSON(@Context SecurityContext sc, @PathParam("serviceId") final String serviceId);

	@PUT
	@RolesAllowed("authenticated")
	@Path("{serviceId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateServiceJSON(@Context SecurityContext sc, @PathParam("serviceId") final String serviceId, ServiceBean service);

	@DELETE
	@RolesAllowed("admin")
	@Path("{serviceId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response deleteServiceJSON(@Context SecurityContext sc, @PathParam("serviceId") final String serviceId);

	// CUSTOMERS 

	@GET
	@RolesAllowed("authenticated")
	@Path("{serviceId}/customers")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getCustomersJSON(@Context SecurityContext sc, @PathParam("serviceId") String serviceId);

	// INTERVENTIONS

	@GET
	@RolesAllowed("authenticated")
	@Path("{serviceId}/interventions")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getInterventionsJSON(@Context SecurityContext sc, @PathParam("serviceId") String serviceId);

	// OFFERS

	@GET
	@RolesAllowed("authenticated")
	@Path("{serviceId}/offers")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getOffersJSON(@Context SecurityContext sc, @PathParam("serviceId") String serviceId);

	// AUXILIARIES

	@GET
	@RolesAllowed("authenticated")
	@Path("{serviceId}/auxiliaries")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliariesJSON(@Context SecurityContext sc, @PathParam("serviceId") String serviceId);
}
