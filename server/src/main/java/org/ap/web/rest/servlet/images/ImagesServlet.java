package org.ap.web.rest.servlet.images;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.network.IdBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.ServletBase;
import org.ap.web.server.FileServer;
import org.ap.web.server.IFileServer;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

@Path("/images")
public class ImagesServlet extends ServletBase implements IImagesServlet {

	public static final String PATH = "/images";
	
	private IFileServer _fileServer;
	
	/* CONSTRUCTOR */

	public ImagesServlet() throws APException {
		_fileServer = new FileServer();
	}
	
	/* METHODS */

	@Override
	public Response getImage(SecurityContext sc, String imageId) {
		try {
			return Response.ok(_fileServer.getFile(imageId)).build();
		} catch (IOException e) {
			return sendException(new APException("Cannot load image", Status.INTERNAL_SERVER_ERROR));
		}
	}

	@Override
	public Response postImage(SecurityContext sc, InputStream uploadedInputStream, FormDataContentDisposition fileDetail) {
		try {
			String id = _fileServer.storeFile(fileDetail.getFileName(), toByteArray(uploadedInputStream));
			IdBean bean = new IdBean();
			bean.setId(id);
			return Response.status(Status.OK).entity(bean).build();
		} catch (IOException e) {
			return sendException(new APException("Cannot store image", Status.INTERNAL_SERVER_ERROR));
		}
	}
	
	public byte[] toByteArray(InputStream is) throws IOException {
		ByteArrayOutputStream buffer = new ByteArrayOutputStream();
		int nRead;
		byte[] data = new byte[16384];
		while ((nRead = is.read(data, 0, data.length)) != -1) {
		  buffer.write(data, 0, nRead);
		}
		buffer.flush();
		return buffer.toByteArray();
	}
}

