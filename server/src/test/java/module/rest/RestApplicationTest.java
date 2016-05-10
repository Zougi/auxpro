package module.rest;

import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;

import org.ap.web.rest.filter.HeadersResponseFilter;
import org.ap.web.rest.servlet.auth.AuthServlet;
import org.junit.Test;

import junit.framework.TestCase;

public class RestApplicationTest extends RestTestBase {

	public RestApplicationTest() {
		super(AuthServlet.PATH);
	}

	/* TEST CASES */
	
	/* Positive Testing */
	
	@Test
	public void testV_getAuth_checkHeaders() throws Exception {
		Response response = prepare("", userAdmin.getName(), userAdmin.getPassword()).options();
		String headers = response.getHeaderString(HeadersResponseFilter.ACCESS_CONTROL_ALLOW_HEADERS);
		TestCase.assertTrue(headers.contains("Content-type"));
		TestCase.assertTrue(headers.contains(HttpHeaders.AUTHORIZATION));
		String methods = response.getHeaderString(HeadersResponseFilter.ACCESS_CONTROL_ALLOW_METHODS);
		TestCase.assertEquals(methods, "GET, POST, PUT, DELETE, OPTION");
		String origin = response.getHeaderString(HeadersResponseFilter.ACCESS_CONTROL_ALLOW_ORIGIN);
		TestCase.assertEquals(origin, "*");
	}
}
