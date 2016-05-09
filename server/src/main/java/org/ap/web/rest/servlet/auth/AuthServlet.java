package org.ap.web.rest.servlet.auth;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.internal.APException;
import org.ap.web.rest.entity.BeanConverter;
import org.ap.web.rest.entity.user.UserBean;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.users.IUsersService;
import org.ap.web.service.users.UsersMongoService;
import org.bson.Document;

@Path("/auth")
public class AuthServlet extends ServletBase implements IAuthServlet {

	/* STATIC */

	public static final String PATH = "/auth";  

	/* ATTRIBUTES */

	private IUsersService _service;

	/* CONSTRUCTOR */

	public AuthServlet() throws APException {
		_service = new UsersMongoService();
	}
	
	/* METHODS */

	// IAuthServlet Implementation //

	@Override
	public Response getAuth(SecurityContext sc) {
		try {
			Document userD = _service.getUserByName(sc.getUserPrincipal().getName());
			UserBean userB = BeanConverter.convertToUser(userD);
			return Response.status(200).entity(userB, resolveAnnotations(sc, userB)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response registerRequest(UserBean user) {
		return sendException(APException.NOT_IMPLEMENTED);
	}
	@Override
	public Response registerValidate(String token) {
		return sendException(APException.NOT_IMPLEMENTED);
	}
	@Override
	public Response recoverRequest(UserBean user) {
		return sendException(APException.NOT_IMPLEMENTED);
	}
	@Override
	public Response recoverValidate(String token) {
		return sendException(APException.NOT_IMPLEMENTED);
	}
}