package module.service.auxiliaries;

import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.GeoZoneBean;
import org.ap.web.internal.APException;
import org.ap.web.service.stores.auxiliaries.AuxiliariesStore;
import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;
import module.TestModuleBase;
import tools.AssertHelper;
import tools.TestData;

public class AuxiliariesStoreTest extends TestModuleBase {

	/* TEST DATA */
	
	private AuxiliariesStore store;
	@Before
	public void setUp() {
		store = new AuxiliariesStore();
	}
	
	/* TEST CASES */
	
	// Negative Testing //
	
	
	// Positive Testing //
	
	@Test
	public void testV_getAuxiliaries() throws APException {
		AuxiliaryBean[] auxiliaries = store.get();
		TestCase.assertEquals(3, auxiliaries.length);
	}
	@Test
	public void testV_getAuxiliary() throws APException {
		AuxiliaryBean auxiliary = store.get(auxiliary1.getId());
		AssertHelper.assertAuxiliary(auxiliary1, auxiliary);
	}
	@Test
	public void testV_pushGeoZone() throws APException {
		AuxiliaryBean auxiliary = store.createGeoZone(auxiliary1.getId(), TestData.next(new GeoZoneBean()));
		TestCase.assertEquals(auxiliary1.getGeoZones().length + 1, auxiliary.getGeoZones().length);
	}
}
