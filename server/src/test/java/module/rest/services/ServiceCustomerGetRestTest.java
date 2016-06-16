package module.rest.services;

import javax.ws.rs.core.Response;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.rest.servlet.services.ServiceCustomersServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class ServiceCustomerGetRestTest extends RestTestBase {

	public ServiceCustomerGetRestTest() {
		super(ServiceCustomersServlet.PATH);
	}

	/* TEST CASES */

	/* Negative Testing */

	@Test
	public void testI_getUnknownCustomer() throws Exception {
		Response rsp = prepare("/" + service1.getId() + "/customers/" + StringConverter.stringToHex("dummy"), service1.getUser()).get();
		TestCase.assertEquals(404, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response rsp = prepare("/" + service1.getId() + "/customers/" + customer1.getId(), "dummy", "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_invalidPassword() throws Exception {
		Response rsp = prepare("/" + service1.getId() + "/customers/" + customer1.getId(), service1.getUser().getName(), "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_asAux() throws Exception {
		Response rsp = prepare("/" + service1.getId() + "/customers/" + customer1.getId(), auxiliary1.getUser()).get();
		TestCase.assertEquals(403, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	
	/* Positive Testing */

	@Test
	public void testV_getCustomerResponse() throws Exception {
		Response rsp = prepare("/" + service1.getId() + "/customers/" + customer1.getId(), service1.getUser()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asAdmin() throws Exception {
		CustomerBean customer = prepare("/" + service1.getId() + "/customers/" + customer1.getId(), service1.getUser()).get(CustomerBean.class);
		AssertHelper.assertCustomer(customer1, customer);
	}
	@Test
	public void testV_asSelf() throws Exception {
		CustomerBean customer = prepare("/" + service1.getId() + "/customers/" + customer1.getId(), service1.getUser()).get(CustomerBean.class);
		AssertHelper.assertCustomer(customer1, customer);
	}
}
