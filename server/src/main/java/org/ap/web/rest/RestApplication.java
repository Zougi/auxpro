package org.ap.web.rest;

import java.io.IOException;

import javax.ws.rs.ApplicationPath;

import org.ap.web.internal.EConfigProperties;
import org.ap.web.internal.ObjectMapperContextResolver;
import org.ap.web.rest.filter.AuthorizationRequestFilter;
import org.ap.web.rest.filter.HeadersResponseFilter;
import org.ap.web.service.Mongo;
import org.glassfish.jersey.jackson.JacksonFeature;
import org.glassfish.jersey.logging.LoggingFeature;
import org.glassfish.jersey.media.multipart.MultiPartFeature;
import org.glassfish.jersey.message.filtering.EntityFilteringFeature;
import org.glassfish.jersey.server.ResourceConfig;

@ApplicationPath("/rest")
public class RestApplication extends ResourceConfig {

	public RestApplication() {
		String db = EConfigProperties.DB_NAME.getValue();
		try {
			EConfigProperties.loadProperties();
		} catch (IOException e) {
			System.err.println(e);
		}
		if (db.equals("db-test")) {
			EConfigProperties.DB_NAME.setValue("db-test");
		}
		packages("org.ap.web.rest.servlet");
		register(JacksonFeature.class);
		register(ObjectMapperContextResolver.class);
		register(AuthorizationRequestFilter.class);
		register(HeadersResponseFilter.class);
		register(EntityFilteringFeature.class);
        register(MultiPartFeature.class);

		if (new Boolean(EConfigProperties.SERV_LOGIN.getValue())) {
			register(LoggingFeature.class);
		}		
		Mongo.reload();
	}
}
