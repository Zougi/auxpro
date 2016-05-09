package org.ap.web.rest.servlet.users;

import java.util.HashMap;

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

@Path("/users")
public class UsersServlet extends ServletBase implements IUsersServlet {

	/* STATIC */

	public static final String PATH = "/users";  

	/* ATTRIBUTES */

	private IUsersService _service;

	/* CONSTRUCTOR */

	public UsersServlet() throws APException {
		_service = new UsersMongoService();
	}
	public UsersServlet(IUsersService service) throws APException {
		_service = service;
	}

	/* METHODS */

	// IUserServlet Implementation //

	@Override
	public Response getUsersJSON(SecurityContext sc) {
		try {
			UserBean[] users = BeanConverter.convertToUsers(_service.getUsers(new HashMap<String, Object>()));
			return Response.status(200).entity(users, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createUserJSON(SecurityContext sc, UserBean bean) {
		try {
			Document user = BeanConverter.convertToDocument(bean);
			user = _service.createUser(user);
			bean = BeanConverter.convertToUser(user);
			return Response.status(201).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getUserJSON(SecurityContext sc, String name) {
		try {
			Document user = _service.getUserByName(name);
			if (user == null) throw APException.USER_NOT_FOUND;
			UserBean bean = BeanConverter.convertToUser(user);
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateUserJSON(SecurityContext sc, String id, UserBean bean) {
		return sendException(APException.NOT_IMPLEMENTED);
	}
	@Override
	public Response deleteUserJSON(SecurityContext sc, String id) {
		return sendException(APException.NOT_IMPLEMENTED);
	}
}