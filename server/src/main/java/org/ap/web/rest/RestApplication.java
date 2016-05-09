package org.ap.web.rest;

import java.io.IOException;

import javax.ws.rs.ApplicationPath;

import org.ap.web.internal.EConfigProperties;
import org.ap.web.rest.filter.AuthorizationRequestFilter;
import org.ap.web.rest.filter.HeadersResponseFilter;
import org.glassfish.jersey.filter.LoggingFilter;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.message.filtering.EntityFilteringFeature;
import org.glassfish.jersey.message.filtering.SecurityEntityFilteringFeature;
import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/rest")
public class RestApplication extends ResourceConfig {
	
	/* ATTRIBUTES */
	
	/* CONSTRUCTORS */
	
	/**	 */
	public RestApplication() {
		try {
			EConfigProperties.loadProperties();
		} catch (IOException e) {
			System.err.println(e);
		}
		
		packages("org.ap.web.rest.servlet");
		register(JacksonFeature.class);
		//register(JacksonJsonProvider.class);
		register(AuthorizationRequestFilter.class);
		register(HeadersResponseFilter.class);
		register(SecurityEntityFilteringFeature.class);
		register(EntityFilteringFeature.class);
		if (new Boolean(EConfigProperties.SERV_LOGIN.getValue())) {
			register(LoggingFilter.class);
		}
		
	}
	
	/* METHODS */
	
}
