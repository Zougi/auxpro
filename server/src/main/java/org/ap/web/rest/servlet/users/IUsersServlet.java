package org.ap.web.rest.servlet.users;

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

import org.ap.web.rest.entity.user.UserBean;

/**
 * This interface describes the user servlet features.
 * The following actions are available:
 *  - /users          GET    > list system users
 *  - /users/{userId} GET    > retrieve a user details
 *  - /users/{userId} POST   > create a new user
 *  - /users/{userId} PUT    > update an existing user
 *  - /users/{userId} DELETE > delete a user
 */
public interface IUsersServlet {

	@GET
	@RolesAllowed("admin")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getUsersJSON(@Context SecurityContext sc);
	
	@POST
	@RolesAllowed("admin")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createUserJSON(@Context SecurityContext sc, UserBean user);
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{userId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getUserJSON(@Context SecurityContext sc, @PathParam("userId") final String id);

	@PUT
	@RolesAllowed("authenticated")
	@Path("{userId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateUserJSON(@Context SecurityContext sc, @PathParam("userId") final String id, UserBean user);
	
	@DELETE
	@RolesAllowed("admin")
	@Path("{userId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response deleteUserJSON(@Context SecurityContext sc, @PathParam("userId") final String id);
}
