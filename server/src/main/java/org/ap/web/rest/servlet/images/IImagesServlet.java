package org.ap.web.rest.servlet.images;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

/**
 * This interface describes the indisponibilities servlet features.
 * The following actions are available:
 * 
 *  - /image/id GET > access an image
 */
public interface IImagesServlet {
	
	@GET
	@Path("{imageId}")
	@Produces({"image/png", "image/jpeg", "image/jpg"})
	public Response getImage(@Context SecurityContext sc, @PathParam("imageId") final String imageId);
}
