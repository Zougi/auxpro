package module.rest.offers;

import javax.ws.rs.core.Response;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.offers.OffersServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestData;

public class OfferPostRestTest extends RestTestBase {

	public OfferPostRestTest() {
		super(OffersServlet.PATH);
	}

	/* TEST CASES */

	/* Negative Testing */
	
	@Test
	public void testI_invalidCustomer() throws Exception {
		OfferBean bean = TestData.next(new OfferBean());
		bean.setServiceId(service1.getId());
		bean.setCustomerId(StringConverter.stringToHex("cuz1"));
		bean.setInterventionId(intervention1.getId());
		Response response = prepare("", service1.getUser()).post(write(bean));
		TestCase.assertEquals(APException.INVALID_REQUEST_DATA.getStatus().getStatusCode(), response.getStatus());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_validOffer() throws Exception {
		OfferBean bean = TestData.next(new OfferBean());
		bean.setServiceId(service1.getId());
		bean.setCustomerId(customer1.getId());
		bean.setInterventionId(intervention1.getId());
		OfferBean response = prepare("", service1.getUser()).post(write(bean), OfferBean.class);
		AssertHelper.assertOffer(bean, response);
	}
	@Test
	public void testV_noService() throws Exception {
		OfferBean bean = TestData.next(new OfferBean());
		bean.setCustomerId(customer1.getId());
		bean.setInterventionId(intervention1.getId());
		OfferBean response = prepare("", service1.getUser()).post(write(bean), OfferBean.class);
		bean.setServiceId(service1.getId());
		AssertHelper.assertOffer(bean, response);
	}
}
