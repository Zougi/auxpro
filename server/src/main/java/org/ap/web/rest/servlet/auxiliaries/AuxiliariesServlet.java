package org.ap.web.rest.servlet.auxiliaries;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.AuxiliaryDataBean;
import org.ap.web.entity.mongo.CredentialsBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.auxiliaries.AuxiliariesStore;
import org.ap.web.service.stores.auxiliaries.IAuxiliariesStore;
import org.ap.web.service.stores.customers.CustomersStore;
import org.ap.web.service.stores.customers.ICustomersStore;
import org.ap.web.service.stores.missions.IMissionsStore;
import org.ap.web.service.stores.missions.MissionsStore;
import org.ap.web.service.stores.services.IServicesStore;
import org.ap.web.service.stores.services.ServicesStore;

@Path("/auxiliaries")
public class AuxiliariesServlet extends ServletBase implements IAuxiliariesServlet {

	/* STATIC */

	public static final String PATH = "/auxiliaries";  

	/* ATTRIBUTES */

	private IAuxiliariesStore _auxiliaryStore;
	private IServicesStore _servicesStore;
	private ICustomersStore _customersStore;
	private IMissionsStore _missionsStore;

	/* CONSTRUCTOR */

	public AuxiliariesServlet() throws APException {
		_auxiliaryStore = new AuxiliariesStore();
		_missionsStore = new MissionsStore();
		_customersStore = new CustomersStore();
		_servicesStore = new ServicesStore();
	}

	/* METHODS */

	// IUserServlet Implementation //

	@Override
	public Response getAuxiliariesJSON(SecurityContext sc) {
		try {
			AuxiliaryBean[] users = _auxiliaryStore.get();
			return Response.status(200).entity(users, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createAuxiliaryJSON(SecurityContext sc, CredentialsBean bean) {
		try {
			AuxiliaryBean auxiliary = _auxiliaryStore.create(bean);
			return Response.status(201).entity(auxiliary, resolveAnnotations(sc, auxiliary)).build();
		} catch (APException e) {
			return sendException(e);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).build();
		}
	}
	@Override
	public Response getAuxiliaryJSON(SecurityContext sc, String id) {
		try {
			AuxiliaryBean bean = _auxiliaryStore.get(id);
			if (bean == null) return Response.status(Status.NOT_FOUND).build();
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateAuxiliaryJSON(SecurityContext sc, String id, AuxiliaryBean bean) {
		try {
			if (!sc.getUserPrincipal().getName().equals(id)) return Response.status(403).build();
			bean = _auxiliaryStore.update(bean);
			return Response.status(200).entity(bean, resolveAnnotations(sc, bean)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteAuxiliaryJSON(SecurityContext sc, String id) {
		try {
			_auxiliaryStore.delete(id);
			return Response.status(200).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response postAuxiliaryIDCard(SecurityContext sc, String id) {
		try {
			throw APException.NOT_IMPLEMENTED;
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response getAuxiliaryMissionsJSON(SecurityContext sc, String id) {
		try {
			if (_auxiliaryStore.get(id) == null) return Response.status(Status.NOT_FOUND).build();
			if (!sc.isUserInRole("admin") && !sc.getUserPrincipal().getName().equals(id)) return Response.status(Status.FORBIDDEN).build();
			InterventionBean[] missions = _missionsStore.getAuxMissions(id);
			Set<String> services = new HashSet<String>();
			Set<String> customers = new HashSet<String>();
			for (InterventionBean mission : missions) {
				services.add(mission.getServiceId());
				customers.add(mission.getCustomerId());
			}
			AuxiliaryDataBean bean = new AuxiliaryDataBean();
			bean.setMissions(missions);
			bean.setServices(_servicesStore.get(services));
			bean.setCustomers(_customersStore.get(customers));
			return Response.status(200).entity(bean).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}