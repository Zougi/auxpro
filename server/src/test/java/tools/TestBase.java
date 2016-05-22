package tools;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.entity.mongo.AccountBean;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.junit.Before;
import org.junit.Rule;
import org.junit.rules.TestName;

public class TestBase {

	/* TEST CONFIG */
	
	public static final boolean DEBUG = true;
	
	/* TEST DATA */
	
	protected AbsenceBean absenceAux11, absenceAux21, absenceAux22;
	protected AccountBean accountAdmin, account_guest;
	protected AuxiliaryBean auxiliary1, auxiliary2;
	protected ServiceBean service1, service_2;
	@Before
	public void setUpTestData() throws Exception {
		absenceAux11 = TestData.getFromJson("absences_aux1abs1.json", AbsenceBean.class);
//		absenceAux11.setId(StringConverter.stringToHex("aux1abs1"));
		absenceAux21 = TestData.getFromJson("absences_aux2abs1.json", AbsenceBean.class);
//		absenceAux21.setId(StringConverter.stringToHex("aux2abs1"));
		absenceAux22 = TestData.getFromJson("absences_aux2abs2.json", AbsenceBean.class);
//		absenceAux22.setId(StringConverter.stringToHex("aux2abs2"));
		accountAdmin = TestData.getFromJson("accounts_admin.json", AccountBean.class);
//		accountAdmin.setId(StringConverter.stringToHex("admin"));
		account_guest = TestData.getFromJson("accounts_guest.json", AccountBean.class);
//		account_guest.setId(StringConverter.stringToHex("guest"));
		auxiliary1 = TestData.getFromJson("auxiliaries_aux1.json", AuxiliaryBean.class);
//		auxiliary1.setId(StringConverter.stringToHex("aux1"));
		auxiliary2 = TestData.getFromJson("auxiliaries_aux2.json", AuxiliaryBean.class);
//		auxiliary2.setId(StringConverter.stringToHex("aux2"));
		service1 = TestData.getFromJson("services_sad1.json", ServiceBean.class);
//		service1.setId(StringConverter.stringToHex("sad1"));
		service_2 = TestData.getFromJson("services_sad2.json", ServiceBean.class);
//		service_2.setId(StringConverter.stringToHex("sad2"));
	}
	
	/* TEST SETUP */
	
	@Rule 
	public TestName _tcName = new TestName();

	@Before
	public void displayName() {
		debugln("");
		debugln("********** STARTING TEST CASE '" + _tcName.getMethodName() + "' **********");
	}
	
	/* TEST HELPERS */
	
	public static void debug(String s) {
		if(DEBUG) System.out.print(s);
	}
	public static void debug(Object o) {
		debug(o.toString());
	}
	public static void debugln(String s) {
		if(DEBUG) System.out.println(s);
	}
	public static void debugln(Object o) {
		debugln(o.toString());
	}
}
