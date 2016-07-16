package module.rest.offers;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.constant.EOfferStatus;
import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.rest.servlet.offers.OffersServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class OfferPutRestTest extends RestTestBase {

	public OfferPutRestTest() {
		super(OffersServlet.PATH);
	}
	
	public String getBaseUrl() {
		return "/" + offer1.getId();
	}

	/* TEST CASES */

	/* Negative Testing */

	@Test
	public void testI_notOwner() throws Exception {
		Response response = prepare(getBaseUrl(), service2.getUser()).put(write(offer1));
		TestCase.assertEquals(Status.FORBIDDEN.getStatusCode(), response.getStatus());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_update() throws Exception {
		offer1.setStatus(EOfferStatus.ACCEPTED.getId());
		OfferBean offer = prepare(getBaseUrl(), service1.getUser()).put(write(offer1), OfferBean.class);
		AssertHelper.assertOffer(offer1, offer);
	}}
