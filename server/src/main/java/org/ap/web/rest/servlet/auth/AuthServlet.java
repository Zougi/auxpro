package org.ap.web.rest.servlet.auth;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.UserBean;
import org.ap.web.entity.mongo.UserCredentialsBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.user.IUsersStore;
import org.ap.web.service.stores.user.UserStore;

@Path("/auth")
public class AuthServlet extends ServletBase implements IAuthServlet {

	/* STATIC */

	public static final String PATH = "/auth";  

	/* ATTRIBUTES */

	private IUsersStore _store;

	/* CONSTRUCTOR */

	public AuthServlet() throws APException {
		_store = new UserStore();
	}
	
	/* METHODS */

	// IAuthServlet Implementation //

	@Override
	public Response getAuth(SecurityContext sc) {
		try {
			UserBean userB = _store.getByUserId(sc.getUserPrincipal().getName());
			return Response.status(200).entity(userB, resolveAnnotations(sc, userB.getUserId())).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response registerRequest(UserCredentialsBean user) {
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