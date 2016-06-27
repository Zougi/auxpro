package tools;

import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.entity.mongo.AccountBean;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.internal.EConfigProperties;
import org.ap.web.service.Mongo;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Rule;
import org.junit.rules.TestName;

public class TestBase {

	/* TEST CONFIG */
	
	public static final boolean DEBUG = true;
	
	/* TEST DATA */
	
	protected AbsenceBean absenceAux11, absenceAux21, absenceAux22;
	protected AccountBean accountAdmin, accountGuest;
	protected AuxiliaryBean auxiliary1, auxiliary2;
	protected ServiceBean service1, service2;
	protected CustomerBean customer1, customer2;
	protected InterventionBean intervention1,interventionz;
	@Before
	public void setUpTestData() throws Exception {
		absenceAux11  = TestData.getFromJson("absences_aux1abs1.json", AbsenceBean.class);
		absenceAux21  = TestData.getFromJson("absences_aux2abs1.json", AbsenceBean.class);
		absenceAux22  = TestData.getFromJson("absences_aux2abs2.json", AbsenceBean.class);
		accountAdmin  = TestData.getFromJson("accounts_admin.json", AccountBean.class);
		accountGuest  = TestData.getFromJson("accounts_guest.json", AccountBean.class);
		auxiliary1    = TestData.getFromJson("auxiliaries_aux1.json", AuxiliaryBean.class);
		auxiliary2    = TestData.getFromJson("auxiliaries_aux2.json", AuxiliaryBean.class);
		customer1     = TestData.getFromJson("customers_cus1.json", CustomerBean.class);
		customer2     = TestData.getFromJson("customers_cus2.json", CustomerBean.class);
		service1      = TestData.getFromJson("services_sad1.json", ServiceBean.class);
		service2      = TestData.getFromJson("services_sad2.json", ServiceBean.class);
		intervention1 = TestData.getFromJson("interventions_sad1cus1.json", InterventionBean.class);
		interventionz = TestData.getFromJson("interventions_sadzcus1.json", InterventionBean.class);
	}
	
	/* TEST SETUP */
	
	@BeforeClass
	public static void setUpDBClient() {
		EConfigProperties.DB_NAME.setValue(TestData.DB_TEST);
		Mongo.reload();
	}
	
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
