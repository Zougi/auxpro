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
import tools.TestData;

public class InterventionPostRestTest extends RestTestBase {

	public InterventionPostRestTest() {
		super(InterventionsServlet.PATH);
	}
	
	/* TEST DATA */
	
	private InterventionBean next() {
		return TestData.next(new InterventionBean()); 
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
		InterventionBean expected = next();
		expected.setServiceId(service2.getId());
		expected.setCustomerId(customer1.getId());
		Response response = prepare(getBaseUrl(), service1.getUser()).post(write(expected));	
		AssertHelper.assertException(APException.INTERVENTION_SERVICE_INVALID, response);
	}
	@Test
	public void testV_notCustomerOwner() throws Exception {
		InterventionBean expected = next();
		expected.setServiceId(service1.getId());
		expected.setCustomerId(customer3.getId());
		Response response = prepare(getBaseUrl(), service1.getUser()).post(write(expected));	
		AssertHelper.assertException(APException.INTERVENTION_CUSTOMER_INVALID, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_postValid() throws Exception {
		InterventionBean expected = next();
		expected.setServiceId(service1.getId());
		expected.setCustomerId(customer1.getId());
		InterventionBean actual = prepare(getBaseUrl(), service1.getUser()).post(write(expected), InterventionBean.class);	
		AssertHelper.assertIntervention(expected, actual);
	}
}
