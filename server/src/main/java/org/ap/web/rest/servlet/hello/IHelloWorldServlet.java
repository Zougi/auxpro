package org.ap.web.rest.servlet.hello;

import javax.annotation.security.PermitAll;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * HelloWorld servlet definition.
 * This servlet is used as sample only and should not be published in any kind of application.
 */
@PermitAll
public interface IHelloWorldServlet {

	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String sayHelloText();
	
	@GET
	@Produces(MediaType.TEXT_XML)
	public String sayHelloXml();
	
	@GET
	@Produces(MediaType.TEXT_HTML)
	public String sayHelloHTML();
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public String sayHelloJSON();
}
