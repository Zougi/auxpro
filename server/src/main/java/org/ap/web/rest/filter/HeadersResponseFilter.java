package org.ap.web.rest.filter;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.HttpHeaders;

import org.ap.web.internal.EConfigProperties;

public class HeadersResponseFilter implements ContainerResponseFilter {

	/* STATIC */

	
	private static final String ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin";
	private static final String ACCESS_CONTROL_ALLOW_HEADERS = "Access-Control-Allow-Headers";
	private static final String ACCESS_CONTROL_ALLOW_METHODS = "Access-Control-Allow-Methods";

	/* CONSTRUCTOR */

	public HeadersResponseFilter() {}

	/* METHODS */

	// ContainerRequestFilter Implementation //

	@Override
	public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
		responseContext.getHeaders().add(ACCESS_CONTROL_ALLOW_ORIGIN, EConfigProperties.SERV_ORIGIN.getValue());
		//responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");			
		responseContext.getHeaders().add(ACCESS_CONTROL_ALLOW_HEADERS, HttpHeaders.AUTHORIZATION);
		responseContext.getHeaders().add(ACCESS_CONTROL_ALLOW_HEADERS, "Content-type");
		responseContext.getHeaders().add(ACCESS_CONTROL_ALLOW_METHODS, "GET, POST, PUT, DELETE, OPTION");
	}
}
