package module.rest.offers;

import javax.ws.rs.core.Response;

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

	/* TEST CASES */

	/* Negative Testing */

	@Test
	public void testI_getUnknown() throws Exception {
		Response rsp = prepare("/" + StringConverter.stringToHex("dummy"), service1.getUser()).get();
		TestCase.assertEquals(404, rsp.getStatus());
	}
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response rsp = prepare("/" + offer1.getId(), "dummy", "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_invalidPassword() throws Exception {
		Response rsp = prepare("/" + offer1.getId(), service1.getUser().getName(), "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}

	/* Positive Testing */

	@Test
	public void testV_getResponse() throws Exception {
		Response rsp = prepare("/" + offer1.getId(), service1.getUser()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asSelf() throws Exception {
		OfferBean offer = prepare("/" + offer1.getId(), service1.getUser()).get(OfferBean.class);
		AssertHelper.assertOffer(offer1, offer);
	}
}
