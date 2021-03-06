package module.rest.interventions;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.interventions.InterventionsServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class InterventionDeleteRestTest extends RestTestBase {

	public InterventionDeleteRestTest() {
		super(InterventionsServlet.PATH);
	}
	
	public String getBaseUrl() {
		return "/" + intervention1.getId();
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_invalidUser() throws Exception {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").delete();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testI_unknown() throws Exception {
		Response response = prepare("/" + StringConverter.stringToHex("dummy"), userSadZ).delete();
		AssertHelper.assertException(APException.INTERVENTION_NOT_FOUND, response);
	}
	@Test
	public void testI_notOwner() throws Exception {
		Response response = prepare(getBaseUrl(), userSadY).delete();
		AssertHelper.assertException(APException.INTERVENTION_NOT_FOUND, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_deleteValid() throws Exception {
		Response response = prepare(getBaseUrl(), userSadZ).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		
		response = prepare(getBaseUrl(), userSadZ).delete();
		TestCase.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
		
		response = prepare(getBaseUrl(), userSadZ).get();
		AssertHelper.assertException(APException.INTERVENTION_NOT_FOUND, response);
	}
}
