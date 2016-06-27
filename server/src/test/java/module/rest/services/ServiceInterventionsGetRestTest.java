package module.rest.services;

import javax.ws.rs.core.Response;

import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class ServiceInterventionsGetRestTest extends RestTestBase {

	public ServiceInterventionsGetRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() {
		Response response = prepare("/" + service1.getId() + "/interventions", "dummy", "dummy").get();
		TestCase.assertEquals(401, response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asService_checkStatus() throws Exception {
		Response rsp = prepare("/" + service1.getId() + "/interventions", service1.getUser()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asService() throws Exception {
		InterventionBean[] rsp = prepare("/" + service1.getId() + "/interventions", service1.getUser()).get(InterventionBean[].class);
		TestCase.assertEquals(2, rsp.length);
	}
}
