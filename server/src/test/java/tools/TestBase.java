package tools;

import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.entity.auxiliary.AuxiliaryBean;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.InterventionBean;
import org.ap.web.entity.mongo.OfferBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.entity.mongo.UserBean;
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
	
	protected IndisponibilityBean indisponibility1, indisponibility2, indisponibility3;
	protected UserBean userAdmin, userGuest, userAuxA, userAuxB, userSadY, userSadZ;
	protected AuxiliaryBean auxiliaryA, auxiliaryB;
	protected ServiceBean service1, service2;
	protected CustomerBean customer1, customer2, customer3;
	protected InterventionBean intervention1,interventionz;
	protected OfferBean offer1;
	@Before
	public void setUpTestData() throws Exception {
//		indisponibility1  = TestData.getFromJson("indisponibilities_aux1abs1.json", IndisponibilityBean.class);
//		indisponibility2  = TestData.getFromJson("indisponibilities_aux2abs1.json", IndisponibilityBean.class);
//		indisponibility3  = TestData.getFromJson("indisponibilities_aux2abs2.json", IndisponibilityBean.class);
		auxiliaryA        = TestData.getFromJson("auxiliaries_auxA.json", AuxiliaryBean.class);
//		auxiliary2        = TestData.getFromJson("auxiliaries_aux2.json", AuxiliaryBean.class);
//		customer1         = TestData.getFromJson("customers_cus1.json", CustomerBean.class);
//		customer2         = TestData.getFromJson("customers_cus2.json", CustomerBean.class);
//		customer3         = TestData.getFromJson("customers_cus3.json", CustomerBean.class);
//		service1          = TestData.getFromJson("services_sad1.json", ServiceBean.class);
//		service2          = TestData.getFromJson("services_sad2.json", ServiceBean.class);
//		intervention1     = TestData.getFromJson("interventions_sad1cus1.json", InterventionBean.class);
//		interventionz     = TestData.getFromJson("interventions_sad1cus2.json", InterventionBean.class);
//		offer1            = TestData.getFromJson("offers_sad1cus1aux1.json", OfferBean.class);
		userAdmin         = TestData.getFromJson("users_admin.json", UserBean.class);
		userGuest         = TestData.getFromJson("users_guest.json", UserBean.class);
		userAuxA          = TestData.getFromJson("users_auxa.json", UserBean.class);
		userAuxB          = TestData.getFromJson("users_auxb.json", UserBean.class);
		userSadY          = TestData.getFromJson("users_sady.json", UserBean.class);
		userSadZ          = TestData.getFromJson("users_sadz.json", UserBean.class);
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
