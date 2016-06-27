package module.service.absences;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.internal.APException;
import org.ap.web.service.stores.absences.AbsencesStore;
import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;
import module.TestModuleBase;
import tools.AssertHelper;
import tools.TestData;

public class AbsencesStoreTest extends TestModuleBase {

	/* TEST DATA */
	
	private AbsencesStore store;
	@Before
	public void setUp() {
		store = new AbsencesStore();
	}
	
	/* TEST CASES */
	
	// Negative Testing //
	
	@Test(expected=APException.class)
	public void testI_deleteUnkwon() throws APException {
		TestCase.assertNull(store.deleteAbsence(StringConverter.stringToHex("dummy")));
	}
	
	// Positive Testing //
	
	@Test
	public void testV_getUnkwon() throws APException {
		AbsenceBean[] absences = store.getAuxAbsences(StringConverter.stringToHex("dummy"));
		TestCase.assertEquals(0, absences.length);
	}
	@Test
	public void testV_getExisting() throws APException {
		AbsenceBean[] absences = store.getAuxAbsences(StringConverter.stringToHex("aux1"));
		TestCase.assertEquals(1, absences.length);
		absences = store.getAuxAbsences(StringConverter.stringToHex("aux2"));
		TestCase.assertEquals(2, absences.length);
	}
	@Test
	public void testV_createNew() throws APException {
		AbsenceBean absence = TestData.next(new AbsenceBean());
		AbsenceBean absenceCreated = store.createAbsence(absence);
		AssertHelper.assertAbsence(absence, absenceCreated);
	}
	@Test
	public void testV_createSeveral() throws APException {
		AbsenceBean absence = TestData.next(new AbsenceBean());
		store.createAbsence(absence);
		absence = TestData.next(new AbsenceBean());
		store.createAbsence(absence);
		AbsenceBean[] absences = store.getAuxAbsences(StringConverter.stringToHex(String.valueOf(TestData.AUXILIARY_ID)));
		TestCase.assertEquals(2, absences.length);
	}
	@Test
	public void testV_deleteExisting() throws APException {
		AbsenceBean absence = store.deleteAbsence(StringConverter.stringToHex("aux1abs1"));
		AssertHelper.assertAbsence(absenceAux11, absence);

	}
}
