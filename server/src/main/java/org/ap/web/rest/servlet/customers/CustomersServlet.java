package org.ap.web.rest.servlet.customers;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.customers.CustomersStore;
import org.ap.web.service.stores.customers.ICustomersStore;
import org.ap.web.service.stores.interventions.IInterventionsStore;
import org.ap.web.service.stores.interventions.InterventionsStore;

@Path("/customers")
public class CustomersServlet extends ServletBase implements ICustomersServlet {

	/* STATIC */

	public static final String PATH = "/customers";

	/* ATTRIBUTES */

	private ICustomersStore _customersStore;
	private IInterventionsStore _interventionsStore;

	/* CONSTRUCTOR */

	public CustomersServlet() throws APException {
		_customersStore = new CustomersStore();
		_interventionsStore = new InterventionsStore();
	}

	/* METHODS */
	
	public CustomerBean checkCustomer(String serviceId, String customerId) throws APException {
		return checkCustomer(serviceId, _customersStore.getCustomer(customerId));
	}
	public CustomerBean checkCustomer(String serviceId, CustomerBean customer) throws APException {
		return checkCustomer(serviceId, customer, false);
	}
	public CustomerBean checkCustomer(String serviceId, CustomerBean customer, boolean create) throws APException {
		if (customer == null) throw APException.CUSTOMER_NOT_FOUND;
		if (customer.getServiceId() == null) throw APException.CUSTOMER_SERVICE_MISSING;
		if (!serviceId.equals(customer.getServiceId())) {
			if (create) throw APException.CUSTOMER_SERVICE_INVALID;
			else throw APException.CUSTOMER_NOT_FOUND;
		}
		return customer;
	}
	
	@Override
	public Response createCustomerJSON(SecurityContext sc, CustomerBean customer) {
		try {
			checkCustomer(sc.getUserPrincipal().getName(), customer, true);
			customer = _customersStore.createCustomer(customer);
			return Response.status(Status.CREATED).entity(customer, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getCustomerJSON(SecurityContext sc, String customerId) {
		try {
			CustomerBean customer = checkCustomer(sc.getUserPrincipal().getName(), customerId);
			return Response.status(Status.OK).entity(customer, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateCustomerJSON(SecurityContext sc, String customerId, CustomerBean customer) {
		try {
			checkCustomer(sc.getUserPrincipal().getName(), customer);
			CustomerBean previousCustomer = _customersStore.getCustomer(customerId);		
			if (previousCustomer == null) throw APException.CUSTOMER_NOT_FOUND;
			if (!previousCustomer.getServiceId().equals(customer.getServiceId())) throw APException.CUSTOMER_NOT_FOUND;
			customer = _customersStore.updateCustomer(customer);
			return Response.status(Status.OK).entity(customer, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteCustomerJSON(SecurityContext sc, String customerId) {
		try {
			checkCustomer(sc.getUserPrincipal().getName(), customerId);
			_customersStore.deleteCustomer(customerId);
			return Response.status(Status.OK).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getInterventionsJSON(SecurityContext sc, String customerId) {
		try {
			CustomerBean customer = checkCustomer(sc.getUserPrincipal().getName(), customerId);
			InterventionBean[] interventions = _interventionsStore.getCustomerInterventions(customer.getServiceId(), customer.getId());
			return Response.status(200).entity(interventions, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}
