package module.rest.interventions;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.interventions.InterventionsServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestDataGenerator;

public class InterventionPutRestTest extends RestTestBase {

	public InterventionPutRestTest() {
		super(InterventionsServlet.PATH);
	}
	
	/* TEST DATA */
	
	private InterventionBean next() {
		return TestDataGenerator.next(new InterventionBean()); 
	}
	private String getBaseUrl() {
		return "/" + intervention1.getId();
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
		InterventionBean expected = next();
		expected.setServiceId(service2.getId());
		expected.setCustomerId(customer1.getId());
		Response response = prepare(getBaseUrl(), userSadZ).put(write(expected));	
		AssertHelper.assertException(APException.INTERVENTION_SERVICE_INVALID, response);
	}
	@Test
	public void testV_notCustomerOwner() throws Exception {
		InterventionBean expected = next();
		expected.setServiceId(service1.getId());
		expected.setCustomerId(customer3.getId());
		Response response = prepare(getBaseUrl(), userSadZ).put(write(expected));	
		AssertHelper.assertException(APException.INTERVENTION_CUSTOMER_INVALID, response);
	}
	@Test
	public void testI_notSameCustomer() throws Exception {
		InterventionBean expected = next();
		expected.setId(intervention1.getId());
		expected.setServiceId(service1.getId());
		expected.setCustomerId(customer2.getId());
		Response response = prepare(getBaseUrl(), userSadZ).put(write(expected));	
		AssertHelper.assertException(APException.INTERVENTION_CUSTOMER_INVALID, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_putValid() throws Exception {
		InterventionBean expected = next();
		expected.setId(intervention1.getId());
		expected.setServiceId(service1.getId());
		expected.setCustomerId(customer1.getId());
		InterventionBean actual = prepare(getBaseUrl(), userSadZ).put(write(expected), InterventionBean.class);	
		AssertHelper.assertIntervention(expected, actual);
	}
}
