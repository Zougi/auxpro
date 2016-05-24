package org.ap.web.rest.servlet.customer;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.customers.CustomersStore;
import org.ap.web.service.stores.customers.ICustomersStore;

@Path("/customers")
public class CustomersServlet extends ServletBase implements ICustomersServlet {

	/* STATIC */

	public static final String PATH = "/customers";

	/* ATTRIBUTES */

	private ICustomersStore _custStore;

	/* CONSTRUCTOR */

	public CustomersServlet() throws APException {
		_custStore = new CustomersStore();
	}
	public CustomersServlet(ICustomersStore custStore) throws APException {
		_custStore = custStore;
	}

	/* METHODS */

	@Override
	public Response getServiceJSON(SecurityContext sc, String id) {
		try {
			CustomerBean bean = _custStore.get(id);
			if (bean == null) return Response.status(Status.NOT_FOUND).build();
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}