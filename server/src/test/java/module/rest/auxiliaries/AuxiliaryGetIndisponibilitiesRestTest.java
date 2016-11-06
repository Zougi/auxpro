package module.rest.auxiliaries;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class AuxiliaryGetIndisponibilitiesRestTest extends RestTestBase {

	public AuxiliaryGetIndisponibilitiesRestTest() {
		super(AuxiliariesServlet.PATH);
	}
	
	public String getUrlBase() {
		return "/" + userAuxA.getId() + "/indisponibilities";
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() {
		Response response = prepare(getUrlBase(), "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */

	@Test
	public void testV_checkStatus() throws Exception {
		Response rsp = prepare(getUrlBase(), userAuxA).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_getValid() throws Exception {
		IndisponibilityBean[] rsp = prepare(getUrlBase(), userAuxA).get(IndisponibilityBean[].class);
		TestCase.assertEquals(2, rsp.length);
	}
}
