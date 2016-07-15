package module.rest.offers;

import javax.ws.rs.core.Response;

import org.ap.web.common.string.StringConverter;
import org.ap.web.rest.servlet.offers.OffersServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class OfferDeleteRestTest extends RestTestBase {

	public OfferDeleteRestTest() {
		super(OffersServlet.PATH);
	}

	/* TEST CASES */

	/* Negative Testing */
	
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response response = prepare("/" + offer1.getId(), "dummy", "dummy").delete();
		TestCase.assertEquals(401, response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testI_deleteUnknown() throws Exception {
		Response response = prepare("/" + StringConverter.stringToHex("dummy"), service1.getUser()).delete();
		TestCase.assertEquals(404, response.getStatus());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_checkResponse() throws Exception {
		Response response = prepare("/" + offer1.getId(), service1.getUser()).get();
		TestCase.assertEquals(200, response.getStatus());
		
		response = prepare("/" + offer1.getId(), service1.getUser()).delete();
		TestCase.assertEquals(200, response.getStatus());
		
		response = prepare("/" + offer1.getId(), service1.getUser()).get();
		TestCase.assertEquals(404, response.getStatus());
	}
}
