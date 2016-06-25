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

	private IServicesStore _serviceStore;

	/* CONSTRUCTOR */

	public ServicesServlet() throws APException {
		_serviceStore = new ServicesStore();
	}

	/* METHODS */

	@Override
	public Response getServicesJSON(SecurityContext sc, int postal) {
		try {
			ServiceBean[] services;
			if (postal != 0) {
				services = _serviceStore.get(postal);
			} else {
				services = _serviceStore.get();
			}
			return Response.status(200).entity(services, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createServiceJSON(SecurityContext sc, CredentialsBean bean) {
		try {
			ServiceBean service = _serviceStore.create(bean);
			return Response.status(201).entity(service, resolveAnnotations(sc, service)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getServiceJSON(SecurityContext sc, String id) {
		try {
			ServiceBean bean = _serviceStore.get(id);
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
			bean = _serviceStore.update(bean);
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteServiceJSON(SecurityContext sc, String id) {
		try {
			_serviceStore.delete(id);
			return Response.status(200).build();
		} catch (APException e) {
			return sendException(e);
		}
	}

	@Override
	public Response getInterventionsJSON(SecurityContext sc, String id) {
		try {
			_serviceStore.delete(id);
			return Response.status(200).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}