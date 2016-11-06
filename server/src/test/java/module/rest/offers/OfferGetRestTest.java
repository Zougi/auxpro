package module.rest.offers;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.rest.servlet.offers.OffersServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class OfferGetRestTest extends RestTestBase {

	public OfferGetRestTest() {
		super(OffersServlet.PATH);
	}

	public String getBaseUrl() {
		return "/" + offer1.getId();
	}
	
	/* TEST CASES */

	/* Negative Testing */

	@Test
	public void testI_getUnknown() throws Exception {
		Response rsp = prepare("/" + StringConverter.stringToHex("dummy"), userSadZ).get();
		TestCase.assertEquals(Status.NOT_FOUND.getStatusCode(), rsp.getStatus());
	}
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response rsp = prepare(getBaseUrl(), "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_invalidPassword() throws Exception {
		Response rsp = prepare(getBaseUrl(), userSadZ.getName(), "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}

	/* Positive Testing */

	@Test
	public void testV_getResponse() throws Exception {
		Response rsp = prepare(getBaseUrl(), userSadZ).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asSelf() throws Exception {
		OfferBean offer = prepare(getBaseUrl(), userSadZ).get(OfferBean.class);
		AssertHelper.assertOffer(offer1, offer);
	}
}
