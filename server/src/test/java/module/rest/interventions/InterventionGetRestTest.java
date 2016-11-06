package module.rest.interventions;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.interventions.InterventionsServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class InterventionGetRestTest extends RestTestBase {

	public InterventionGetRestTest() {
		super(InterventionsServlet.PATH);
	}
	
	/* TEST DATA */
	
	private String getBaseUrl() {
		return "/" + intervention1.getId();
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
		Response response = prepare("/" + StringConverter.stringToHex("dummy"), userSadZ).get();
		AssertHelper.assertException(APException.INTERVENTION_NOT_FOUND, response);
	}
	@Test
	public void testI_notOwner() throws Exception {
		Response response = prepare(getBaseUrl(), userSadY).get();
		AssertHelper.assertException(APException.INTERVENTION_NOT_FOUND, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_checkStatus() throws Exception {
		Response rsp = prepare(getBaseUrl(), userSadZ).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_getValid() throws Exception {
		InterventionBean intervention = prepare(getBaseUrl(), userSadZ).get(InterventionBean.class);
		AssertHelper.assertIntervention(intervention1, intervention);
	}
}
