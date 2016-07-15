package org.ap.web.rest.servlet.auxiliaries;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.GeoZoneBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.auxiliaries.AuxiliariesStore;
import org.ap.web.service.stores.auxiliaries.IAuxiliariesStore;

@Path("/auxiliaries")
public class AuxiliaryGeoZonesServlet extends ServletBase implements IAuxiliaryGeoZonesServlet {

	private IAuxiliariesStore _auxiliaryStore;
	
	/* CONSTRUCTOR */

	public AuxiliaryGeoZonesServlet() throws APException {
		_auxiliaryStore = new AuxiliariesStore();
	}
	
	/* METHODS */

	@Override
	public Response getGeoZonesJSON(SecurityContext sc, String id) {
		try {
			if (!sc.getUserPrincipal().getName().equals(id)) return Response.status(403).build();
			AuxiliaryBean aux = this._auxiliaryStore.getGeoZones(id);
			return Response.status(200).entity(aux, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).build();
		}
	}
	@Override
	public Response createGeoZoneJSON(SecurityContext sc, String id, GeoZoneBean geoZone) {
		try {
			if (!sc.getUserPrincipal().getName().equals(id)) return Response.status(403).build();
			_auxiliaryStore.createGeoZone(id, geoZone);
			return Response.status(Status.CREATED.getStatusCode()).entity(geoZone).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).build();
		}
	}
	
	@Override
	public Response deleteGeoZoneJSON(SecurityContext sc, String id, GeoZoneBean geoZone) {
		try {
			if (!sc.getUserPrincipal().getName().equals(id)) return Response.status(403).build();
			_auxiliaryStore.deleteGeoZone(id, geoZone);
			return Response.status(Status.CREATED.getStatusCode()).entity(geoZone).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).build();
		}
	}

}
