package module.rest.customers;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.customers.CustomersServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestData;

public class CustomerPostRestTest extends RestTestBase {

	public CustomerPostRestTest() {
		super(CustomersServlet.PATH);
	}
	
	/* TEST DATA */
	
	private CustomerBean next() {
		return TestData.next(new CustomerBean()); 
	}
	private String getBaseUrl() {
		return "/";
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_unknownUser() throws Exception {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").post(write(next()));
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testV_notOwner() throws Exception {
		CustomerBean expected = next();
		expected.setServiceId(service2.getId());
		Response response = prepare(getBaseUrl(), service1.getUser()).post(write(expected));	
		AssertHelper.assertException(APException.CUSTOMER_SERVICE_INVALID, response);
	}

	/* Positive Testing */
	
	@Test
	public void testV_postValid() throws Exception {
		CustomerBean expected = next();
		expected.setServiceId(service1.getId());
		CustomerBean actual = prepare(getBaseUrl(), service1.getUser()).post(write(expected), CustomerBean.class);	
		AssertHelper.assertCustomer(expected, actual);
	}
}
