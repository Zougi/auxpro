package org.ap.web.rest.servlet;

import java.lang.annotation.Annotation;
import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.MongoEntity;
import org.ap.web.entity.constant.EUserType;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;
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
		String id = null;
		return resolveAnnotations(sc, id);
	}
	public Annotation[] resolveAnnotations(SecurityContext sc, MongoEntity entity) {
		return resolveAnnotations(sc, entity.getId());
	}
	public Annotation[] resolveAnnotations(SecurityContext sc, UserBean user) {
		return resolveAnnotations(sc, user.getId());
	}
	public Annotation[] resolveAnnotations(SecurityContext sc, String id) {
		Set<Annotation> annotations = new HashSet<Annotation>();
		if (id != null && id.equals(sc.getUserPrincipal().getName())) {
			annotations.add(SecurityAnnotation.PRIVATE.get());
		}
		if (sc.isUserInRole(EUserType.ADMIN.name())) {
			annotations.add(SecurityAnnotation.PRIVATE.get());
		}
		return annotations.toArray(new Annotation[annotations.size()]);
	}
}
