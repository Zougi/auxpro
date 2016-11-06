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
import tools.TestDataGenerator;

public class CustomerPutRestTest extends RestTestBase {

	public CustomerPutRestTest() {
		super(CustomersServlet.PATH);
	}
	
	/* TEST DATA */
	
	private CustomerBean next() {
		return TestDataGenerator.next(new CustomerBean()); 
	}
	private String getBaseUrl() {
		return "/" + customer1.getId();
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").put(write(next()));
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testV_notOwner() throws Exception {
		CustomerBean expected = next();
		expected.setServiceId(service2.getId());
		Response response = prepare(getBaseUrl(), userSadZ).put(write(expected));	
		AssertHelper.assertException(APException.CUSTOMER_NOT_FOUND, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_putValid() throws Exception {
		CustomerBean expected = next();
		expected.setId(customer1.getId());
		expected.setServiceId(service1.getId());
		CustomerBean actual = prepare(getBaseUrl(), userSadZ).put(write(expected), CustomerBean.class);	
		AssertHelper.assertCustomer(expected, actual);
	}
}
