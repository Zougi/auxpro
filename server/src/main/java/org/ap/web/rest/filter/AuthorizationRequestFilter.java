package org.ap.web.rest.filter;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.Response.Status;

import org.ap.web.internal.APException;
import org.ap.web.rest.entity.BeanConverter;
import org.ap.web.rest.entity.user.UserBean;
import org.ap.web.rest.security.Encoder;
import org.ap.web.rest.security.UserSecurityContext;
import org.ap.web.service.users.IUsersService;
import org.ap.web.service.users.UsersMongoService;

@PreMatching
public class AuthorizationRequestFilter implements ContainerRequestFilter {

	/* STATIC */

	public static final String HEADER = "Authorization";

	/* ATTRIBUTES */

	private IUsersService _service;

	/* CONSTRUCTOR */

	public AuthorizationRequestFilter() throws APException {
		_service = new UsersMongoService();
	}

	/* METHODS */

	// ContainerRequestFilter Implementation //

	@Override
	public void filter(ContainerRequestContext requestContext) throws WebApplicationException {
		// Let OPTIONS call pass through
		if (requestContext.getMethod().equals("OPTIONS")) return;
		// Filter out all other request
		String header = requestContext.getHeaderString(HEADER);
		if (header == null) {
			throw new WebApplicationException(Status.UNAUTHORIZED);
		} else {
			try {
				String[] credentials = Encoder.decodeBasicAuth(header);
				if(credentials == null || credentials.length != 2){
					throw new WebApplicationException(Status.UNAUTHORIZED);
				}
				UserBean user = BeanConverter.convertToUser(_service.checkUser(credentials[0], credentials[1]));

				requestContext.setSecurityContext(new UserSecurityContext(user));
			} catch (APException e) {
				throw new WebApplicationException(Status.UNAUTHORIZED);
			}
		}
	}
}
