package org.ap.web.rest.servlet.images;

import java.io.InputStream;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

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
	
	@POST
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces({MediaType.APPLICATION_JSON})
	public Response postImage(@Context SecurityContext sc, @FormDataParam("file") InputStream uploadedInputStream, @FormDataParam("file") FormDataContentDisposition fileDetail);
}
