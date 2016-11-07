package org.ap.web.rest.servlet.geozones;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.GeozoneBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.service.stores.geozones.GeozonesStore;
import org.ap.web.service.stores.geozones.IGeozonesStore;

@Path("/geozones")
public class GeozonesServlet extends ServletBase implements IGeoZonesServlet {

	private IGeozonesStore _geozoneStore;
	
	/* CONSTRUCTOR */

	public GeozonesServlet() throws APException {
		_geozoneStore = new GeozonesStore();
	}
	
	/* METHODS */

	public GeozoneBean checkGeozone(String auxiliaryId, String geozoneId) throws APException {
		return checkGeozone(auxiliaryId, _geozoneStore.getGeozone(geozoneId));
	}
	public GeozoneBean checkGeozone(String auxiliaryId, GeozoneBean geozone) throws APException {
		return checkGeozone(auxiliaryId, geozone, false);
	}
	public GeozoneBean checkGeozone(String auxiliaryId, GeozoneBean geozone, boolean create) throws APException {
		if (geozone == null) throw APException.GEOZONE_NOT_FOUND;
		if (geozone.getAuxiliaryId() == null) throw APException.GEOZONE_AUXILIARY_MISSING;
		if (!auxiliaryId.equals(geozone.getAuxiliaryId())) {
			if (create) throw APException.GEOZONE_AUXILIARY_INVALID;
			else throw APException.GEOZONE_NOT_FOUND;
		}
		return geozone;
	}
	
	@Override
	public Response getGeoZoneJSON(SecurityContext sc, String id) {
		try {
			GeozoneBean geozone = checkGeozone(sc.getUserPrincipal().getName(), id);
			return Response.status(Status.OK).entity(geozone, resolveAnnotations(sc)).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response createGeoZoneJSON(SecurityContext sc, GeozoneBean geozone) {
		try {
			checkGeozone(sc.getUserPrincipal().getName(), geozone, true);
			if (!sc.getUserPrincipal().getName().equals(geozone.getAuxiliaryId())) return Response.status(403).build();
			_geozoneStore.createGeozone(geozone);
			return Response.status(Status.CREATED).build();			
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response updateGeoZoneJSON(SecurityContext sc, String id, GeozoneBean geozone) {
		try {
			checkGeozone(sc.getUserPrincipal().getName(), geozone);
			GeozoneBean previousGeozone = _geozoneStore.getGeozone(id);		
			if (previousGeozone == null) throw APException.GEOZONE_NOT_FOUND;
			if (!previousGeozone.getAuxiliaryId().equals(geozone.getAuxiliaryId())) throw APException.GEOZONE_NOT_FOUND;
			geozone = _geozoneStore.updateGeozone(geozone);
			return Response.status(Status.OK).build();	
		} catch (APException e) {
			return sendException(e);
		}
	}
	@Override
	public Response deleteGeoZoneJSON(SecurityContext sc, String id) {
		try {
			checkGeozone(sc.getUserPrincipal().getName(), id);
			_geozoneStore.deleteGeozone(id);
			return Response.status(Status.OK).build();
		} catch (APException e) {
			return sendException(e);
		}
	}
}
