package org.ap.web.rest.servlet.geozones;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.GeozoneBean;

/**
 * This interface describes the auxiliary geozones servlet features.
 * The following actions are available:
 * 
 *  - /geozones/{gzId} GET    > retrieves an existing geozone
 *  - /geozones        POST   > create a new geozone
 *  - /geozones/{gzId} PUT    > updates an existing geozone
 *  - /geozones/{gzId} DELETE > deletes an existing geozone
 */
public interface IGeoZonesServlet {

	@GET
	@RolesAllowed("authenticated")
	@Produces({MediaType.APPLICATION_JSON})
	@Path("{geozoneId}")
	public Response getGeoZoneJSON(@Context SecurityContext sc, @PathParam("geozoneId") final String id);

	@POST
	@RolesAllowed("authenticated")
	@Consumes({MediaType.APPLICATION_JSON})
	public Response createGeoZoneJSON(@Context SecurityContext sc, GeozoneBean geoZone);

	@PUT
	@RolesAllowed("authenticated")
	@Consumes({MediaType.APPLICATION_JSON})
	@Path("{geozoneId}")
	public Response updateGeoZoneJSON(@Context SecurityContext sc, @PathParam("geozoneId") final String id, GeozoneBean geoZone);

	@DELETE
	@RolesAllowed("authenticated")
	@Path("{geozoneId}")
	public Response deleteGeoZoneJSON(@Context SecurityContext sc, @PathParam("geozoneId") final String id);
}
