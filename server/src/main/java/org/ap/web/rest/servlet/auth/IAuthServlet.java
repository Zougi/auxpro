package org.ap.web.rest.servlet.auth;

import javax.annotation.security.PermitAll;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.rest.entity.user.UserBean;

/**
 * This interface describes the auth servlet features.
 * 
 *  - /auth GET > checks the connection authentication header and return user's info
 *  
 *  - /auth/register         POST > create a request for user creation
 *  - /auth/register/{token} GET  > validates a user creation request
 *  
 *  - /auth/recover         POST > create a request for password reset
 *  - /auth/recover/{token} GET  > validates a password reset request 
 */
@PermitAll
public interface IAuthServlet {
	
	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuth(@Context SecurityContext sc);
	
	@POST
	@Path("register")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response registerRequest(UserBean user);
	
	@GET
	@Path("register/{token}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response registerValidate(@PathParam("token") final String token);
	
	@POST
	@Path("recover")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response recoverRequest(UserBean user);
	
	@POST
	@Path("recover/{token}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response recoverValidate(@PathParam("token") final String token);
}
