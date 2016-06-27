package module.rest.services;

import java.time.LocalDate;

import javax.ws.rs.core.Response;

import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestData;

public class ServiceCustInterventionPostRestTest extends RestTestBase {

	public ServiceCustInterventionPostRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST DATA */
	
	private InterventionBean getUpdated() {
		intervention1.getOneTime().setDate(LocalDate.now());
		return intervention1; 
	}
	private String getBaseUrl() {
		return "/" + service1.getId() + "/customers/" + customer1.getId() + "/interventions";
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").post(write(getUpdated()));
		TestCase.assertEquals(401, response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asService_checkStatus() throws Exception {
		InterventionBean expected = TestData.next(new InterventionBean());
		InterventionBean actual = prepare(getBaseUrl(), service1.getUser()).post(write(expected), InterventionBean.class);
		
		AssertHelper.assertIntervention(expected, actual);
	}
}
