package module.service.offers;

import java.time.LocalTime;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.internal.APException;
import org.ap.web.service.stores.offers.OffersStore;
import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;
import module.TestModuleBase;
import tools.AssertHelper;
import tools.TestData;

public class OffersStoreTest extends TestModuleBase {

	/* TEST DATA */
	
	private OffersStore store;
	@Before
	public void setUp() {
		store = new OffersStore();
	}
	
	/* TEST CASES */
	
	// Negative Testing //
	
	@Test
	public void testI_getUnkwon() throws APException {
		TestCase.assertNull(store.getOffer(StringConverter.stringToHex("dummy")));
	}
	@Test(expected=APException.class)
	public void testI_updateUnkwon() throws APException {
		store.updateOffer(TestData.next(new OfferBean()));
	}
	@Test(expected=APException.class)
	public void testI_deleteUnkwon() throws APException {
		TestCase.assertNull(store.deleteOffer(StringConverter.stringToHex("dummy")));
	}
	
	// Positive Testing //
	
	@Test
	public void testV_getExisting() throws APException {
		OfferBean offer = store.getOffer(StringConverter.stringToHex("sad1cus1aux1"));
		AssertHelper.assertOffer(offer1, offer);
	}
	@Test
	public void testV_createNew() throws APException {
		OfferBean offer = TestData.next(new OfferBean());
		OfferBean offerCreated = store.createOffer(offer);
		AssertHelper.assertOffer(offer, offerCreated);
		AssertHelper.assertOffer(offer, store.getOffer(offerCreated.getId()));
	}
	@Test
	public void testV_updateExisting() throws APException {
		offer1.setStatus("REJECTED");
		OfferBean offer = store.updateOffer(offer1);
		AssertHelper.assertOffer(offer1, offer);
	}
	@Test
	public void testV_deleteExisting() throws APException {
		OfferBean offer = store.deleteOffer(StringConverter.stringToHex("sad1cus1aux1"));
		AssertHelper.assertOffer(offer1, offer);
		TestCase.assertNull(store.getOffer(StringConverter.stringToHex("sad1cus1aux1")));
	}
	@Test
	public void testV_getByServiceId() throws APException {
		OfferBean[] offers = store.getServiceOffers(service1.getId());
		TestCase.assertEquals(2, offers.length);
	}
	@Test
	public void testV_getByCustomerId() throws APException {
		OfferBean[] offers = store.getCustomerOffers(service1.getId(), customer1.getId());
		TestCase.assertEquals(1, offers.length);
	}
}
