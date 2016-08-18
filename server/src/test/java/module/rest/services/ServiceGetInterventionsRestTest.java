package module.rest.services;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class ServiceGetInterventionsRestTest extends RestTestBase {

	public ServiceGetInterventionsRestTest() {
		super(ServicesServlet.PATH);
	}
	
	public String getUrlBase() {
		return "/" + service1.getId() + "/interventions";
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() {
		Response response = prepare(getUrlBase(), "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asService_checkStatus() throws Exception {
		Response rsp = prepare(getUrlBase(), service1.getUser()).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asService() throws Exception {
		InterventionBean[] rsp = prepare(getUrlBase(), service1.getUser()).get(InterventionBean[].class);
		TestCase.assertEquals(3, rsp.length);
	}
}