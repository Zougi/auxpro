package org.ap.web.rest.servlet.auxiliaries;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.entity.mongo.GeoZoneBean;

/**
 * This interface describes the auxiliary geozones servlet features.
 * The following actions are available:
 * 
 *  - /auxiliaries/{auxId}/geozones         GET    > retrieve all geozones of an auxiliary
 *  - /auxiliaries/{auxId}/geozones         POST   > create a new geozone
 *  - /auxiliaries/{auxId}/geozones/{gzsId} DELETE > deletes an existing geozone
 */
public interface IAuxiliaryGeoZonesServlet {
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{auxId}/geozones")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getGeoZonesJSON(@Context SecurityContext sc, @PathParam("auxId") final String id);

	@POST
	@RolesAllowed("authenticated")
	@Path("{auxId}/geozones")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createGeoZoneJSON(@Context SecurityContext sc, @PathParam("auxId") final String id, GeoZoneBean geoZone);
	
	@DELETE
	@RolesAllowed("authenticated")
	@Path("{auxId}/geozones")
	@Consumes({MediaType.APPLICATION_JSON})
	public Response deleteGeoZoneJSON(@Context SecurityContext sc, @PathParam("auxId") final String id, GeoZoneBean geoZone);
}
