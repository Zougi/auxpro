package org.ap.web.rest.servlet;

import java.lang.annotation.Annotation;
import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.internal.APException;
import org.ap.web.rest.entity.BeanConverter;
import org.ap.web.rest.entity.constant.EUserType;
import org.ap.web.rest.entity.user.CredentialsBean;
import org.ap.web.rest.security.annotation.SecurityAnnotation;

public abstract class ServletBase {
	
	/* CONSTRUCTOR */
	
	/** Protected constructor (abstract class) */
	protected ServletBase() {}
	
	/* METHODS */
	
	/**	 */
	protected Response sendException(APException e) {
		return Response.status(e.getStatus()).entity(BeanConverter.convert(e)).build();
	}
	/**
	 * Returns HTTP 200 response with the provided content
	 * @param content
	 * @return
	 */
	protected Response sendResponse(String content) {
		return Response.ok(content).build();
	}
	protected Response sendResponse(Object content) {
		return Response.ok(content).build();
	}
	/**
	 * Return HTTP 200 response with no content
	 * @return
	 */
	protected Response sendResponse() {
		return Response.noContent().build();
	}
	
	public Annotation[] resolveAnnotations(SecurityContext sc) {
		return resolveAnnotations(sc, null);
	}
	public Annotation[] resolveAnnotations(SecurityContext sc, CredentialsBean credentials) {
		Set<Annotation> annotations = new HashSet<Annotation>();
		if (credentials != null && credentials.getName().equals(sc.getUserPrincipal().getName())) {
			annotations.add(SecurityAnnotation.PRIVATE.get());
			annotations.add(SecurityAnnotation.SECRET.get());
		}
		if (sc.isUserInRole(EUserType.ADMIN.name())) {
			annotations.add(SecurityAnnotation.PRIVATE.get());
		}
		return annotations.toArray(new Annotation[annotations.size()]);
	}
}
