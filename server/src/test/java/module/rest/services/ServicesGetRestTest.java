package module.rest.services;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class ServicesGetRestTest extends RestTestBase {

	public ServicesGetRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() {
		Response response = prepare("", "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asAdmin_checkStatus() throws Exception {
		Response response = prepare("", userAdmin).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		TestCase.assertTrue(response.hasEntity());
	}
	@Test
	public void testV_asAdmin_withFilter() throws Exception {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("postal", 31000);
		ServiceBean[] rsp = prepare("", params, userAdmin).get(ServiceBean[].class);
		TestCase.assertEquals(1, rsp.length);
	}
}
