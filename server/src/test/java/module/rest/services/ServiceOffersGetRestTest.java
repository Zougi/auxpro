package module.rest.services;

import javax.ws.rs.core.Response;

import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class ServiceOffersGetRestTest extends RestTestBase {

	public ServiceOffersGetRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() {
		Response response = prepare("/" + service1.getId() + "/offers", "dummy", "dummy").get();
		TestCase.assertEquals(401, response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asService_checkStatus() throws Exception {
		Response rsp = prepare("/" + service1.getId() + "/offers", service1.getUser()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asService() throws Exception {
		OfferBean[] rsp = prepare("/" + service1.getId() + "/offers", service1.getUser()).get(OfferBean[].class);
		TestCase.assertEquals(2, rsp.length);
	}
}
