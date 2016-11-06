package org.ap.web.rest.servlet.services;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.UserCredentialsBean;
import org.ap.web.entity.auxiliary.AuxiliaryBean;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.auxiliaries.AuxiliariesStore;
import org.ap.web.service.stores.auxiliaries.IAuxiliariesStore;
import org.ap.web.service.stores.customers.CustomersStore;
import org.ap.web.service.stores.customers.ICustomersStore;
import org.ap.web.service.stores.interventions.IInterventionsStore;
import org.ap.web.service.stores.interventions.InterventionsStore;
import org.ap.web.service.stores.offers.IOffersStore;
import org.ap.web.service.stores.offers.OffersStore;
import org.ap.web.service.stores.services.IServicesStore;
import org.ap.web.service.stores.services.ServicesStore;
import org.ap.web.service.stores.user.IUsersStore;
import org.ap.web.service.stores.user.UserStore;

@Path("/services")
public class ServicesServlet extends ServletBase implements IServicesServlet {

	/* STATIC */

	public static final String PATH = "/services";

	/* ATTRIBUTES */

	private IUsersStore _userStore;
	private IServicesStore _servicesStore;
	private ICustomersStore _customersStore;
	private IInterventionsStore _interventionsStore;
	private IOffersStore _offersStore;
	private IAuxiliariesStore _auxiliariesStore;

	/* CONSTRUCTOR */

	public ServicesServlet() throws APException {
		_userStore = new UserStore();
		_servicesStore = new ServicesStore();
		_customersStore = new CustomersStore();
		_interventionsStore = new InterventionsStore();
		_offersStore = new OffersStore();
		_auxiliariesStore = new AuxiliariesStore();
	}

	/* METHODS */
	
	@Override
	public Response getServicesJSON(SecurityContext sc, int postal) {
		try {
			ServiceBean[] services;
			if (postal != 0) {
				services = _servicesStore.get(postal);
			} else {
				services = _servicesStore.get();
			}
			return Response.status(200).entity(services, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createServiceJSON(SecurityContext sc, UserCredentialsBean bean) {
		try {
			bean.setType("sad");
			UserBean user = _userStore.create(bean);
			_servicesStore.create(user);
			return Response.status(Status.CREATED).entity(user, resolveAnnotations(sc, user)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getServiceJSON(SecurityContext sc, String serviceId) {
		try {
			ServiceBean service = _servicesStore.get(serviceId);
			if (service == null) throw APException.SERVICE_NOT_FOUND;
			return Response.status(Status.OK).entity(service, resolveAnnotations(sc, service)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateServiceJSON(SecurityContext sc, String serviceId, ServiceBean service) {
		try {
			if (!sc.getUserPrincipal().getName().equals(serviceId)) throw APException.SERVICE_NOT_FOUND;
			if (!service.getId().equals(serviceId)) throw APException.SERVICE_INVALID;
			service = _servicesStore.update(service);
			return Response.status(Status.OK).entity(service, resolveAnnotations(sc, service)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteServiceJSON(SecurityContext sc, String serviceId) {
		try {
			_servicesStore.delete(serviceId);
			return Response.status(Status.OK).build();
		} catch (APException e) {
			return sendException(e);
		}
	}

	@Override
	public Response getCustomersJSON(SecurityContext sc, String serviceId) {
		try {
			if (!sc.getUserPrincipal().getName().equals(serviceId)) throw APException.SERVICE_NOT_FOUND;
			CustomerBean[] customers = _customersStore.getServiceCustomers(serviceId);
			return Response.status(Status.OK).entity(customers, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	
	@Override
	public Response getInterventionsJSON(SecurityContext sc, String serviceId) {
		try {
			if (!sc.getUserPrincipal().getName().equals(serviceId)) throw APException.SERVICE_NOT_FOUND;
			InterventionBean[] interventions = _interventionsStore.getServiceInterventions(serviceId);
			return Response.status(Status.OK).entity(interventions, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}

	@Override
	public Response getOffersJSON(SecurityContext sc, String serviceId) {
		try {
			if (!sc.getUserPrincipal().getName().equals(serviceId)) throw APException.SERVICE_NOT_FOUND;
			OfferBean[] offers = _offersStore.getServiceOffers(serviceId);
			return Response.status(Status.OK).entity(offers, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	
	@Override
	public Response getAuxiliariesJSON(SecurityContext sc, String serviceId) {
		try {
			if (!sc.getUserPrincipal().getName().equals(serviceId)) throw APException.SERVICE_NOT_FOUND;
			Set<String> auxiliariesIds = new HashSet<String>();
			
			InterventionBean[] interventions = _interventionsStore.getServiceInterventions(serviceId);
			for (InterventionBean intervention : interventions) {
				if (intervention.getAuxiliaryId() != null) {
					auxiliariesIds.add(intervention.getAuxiliaryId());
				}
			}
			OfferBean[] offers = _offersStore.getServiceOffers(serviceId);
			for (OfferBean offer: offers) {
				auxiliariesIds.add(offer.getAuxiliaryId());
			}
			
			Map<String, AuxiliaryBean> auxiliaries = _auxiliariesStore.get(auxiliariesIds);
			AuxiliaryBean[] result = auxiliaries.values().toArray(new AuxiliaryBean[auxiliaries.size()]);
			
			return Response.status(Status.OK).entity(result, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}