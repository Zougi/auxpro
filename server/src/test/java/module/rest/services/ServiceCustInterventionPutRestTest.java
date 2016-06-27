package module.rest.services;

import java.time.LocalDate;

import javax.ws.rs.core.Response;

import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class ServiceCustInterventionPutRestTest extends RestTestBase {

	public ServiceCustInterventionPutRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST DATA */
	
	private InterventionBean getUpdated() {
		intervention1.getOneTime().setDate(LocalDate.now());
		return intervention1; 
	}
	private String getBaseUrl() {
		return "/" + service1.getId() + "/customers/" + customer1.getId() + "/interventions/" + intervention1.getId();
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").put(write(getUpdated()));
		TestCase.assertEquals(401, response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asService_checkStatus() throws Exception {
		InterventionBean intervention = prepare(getBaseUrl(), service1.getUser()).put(write(getUpdated()), InterventionBean.class);
		AssertHelper.assertIntervention(getUpdated(), intervention);
	}
}
