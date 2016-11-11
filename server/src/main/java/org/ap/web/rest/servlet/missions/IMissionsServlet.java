package org.ap.web.rest.servlet.missions;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.mongo.MissionBean;

/**
 * This interface describes the offers servlet features.
 * The following actions are available:
 *  - /missions/{missionId} GET    > retrieve a mission details
 *  - /missions/{missionId} PUT    > update a existing mission
 *  - /missions/{missionId} DELETE > delete a mission
 */
public interface IMissionsServlet {

	@GET
	@RolesAllowed("authenticated")
	@Path("{missionId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getMissionJSON(@Context SecurityContext sc, @PathParam("missionId") String missionId);
	
	@PUT
	@RolesAllowed("authenticated")
	@Path("{missionId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateMissionJSON(@Context SecurityContext sc, @PathParam("missionId") String missionId, MissionBean mission);
	
	@DELETE
	@RolesAllowed("admin")
	@Path("{missionId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response deleteMissionJSON(@Context SecurityContext sc, @PathParam("missionId") String missionId);
}
