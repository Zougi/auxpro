package org.ap.web.rest.servlet.images;

import java.io.File;
import java.io.IOException;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.server.FileServer;
import org.ap.web.server.IFileServer;

@Path("/images")
public class ImagesServlet extends ServletBase implements IImagesServlet {

	public static final String PATH = "/indisponibilities";
	
	private IFileServer _fileServer;
	
	/* CONSTRUCTOR */

	public ImagesServlet() throws APException {
		_fileServer = new FileServer();
	}
	
	/* METHODS */

	@Override
	public Response getImage(SecurityContext sc, String imageId) {
		try {
			File f = new File("");
			System.out.println(f.getAbsolutePath());
			return Response.ok(_fileServer.getFile("")).build();
		} catch (IOException e) {
			return sendException(new APException("", Status.INTERNAL_SERVER_ERROR));
		}
	}}
