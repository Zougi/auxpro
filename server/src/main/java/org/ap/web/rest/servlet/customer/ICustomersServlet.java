package org.ap.web.rest.servlet.customer;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 * This interface describes the customers servlet features.
 * The following actions are available:
 *  - /customers/{custId} GET    > retrieve a customer details
 */
public interface ICustomersServlet {

	@GET
	@RolesAllowed("authenticated")
	@Path("{custId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServiceJSON(@Context SecurityContext sc, @PathParam("custId") final String id);
}
