package org.ap.web.rest.servlet.services;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.CredentialsBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.services.IServicesStore;
import org.ap.web.service.stores.services.ServicesStore;

@Path("/services")
public class ServicesServlet extends ServletBase implements IServicesServlet {

	/* STATIC */

	public static final String PATH = "/services";

	/* ATTRIBUTES */

	private IServicesStore _sadStore;

	/* CONSTRUCTOR */

	public ServicesServlet() throws APException {
		_sadStore = new ServicesStore();
	}
	public ServicesServlet(IServicesStore sadStore) throws APException {
		_sadStore = sadStore;
	}

	/* METHODS */

	// IUserServlet Implementation //

	@Override
	public Response getServicesJSON(SecurityContext sc, int postal) {
		try {
			ServiceBean[] users;
			if (postal != 0) {
				users = _sadStore.get(postal);
			} else {
				users = _sadStore.get();
			}
			return Response.status(200).entity(users, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createServiceJSON(SecurityContext sc, CredentialsBean bean) {
		try {
			ServiceBean service = _sadStore.create(bean);
			return Response.status(201).entity(service, resolveAnnotations(sc, service)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getServiceJSON(SecurityContext sc, String id) {
		try {
			ServiceBean bean = _sadStore.get(id);
			if (bean == null) return Response.status(Status.NOT_FOUND).build();
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateServiceJSON(SecurityContext sc, String id, ServiceBean bean) {
		try {
			if (!sc.getUserPrincipal().getName().equals(id)) return Response.status(403).build();
			bean = _sadStore.update(bean);
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteServiceJSON(SecurityContext sc, String id) {
		try {
			_sadStore.delete(id);
			return Response.status(200).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}