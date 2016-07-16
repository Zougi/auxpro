package org.ap.web.rest.servlet.customers;

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
 * This interface describes the customers servlet features.
 * The following actions are available:
 *
 *  - /customers/{customerId} POST   > create a new customer
 *  - /customers/{customerId} GET    > retrieve a customer details
 *  - /customers/{customerId} PUT    > update an existing customer
 *  - /customers/{customerId} DELETE > delete a customer
 *  
 *  - /customers/{customerId}/interventions GET > list customer interventions
 */
public interface ICustomersServlet {
	
	@POST
	@RolesAllowed("authenticated")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createCustomerJSON(@Context SecurityContext sc, CustomerBean customer);
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{customerId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getCustomerJSON(@Context SecurityContext sc, @PathParam("customerId") String cId);
	
	@PUT
	@RolesAllowed("authenticated")
	@Path("{customerId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateCustomerJSON(@Context SecurityContext sc, @PathParam("customerId") String cId, CustomerBean customer);
	
	@DELETE
	@RolesAllowed("authenticated")
	@Path("{customerId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response deleteCustomerJSON(@Context SecurityContext sc, @PathParam("customerId") String cId);
	
	@GET
	@RolesAllowed("authenticated")
	@Produces({MediaType.APPLICATION_JSON})
	@Path("{customerId}/interventions")
	public Response getInterventionsJSON(@Context SecurityContext sc, @PathParam("customerId") String cId);
}
