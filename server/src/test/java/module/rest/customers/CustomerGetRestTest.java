package module.rest.customers;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.customers.CustomersServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class CustomerGetRestTest extends RestTestBase {

	public CustomerGetRestTest() {
		super(CustomersServlet.PATH);
	}
	
	/* TEST DATA */
	
	private String getBaseUrl() {
		return "/" + customer1.getId();
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testI_unknown() throws Exception {
		Response response = prepare("/" + StringConverter.stringToHex("dummy"), service1.getUser()).get();
		AssertHelper.assertException(APException.CUSTOMER_NOT_FOUND, response);
	}
	@Test
	public void testI_notOwner() throws Exception {
		Response response = prepare(getBaseUrl(), service2.getUser()).get();
		AssertHelper.assertException(APException.CUSTOMER_NOT_FOUND, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_checkStatus() throws Exception {
		Response rsp = prepare(getBaseUrl(), service1.getUser()).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_getValid() throws Exception {
		CustomerBean customer = prepare(getBaseUrl(), service1.getUser()).get(CustomerBean.class);
		AssertHelper.assertCustomer(customer1, customer);
	}
}
