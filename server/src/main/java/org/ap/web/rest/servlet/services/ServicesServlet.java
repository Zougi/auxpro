package org.ap.web.rest.servlet.services;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.common.EmailValidator;
import org.ap.web.internal.APException;
import org.ap.web.rest.entity.BeanConverter;
import org.ap.web.rest.entity.constant.EUserType;
import org.ap.web.rest.entity.user.CredentialsBean;
import org.ap.web.rest.entity.user.ServiceBean;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.users.IUsersService;
import org.ap.web.service.users.UsersMongoService;
import org.bson.Document;

@Path("/services")
public class ServicesServlet extends ServletBase implements IServicesServlet {

	/* STATIC */

	public static final String PATH = "/services";

	/* ATTRIBUTES */

	private IUsersService _service;

	/* CONSTRUCTOR */

	public ServicesServlet() throws APException {
		_service = new UsersMongoService();
	}
	public ServicesServlet(IUsersService service) throws APException {
		_service = service;
	}

	/* METHODS */

	// IUserServlet Implementation //

	@Override
	public Response getServicesJSON(SecurityContext sc) {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("type", EUserType.SERVICE.getId());
			ServiceBean[] users = BeanConverter.convertToServices(_service.getUsers(map));
			return Response.status(200).entity(users, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createServiceJSON(SecurityContext sc, CredentialsBean bean) {
		try {
			if (!EmailValidator.getInstance().isValid(bean.getName())) throw APException.USER_NAME_INVALID;
			if (!EmailValidator.getInstance().isValid(bean.getEmail())) throw APException.USER_EMAIL_INVALID;
			ServiceBean service = new ServiceBean();
			service.setName(bean.getName());
			service.setEmail(bean.getEmail());
			service.setPassword(bean.getPassword());
			Document doc = BeanConverter.convertToDocument(service);
			doc = _service.createUser(doc);
			service = BeanConverter.convertToService(doc);
			return Response.status(201).entity(service, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getServiceJSON(SecurityContext sc, String name) {
		try {
			Document userSad = _service.getUserByName(name);
			if (userSad == null) throw APException.USER_NOT_FOUND;
			ServiceBean bean = BeanConverter.convertToService(userSad);
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateServiceJSON(SecurityContext sc, String id, ServiceBean bean) {
		try {
			if (_service.getUserByName(id) == null) throw APException.USER_NOT_FOUND;
			if (!sc.getUserPrincipal().getName().equals(id)) return Response.status(403).build();
			Document doc = BeanConverter.convertToDocument(bean);
			doc = _service.updateUser(doc);
			bean = BeanConverter.convertToService(doc);
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteServiceJSON(SecurityContext sc, String id) {
		return sendException(APException.NOT_IMPLEMENTED);
	}
}