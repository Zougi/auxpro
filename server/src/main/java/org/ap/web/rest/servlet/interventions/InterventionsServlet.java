package org.ap.web.rest.servlet.interventions;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.constant.EOfferStatus;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.GeozoneBean;
import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.MissionBean;
import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.helpers.GeoHelper;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.auxiliaries.AuxiliariesStore;
import org.ap.web.service.stores.auxiliaries.IAuxiliariesStore;
import org.ap.web.service.stores.customers.CustomersStore;
import org.ap.web.service.stores.customers.ICustomersStore;
import org.ap.web.service.stores.geozones.GeozonesStore;
import org.ap.web.service.stores.geozones.IGeozonesStore;
import org.ap.web.service.stores.indisponibilities.IIndisponibilitiesStore;
import org.ap.web.service.stores.indisponibilities.IndisponibilitiesStore;
import org.ap.web.service.stores.interventions.IInterventionsStore;
import org.ap.web.service.stores.interventions.InterventionsStore;
import org.ap.web.service.stores.missions.IMissionsStore;
import org.ap.web.service.stores.missions.MissionsStore;
import org.ap.web.service.stores.offers.IOffersStore;
import org.ap.web.service.stores.offers.OffersStore;

@Path("/interventions")
public class InterventionsServlet extends ServletBase implements IInterventionsServlet {

	/* STATIC */

	public static final String PATH = "/interventions";

	/* ATTRIBUTES */

	private IAuxiliariesStore _auxiliariesStore;
	private IGeozonesStore _geozonesStore;
	private IIndisponibilitiesStore _indisponibilitiesStore;
	private ICustomersStore _customersStore;
	private IInterventionsStore _interventionsStore;
	private IOffersStore _offersStore;
	private IMissionsStore _missionsStore;

	/* CONSTRUCTOR */

	public InterventionsServlet() throws APException {
		_auxiliariesStore = new AuxiliariesStore();
		_indisponibilitiesStore = new IndisponibilitiesStore();
		_customersStore = new CustomersStore();
		_interventionsStore = new InterventionsStore();
		_offersStore = new OffersStore();
		_missionsStore = new MissionsStore();
		_geozonesStore = new GeozonesStore();
	}

	/* METHODS */

	public InterventionBean checkIntervention(String serviceId, String interventionId) throws APException {
		return checkIntervention(serviceId, _interventionsStore.getIntervention(interventionId));
	}
	public InterventionBean checkIntervention(String serviceId, InterventionBean intervention) throws APException {
		return checkIntervention(serviceId, intervention, false);
	}
	public InterventionBean checkIntervention(String serviceId, InterventionBean intervention, boolean create) throws APException {
		if (intervention == null) throw APException.INTERVENTION_NOT_FOUND;
		if (intervention.getServiceId() == null) throw APException.INTERVENTION_SERVICE_MISSING;
		if (!serviceId.equals(intervention.getServiceId())) {
			if (create) throw APException.INTERVENTION_SERVICE_INVALID;
			else throw APException.INTERVENTION_NOT_FOUND;
		}
		if (intervention.getCustomerId() == null) throw APException.INTERVENTION_CUSTOMER_MISSING;
		CustomerBean customer = _customersStore.getCustomer(intervention.getCustomerId());
		if (customer == null) throw APException.INTERVENTION_CUSTOMER_INVALID;
		if (!serviceId.equals(customer.getServiceId())) throw APException.INTERVENTION_CUSTOMER_INVALID;

		return intervention;
	}

	@Override
	public Response createInterventionJSON(SecurityContext sc, InterventionBean intervention) {
		try {
			checkIntervention(sc.getUserPrincipal().getName(), intervention, true);
			intervention = _interventionsStore.createIntervention(intervention);
			return Response.status(Status.CREATED).entity(intervention, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getInterventionJSON(SecurityContext sc, String interventionId) {
		try {
			InterventionBean intervention = checkIntervention(sc.getUserPrincipal().getName(), interventionId);
			return Response.status(Status.OK).entity(intervention, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateInterventionJSON(SecurityContext sc, String interventionId, InterventionBean intervention) {
		try {
			checkIntervention(sc.getUserPrincipal().getName(), intervention, true);
			InterventionBean previousIntervention = _interventionsStore.getIntervention(interventionId);		
			if (previousIntervention == null) throw APException.INTERVENTION_NOT_FOUND;
			if (!previousIntervention.getServiceId().equals(intervention.getServiceId())) throw APException.INTERVENTION_NOT_FOUND;
			if (!previousIntervention.getCustomerId().equals(intervention.getCustomerId())) throw APException.INTERVENTION_CUSTOMER_INVALID;
			intervention = _interventionsStore.updateIntervention(intervention);
			if (intervention.getAuxiliaryId() != null) {
				_missionsStore.createMissions(intervention);
				OfferBean[] offers = _offersStore.getInterventionOffers(interventionId);
				for (OfferBean offer : offers) {
					if (offer.getAuxiliaryId().equals(intervention.getAuxiliaryId())) {
						offer.setStatus(EOfferStatus.CONFIRMED.getId());
					} else {
						offer.setStatus(EOfferStatus.REJECTED.getId());
					}
					offer.setHideToSad(true);
					_offersStore.updateOffer(offer);
				}
			}
			return Response.status(Status.OK).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteInterventionJSON(SecurityContext sc, String interventionId) {
		try {
			checkIntervention(sc.getUserPrincipal().getName(), interventionId);
			_interventionsStore.deleteIntervention(interventionId);
			return Response.status(Status.OK).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getInterventionMatchJSON(SecurityContext sc, String interventionId) {
		try {
			InterventionBean intervention = checkIntervention(sc.getUserPrincipal().getName(), interventionId);
			CustomerBean customer = _customersStore.getCustomer(intervention.getCustomerId());
			AuxiliaryBean[] auxiliaries = _auxiliariesStore.get();
			Set<AuxiliaryBean> result = new HashSet<AuxiliaryBean>();
			// First retrieve auxiliaries with the good geo zone
			for (AuxiliaryBean aux : auxiliaries) {
				GeozoneBean[] geozones = _geozonesStore.getAuxiliaryGeozones(aux.getId());
				for (GeozoneBean geozone : geozones) {
					// Postal check
					if (geozone.getPostalCode() == customer.getPostalCode()) {
						result.add(aux);
					}
					// Distance check
					if (geozone.getRadius() != null) {
						double dist = GeoHelper.getDistance(
								new Double(geozone.getLattitude()), 
								new Double(geozone.getLongitude()), 
								new Double(customer.getLattitude()), 
								new Double(customer.getLongitude()));
						if (dist < new Double(geozone.getRadius())) {
							result.add(aux);
						}
					}

				}
			}
			// Then remove those with planning issues
			for (AuxiliaryBean aux : result) {
				boolean removed = false;
				MissionBean[] missions = _missionsStore.getAuxiliaryMissions(aux.getId());
				IndisponibilityBean[] indisponibilities = _indisponibilitiesStore.getAuxIndisponibilities(aux.getId());
				for (MissionBean mission : missions) {

				}
				if (removed) {
					break;
				}
				for (IndisponibilityBean indisponibility: indisponibilities) {

				}
				if (removed) {
					break;
				}
			}
			// Finally give them a score a return the 5 bests

			return Response.status(Status.OK).entity(result.toArray(new AuxiliaryBean[result.size()]), resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}
