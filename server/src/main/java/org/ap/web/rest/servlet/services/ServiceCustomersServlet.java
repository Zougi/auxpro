package org.ap.web.rest.servlet.services;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.constant.EUserRole;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.customers.CustomersStore;
import org.ap.web.service.stores.customers.ICustomersStore;

@Path("/services/{servId}/customers")
public class ServiceCustomersServlet extends ServletBase implements IServiceCustomersServlet {

	/* STATIC */

	public static final String PATH = "/services";

	/* ATTRIBUTES */

	private ICustomersStore _customersStore;

	/* CONSTRUCTOR */

	public ServiceCustomersServlet() throws APException {
		_customersStore = new CustomersStore();
	}

	/* METHODS */

	@Override
	public Response getCustomersJSON(SecurityContext sc, String id) {
		try {
			if (!sc.getUserPrincipal().getName().equals(id) || sc.isUserInRole(EUserRole.ADMIN.getId())) return Response.status(403).build();
			CustomerBean[] customers = _customersStore.getByService(id);
			return Response.status(200).entity(customers, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createCustomerJSON(SecurityContext sc, String id, CustomerBean bean) {
		try {
			if (!sc.getUserPrincipal().getName().equals(id) || sc.isUserInRole(EUserRole.ADMIN.getId())) return Response.status(403).build();
			bean.setServiceId(id);
			CustomerBean customer = _customersStore.createCustomer(bean);
			return Response.status(201).entity(customer, resolveAnnotations(sc, id)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getCustomerJSON(SecurityContext sc, String sId, String cId) {
		try {
			if (!sc.getUserPrincipal().getName().equals(sId) && !sc.isUserInRole(EUserRole.ADMIN.getId())) return Response.status(403).build();
			CustomerBean bean = _customersStore.getCustomer(cId);
			if (bean == null) return Response.status(Status.NOT_FOUND).build();
			if (!bean.getServiceId().equals(sId) && !sc.isUserInRole(EUserRole.ADMIN.getId())) return Response.status(403).build();
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateCustomerJSON(SecurityContext sc, String sId, String cId, CustomerBean customer) {
		try {
			if (!sc.getUserPrincipal().getName().equals(sId) || sc.isUserInRole(EUserRole.ADMIN.getId())) return Response.status(403).build();
			if (!customer.getId().equals(cId)) return Response.status(403).build();
			CustomerBean bean = _customersStore.getCustomer(cId);
			if (bean == null) return Response.status(Status.NOT_FOUND).build();
			if (!bean.getServiceId().equals(sId) && !sc.isUserInRole(EUserRole.ADMIN.getId())) return Response.status(403).build();
			customer = _customersStore.updateCustomer(customer);
			return Response.status(200).entity(customer, resolveAnnotations(sc, sId)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteCustomerJSON(SecurityContext sc, String sId, String cId) {
		try {
			if (!sc.getUserPrincipal().getName().equals(sId) || sc.isUserInRole(EUserRole.ADMIN.getId())) return Response.status(403).build();
			CustomerBean bean = _customersStore.getCustomer(cId);
			if (bean == null) return Response.status(Status.NOT_FOUND).build();
			if (!bean.getServiceId().equals(sId) && !sc.isUserInRole(EUserRole.ADMIN.getId())) return Response.status(403).build();
			_customersStore.deleteCustomer(cId);
			return Response.status(200).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}
