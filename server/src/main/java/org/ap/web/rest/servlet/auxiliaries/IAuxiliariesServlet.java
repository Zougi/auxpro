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
import org.ap.web.entity.mongo.QuestionaryBean;

/**
 * This interface describes the auxiliaries servlet features.
 * The following actions are available:
 * 
 *  - /auxiliaries GET > list system auxiliaries
 *  
 *  - /auxiliaries/{auxId} POST   > create a new auxiliary 
 *  - /auxiliaries/{auxId} GET    > retrieve an auxiliary details
 *  - /auxiliaries/{auxId} PUT    > update an existing auxiliary
 *  - /auxiliaries/{auxId} DELETE > delete an auxiliary
 *  
 *  - /auxiliaries/{auxId}/questionary POST > post questionnary answers for an auxiliary
 *  
 *  - /auxiliaries/{auxId}/services          GET > retrieve services of an auxiliary
 *  - /auxiliaries/{auxId}/customers         GET > retrieve customers of an auxiliary
 *  - /auxiliaries/{auxId}/offers            GET > retrieve offers of an auxiliary
 *  - /auxiliaries/{auxId}/interventions     GET > retrieve interventions of an auxiliary
 *  - /auxiliaries/{auxId}/indisponibilities GET > retrieve indisponibilities of an auxiliary
 */
public interface IAuxiliariesServlet {

	// AUXILIARIES
	
	@GET
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliariesJSON(@Context SecurityContext sc);
	
	// AUXILIARY
	
	@POST
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createAuxiliaryJSON(@Context SecurityContext sc, CredentialsBean credentials);
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{auxiliaryId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getAuxiliaryJSON(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId);
	
	@PUT
	@RolesAllowed("authenticated")
	@Path("{auxiliaryId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateAuxiliaryJSON(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId, AuxiliaryBean auxiliary);
	
	@DELETE
	@RolesAllowed("admin")
	@Path("{auxiliaryId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response deleteAuxiliaryJSON(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId);

	// QUESTIONARY
	
	@POST
	@RolesAllowed("authenticated")
	@Path("{auxiliaryId}/questionary")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response postQuestionaryJSON(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId, QuestionaryBean questionary);

	// SERVICES
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{auxiliaryId}/services")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getServicesJSON(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId);

	// CUSTOMERS
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{auxiliaryId}/customers")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getCustomersJSON(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId);
	
	// OFFERS
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{auxiliaryId}/offers")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getOffersJSON(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId);
	
	// INTERVENTIONS
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{auxiliaryId}/interventions")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getInterventionsJSON(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId);
	
	// INDISPONIBILITIES
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{auxiliaryId}/indisponibilities")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getIndisponibilitiesJSON(@Context SecurityContext sc, @PathParam("auxiliaryId") final String auxiliaryId);
	
}
