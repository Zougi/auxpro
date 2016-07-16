package module.rest.indisponibilities;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.indisponibilities.IndisponibilitiesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class IndiosponibilityDeleteRestTest extends RestTestBase {

	public IndiosponibilityDeleteRestTest() {
		super(IndisponibilitiesServlet.PATH);
	}
	
	public String getBaseUrl() {
		return "/" + indisponibility1.getId();
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
	public void testI_getUnknown() throws Exception {
		Response response = prepare("/" + StringConverter.stringToHex("dummy"), auxiliary1.getUser()).delete();
		AssertHelper.assertException(APException.INDISPONIBILITY_NOT_FOUND, response);
	}
	@Test
	public void testI_notOwner() throws Exception {
		Response response = prepare(getBaseUrl(), auxiliary2.getUser()).delete();
		AssertHelper.assertException(APException.INDISPONIBILITY_NOT_FOUND, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_deleteValid() throws Exception {
		Response response = prepare(getBaseUrl(), auxiliary1.getUser()).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		
		response = prepare(getBaseUrl(), auxiliary1.getUser()).delete();
		TestCase.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
		
		response = prepare(getBaseUrl(), auxiliary1.getUser()).get();
		TestCase.assertEquals(Status.NOT_FOUND.getStatusCode(), response.getStatus());
	}
}
