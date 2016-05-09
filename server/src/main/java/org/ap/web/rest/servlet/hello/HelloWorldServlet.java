package org.ap.web.rest.servlet.hello;

import javax.ws.rs.Path;

/**
 * IHelloWorldServlet implementation
 */
@Path("/hello")
public class HelloWorldServlet implements IHelloWorldServlet {

	/* METHODS */
	
	@Override
	public String sayHelloText() {
		return "Hello World";
	}
	@Override
	public String sayHelloXml() {
		return "<?xml version=\"1.0\"?><hello>Hello XML World</hello>";
	} 
	@Override
	public String sayHelloHTML() {
		return "<html><title>Hello World</title><body><h1>Hello HTML World</body></h1></html>";
	}
	@Override
	public String sayHelloJSON() {
		return "{ title: 'Hello JSON World' }";
	}
}
