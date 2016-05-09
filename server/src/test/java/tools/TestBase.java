package tools;

import org.ap.web.rest.entity.user.AuxiliaryBean;
import org.ap.web.rest.entity.user.ServiceBean;
import org.ap.web.rest.entity.user.UserBean;
import org.junit.Before;
import org.junit.Rule;
import org.junit.rules.TestName;

public class TestBase {

	/* TEST CONFIG */
	
	public static final boolean DEBUG = true;
	
	/* TEST DATA */
	
	protected UserBean userAdmin;
	protected UserBean userGuest;
	protected AuxiliaryBean userAux1;
	protected ServiceBean userSad1;
	@Before
	public void setUpTestData() throws Exception {
		userAdmin = TestData.getUserFromJson("users_admin.json");
		userGuest = TestData.getUserFromJson("users_guest.json");
		userAux1 = TestData.getAuxiliaryFromJson("users_aux1.json");
		userSad1 = TestData.getServiceFromJson("users_sad1.json");
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
