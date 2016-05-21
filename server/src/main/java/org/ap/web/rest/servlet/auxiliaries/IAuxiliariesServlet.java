package org.ap.web.rest.servlet.auxiliaries;

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

import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.CredentialsBean;

/**
 * This interface describes the auxiliaries servlet features.
 * The following actions are available:
 * 
 *  - /auxiliaries GET > list system auxiliaries
 *  
 *  - /auxiliaries/{auxId} GET    > retrieve an auxiliary details
 *  - /auxiliaries/{auxId} POST   > create a new auxiliary 
 *  - /auxiliaries/{auxId} PUT    > update an existing auxiliary
 *  - /auxiliaries/{auxId} DELETE > delete an auxiliary
 *  
 *  - /auxiliaries/{auxId}/missions GET > retrieve missions of an auxiliary
 *  - /auxiliaries/{auxId}/absences GET > retrieve absences of an auxiliary
 */
public interface IAuxiliariesServlet {

	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliariesJSON(@Context SecurityContext sc);
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createAuxiliaryJSON(@Context SecurityContext sc, CredentialsBean credentials);
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{auxId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryJSON(@Context SecurityContext sc, @PathParam("auxId") final String id);
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{auxId}/missions")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryMissionsJSON(@Context SecurityContext sc, @PathParam("auxId") final String id);

	@GET
	@RolesAllowed("authenticated")
	@Path("{auxId}/absences")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryAbsencesJSON(@Context SecurityContext sc, @PathParam("auxId") final String id);

	@PUT
	@RolesAllowed("authenticated")
	@Path("{auxId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateAuxiliaryJSON(@Context SecurityContext sc, @PathParam("auxId") final String id, AuxiliaryBean auxiliary);
	
	@DELETE
	@RolesAllowed("admin")
	@Path("{auxId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response deleteAuxiliaryJSON(@Context SecurityContext sc, @PathParam("auxId") final String id);
	
	@POST
	@Path("{auxId}/idcard")
	@Consumes({MediaType.MULTIPART_FORM_DATA})
	public Response postAuxiliaryIDCard(@Context SecurityContext sc, @PathParam("auxId") final String id);
}
