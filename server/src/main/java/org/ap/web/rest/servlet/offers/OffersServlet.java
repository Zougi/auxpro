package org.ap.web.rest.servlet.offers;

import java.time.LocalDate;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.customers.CustomersStore;
import org.ap.web.service.stores.customers.ICustomersStore;
import org.ap.web.service.stores.interventions.IInterventionsStore;
import org.ap.web.service.stores.interventions.InterventionsStore;
import org.ap.web.service.stores.offers.OffersStore;
import org.ap.web.service.stores.offers.IOffersStore;

@Path("/offers")
public class OffersServlet extends ServletBase implements IOffersServlet {

	/* STATIC */

	public static final String PATH = "/offers";

	/* ATTRIBUTES */

	private ICustomersStore _customersStore;
	private IInterventionsStore _interventionsStore;
	private IOffersStore _offersStore;

	/* CONSTRUCTOR */

	public OffersServlet() throws APException {
		_customersStore = new CustomersStore();
		_interventionsStore = new InterventionsStore();
		_offersStore = new OffersStore();
	}
	
	public void checkOffer(String id, OfferBean offer) throws APException {
		try {
			checkServiceOffer(id, offer);
		} catch (APException e) {
			checkAuxiliaryOffer(id, offer);
		}
	}

	public void checkServiceOffer(String serviceId, OfferBean offer) throws APException {
		if (offer.getServiceId() == null) throw APException.INVALID_REQUEST_DATA;
		if (!serviceId.equals(offer.getServiceId())) throw APException.OPERATION_NOT_ALLOWED;

		if (offer.getCustomerId() == null) throw APException.INVALID_REQUEST_DATA;
		CustomerBean customer = _customersStore.getCustomer(offer.getCustomerId());
		if (customer == null) throw APException.INVALID_REQUEST_DATA;
		if (!serviceId.equals(customer.getServiceId())) throw APException.OPERATION_NOT_ALLOWED;

		if (offer.getInterventionId() == null) throw APException.INVALID_REQUEST_DATA;
		InterventionBean intervention = _interventionsStore.getIntervention(offer.getInterventionId());
		if (intervention == null) throw APException.INVALID_REQUEST_DATA;
		if (!customer.getId().equals(intervention.getCustomerId())) throw APException.INVALID_REQUEST_DATA;
		if (!serviceId.equals(intervention.getServiceId())) throw APException.OPERATION_NOT_ALLOWED;
	}
	
	public void checkAuxiliaryOffer(String auxiliaryId, OfferBean offer) throws APException {
		if (offer.getAuxiliaryId() == null) throw APException.INVALID_REQUEST_DATA;
		if (!auxiliaryId.equals(offer.getAuxiliaryId())) throw APException.OPERATION_NOT_ALLOWED;
	}

	/* METHODS */

	@Override
	public Response createOfferJSON(SecurityContext sc, OfferBean offer) {
		try {
			offer.setServiceId(sc.getUserPrincipal().getName());
			checkServiceOffer(sc.getUserPrincipal().getName(), offer);
			offer.setCreationDate(LocalDate.now());
			offer = _offersStore.createOffer(offer);
			return Response.status(200).entity(offer, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getOfferJSON(SecurityContext sc, String offerId) {
		try {
			OfferBean offer = _offersStore.getOffer(offerId);
			if (offer == null) throw APException.OFFER_NOT_FOUND;
			checkOffer(sc.getUserPrincipal().getName(), offer);
			return Response.status(200).entity(offer, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateOfferJSON(SecurityContext sc, String offerId, OfferBean offer) {
		try {
			
			checkOffer(sc.getUserPrincipal().getName(), offer);
			
			OfferBean previousOffer = _offersStore.getOffer(offerId);
			if (previousOffer == null) throw APException.INVALID_REQUEST_DATA;
			if (!previousOffer.getServiceId().equals(offer.getServiceId())) throw APException.OPERATION_NOT_ALLOWED;
			if (!previousOffer.getCustomerId().equals(offer.getCustomerId())) throw APException.OPERATION_NOT_ALLOWED;
			if (!previousOffer.getInterventionId().equals(offer.getInterventionId())) throw APException.OPERATION_NOT_ALLOWED;

			offer = _offersStore.updateOffer(offer);
			return Response.status(200).entity(offer, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteOfferJSON(SecurityContext sc, String offerId) {
		try {
			OfferBean offer = _offersStore.getOffer(offerId);
			if (offer == null) throw APException.OFFER_NOT_FOUND;
			checkServiceOffer(sc.getUserPrincipal().getName(), offer);
			_offersStore.deleteOffer(offerId);
			return Response.status(200).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}
