package module.service.interventions;

import java.time.LocalTime;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.internal.APException;
import org.ap.web.service.stores.interventions.InterventionsStore;
import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;
import module.TestModuleBase;
import tools.AssertHelper;
import tools.TestData;

public class InterventionsStoreTest extends TestModuleBase {

	/* TEST DATA */
	
	private InterventionsStore store;
	@Before
	public void setUp() {
		store = new InterventionsStore();
	}
	
	/* TEST CASES */
	
	// Negative Testing //
	
	@Test
	public void testI_getUnkwon() throws APException {
		TestCase.assertNull(store.getIntervention(StringConverter.stringToHex("dummy")));
	}
	@Test(expected=APException.class)
	public void testI_updateUnkwon() throws APException {
		store.updateIntervention(TestData.next(new InterventionBean()));
	}
	@Test(expected=APException.class)
	public void testI_deleteUnkwon() throws APException {
		TestCase.assertNull(store.deleteIntervention(StringConverter.stringToHex("dummy")));
	}
	
	// Positive Testing //
	
	@Test
	public void testV_getExisting() throws APException {
		InterventionBean intervention = store.getIntervention(StringConverter.stringToHex("sad1cus1"));
		AssertHelper.assertIntervention(intervention1, intervention);
	}
	@Test
	public void testV_createNew() throws APException {
		InterventionBean intervention = TestData.next(new InterventionBean());
		InterventionBean interventionCreated = store.createIntervention(intervention);
		AssertHelper.assertIntervention(intervention, interventionCreated);
		AssertHelper.assertIntervention(intervention, store.getIntervention(interventionCreated.getId()));
	}
	@Test
	public void testV_updateExisting() throws APException {
		intervention1.getOneTime().setEndTime(LocalTime.of(20, 0));
		InterventionBean intervention = store.updateIntervention(intervention1);
		AssertHelper.assertIntervention(intervention1, intervention);
	}
	@Test
	public void testV_deleteExisting() throws APException {
		InterventionBean intervention = store.deleteIntervention(StringConverter.stringToHex("sad1cus1"));
		AssertHelper.assertIntervention(intervention1, intervention);
		TestCase.assertNull(store.getIntervention(StringConverter.stringToHex("sad1cus1")));
	}
	@Test
	public void testV_getByServiceId() throws APException {
		InterventionBean[] interventions = store.getServiceInterventions(service1.getId());
		TestCase.assertEquals(3, interventions.length);
	}
	@Test
	public void testV_getByCustomerId() throws APException {
		InterventionBean[] interventions = store.getCustomerInterventions(service1.getId(), customer1.getId());
		TestCase.assertEquals(2, interventions.length);
	}
}
