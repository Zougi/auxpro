package module.rest.offers;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.rest.servlet.offers.OffersServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class OfferDeleteRestTest extends RestTestBase {

	public OfferDeleteRestTest() {
		super(OffersServlet.PATH);
	}

	public String getBaseUrl() {
		return "/" + offer1.getId();
	}
	
	/* TEST CASES */

	/* Negative Testing */
	
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").delete();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testI_deleteUnknown() throws Exception {
		Response response = prepare("/" + StringConverter.stringToHex("dummy"), userSadZ).delete();
		TestCase.assertEquals(Status.NOT_FOUND.getStatusCode(), response.getStatus());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_checkResponse() throws Exception {
		Response response = prepare(getBaseUrl(), userSadZ).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		
		response = prepare(getBaseUrl(), userSadZ).delete();
		TestCase.assertEquals(Status.OK.getStatusCode(), response.getStatus());
		
		response = prepare(getBaseUrl(), userSadZ).get();
		TestCase.assertEquals(Status.NOT_FOUND.getStatusCode(), response.getStatus());
	}
}
