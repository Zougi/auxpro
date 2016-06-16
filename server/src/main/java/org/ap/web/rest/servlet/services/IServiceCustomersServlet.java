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

import org.ap.web.entity.mongo.CustomerBean;

/**
 * This interface describes the services customers servlet features.
 * The following actions are available:
 *  - /services/{servId}/customers          GET    > list customers for the service
 *  - /services/{servId}/customers/{custId} GET    > retrieve a customer details
 *  - /services/{servId}/customers/{custId} POST   > create a new customer for this service
 *  - /services/{servId}/customers/{custId} PUT    > update an existing customer
 *  - /services/{servId}/customers/{custId} DELETE > delete a customer
 */
public interface IServiceCustomersServlet {

	@GET
	@RolesAllowed("authenticated")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getCustomersJSON(@Context SecurityContext sc, @PathParam("servId") String id);
	
	@POST
	@RolesAllowed("authenticated")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createCustomerJSON(@Context SecurityContext sc, @PathParam("servId") String id, CustomerBean customer);
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{custId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getCustomerJSON(@Context SecurityContext sc, @PathParam("servId") String sId, @PathParam("custId") String cId);
	
	@PUT
	@RolesAllowed("authenticated")
	@Path("{custId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateCustomerJSON(@Context SecurityContext sc, @PathParam("servId") String sId, @PathParam("custId") String cId, CustomerBean customer);
	
	@DELETE
	@RolesAllowed("authenticated")
	@Path("{custId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response deleteCustomerJSON(@Context SecurityContext sc, @PathParam("servId") String sId, @PathParam("custId") String cId);
}
