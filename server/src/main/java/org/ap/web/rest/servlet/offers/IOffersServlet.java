package org.ap.web.rest.servlet.offers;

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

import org.ap.web.entity.mongo.OfferBean;

/**
 * This interface describes the offers servlet features.
 * The following actions are available:
 *  - /offers/{offerId} GET    > retrieve an offer details
 *  - /offers/{offerId} POST   > create a new offers for this service
 *  - /offers/{offerId} PUT    > update an existing offers
 *  - /offers/{offerId} DELETE > delete an offers
 */
public interface IOffersServlet {
	
	@POST
	@RolesAllowed("authenticated")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response createOfferJSON(@Context SecurityContext sc, OfferBean offer);
	
	@GET
	@RolesAllowed("authenticated")
	@Path("{offerId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getOfferJSON(@Context SecurityContext sc, @PathParam("offerId") String offerId);
	
	@PUT
	@RolesAllowed("authenticated")
	@Path("{offerId}")
	@Consumes({MediaType.APPLICATION_JSON})
	@Produces({MediaType.APPLICATION_JSON})
	public Response updateOfferJSON(@Context SecurityContext sc, @PathParam("offerId") String offerId, OfferBean offer);
	
	@DELETE
	@RolesAllowed("authenticated")
	@Path("{offerId}")
	@Produces({MediaType.APPLICATION_JSON})
	public Response deleteOfferJSON(@Context SecurityContext sc, @PathParam("offerId") String offerId);
}
