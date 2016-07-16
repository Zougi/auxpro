package module.service.indisponibilities;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.internal.APException;
import org.ap.web.service.stores.indisponibilities.IndisponibilitiesStore;
import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;
import module.TestModuleBase;
import tools.AssertHelper;
import tools.TestData;

public class IndisponibilitiesStoreTest extends TestModuleBase {

	/* TEST DATA */
	
	private IndisponibilitiesStore store;
	@Before
	public void setUp() {
		store = new IndisponibilitiesStore();
	}
	
	/* TEST CASES */
	
	// Negative Testing //
	
	@Test(expected=APException.class)
	public void testI_deleteUnkwon() throws APException {
		TestCase.assertNull(store.deleteIndisponibility(StringConverter.stringToHex("dummy")));
	}
	
	// Positive Testing //
	
	@Test
	public void testV_getUnkwon() throws APException {
		IndisponibilityBean[] absences = store.getAuxIndisponibilities(StringConverter.stringToHex("dummy"));
		TestCase.assertEquals(0, absences.length);
	}
	@Test
	public void testV_getExisting() throws APException {
		IndisponibilityBean[] absences = store.getAuxIndisponibilities(StringConverter.stringToHex("aux1"));
		TestCase.assertEquals(2, absences.length);
		absences = store.getAuxIndisponibilities(StringConverter.stringToHex("aux2"));
		TestCase.assertEquals(2, absences.length);
	}
	@Test
	public void testV_createNew() throws APException {
		IndisponibilityBean absence = TestData.next(new IndisponibilityBean());
		IndisponibilityBean absenceCreated = store.createIndisponibility(absence);
		AssertHelper.assertIndisponibility(absence, absenceCreated);
	}
	@Test
	public void testV_createSeveral() throws APException {
		IndisponibilityBean absence = TestData.next(new IndisponibilityBean());
		store.createIndisponibility(absence);
		absence = TestData.next(new IndisponibilityBean());
		store.createIndisponibility(absence);
		IndisponibilityBean[] absences = store.getAuxIndisponibilities(StringConverter.stringToHex(String.valueOf(TestData.AUXILIARY_ID)));
		TestCase.assertEquals(2, absences.length);
	}
	@Test
	public void testV_deleteExisting() throws APException {
		IndisponibilityBean absence = store.deleteIndisponibility(StringConverter.stringToHex("aux1abs1"));
		AssertHelper.assertIndisponibility(indisponibility1, absence);

	}
}
