package org.ap.web.rest.servlet.services;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.customers.CustomersStore;
import org.ap.web.service.stores.customers.ICustomersStore;
import org.ap.web.service.stores.interventions.IInterventionsStore;
import org.ap.web.service.stores.interventions.InterventionsStore;

@Path("/services/{servId}/customers/{custId}/interventions")
public class ServiceInterventionsServlet extends ServletBase implements IServiceInterventionsServlet {

	/* STATIC */

	public static final String PATH = "/services";

	/* ATTRIBUTES */

	private ICustomersStore _customerStore;
	private IInterventionsStore _interventionsStore;

	/* CONSTRUCTOR */

	public ServiceInterventionsServlet() throws APException {
		_customerStore = new CustomersStore();
		_interventionsStore = new InterventionsStore();
	}

	/* METHODS */

	@Override
	public Response getInterventionsJSON(SecurityContext sc, String sId, String cId) {
		try {
			if (!sc.getUserPrincipal().getName().equals(sId)) return Response.status(403).build();
			InterventionBean[] interventions = _interventionsStore.getCustomerInterventions(sId, cId);
			return Response.status(200).entity(interventions, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createInterventionJSON(SecurityContext sc, String sId, String cId, InterventionBean intervention) {
		try {
			if (!sc.getUserPrincipal().getName().equals(sId)) return Response.status(403).build();
			CustomerBean customer = _customerStore.getCustomer(cId);
			if (customer == null || !customer.getServiceId().equals(sId)) return Response.status(403).build();
			intervention = _interventionsStore.createIntervention(intervention);
			return Response.status(200).entity(intervention, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateInterventionJSON(SecurityContext sc, String sId, String cId, String iId, InterventionBean intervention) {
		try {
			if (!sc.getUserPrincipal().getName().equals(sId)) return Response.status(403).build();
			InterventionBean bean = _interventionsStore.getIntervention(iId);
			if (bean == null || !bean.getServiceId().equals(sId) || !bean.getCustomerId().equals(cId)) return Response.status(403).build();
			intervention = _interventionsStore.updateIntervention(intervention);
			return Response.status(200).entity(intervention, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteInterventionJSON(SecurityContext sc, String sId, String cId, String iId) {
		try {
			if (!sc.getUserPrincipal().getName().equals(sId)) return Response.status(403).build();
			InterventionBean bean = _interventionsStore.getIntervention(iId);
			if (bean == null || !bean.getServiceId().equals(sId) || !bean.getCustomerId().equals(cId)) return Response.status(403).build();
			_interventionsStore.deleteIntervention(iId);
			return Response.status(200).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}
