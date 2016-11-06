package module.entity;

import org.ap.web.internal.APException;
import org.ap.web.service.stores.auxiliaries.AuxiliariesStore;
import org.ap.web.service.stores.services.ServicesStore;
import org.ap.web.service.stores.user.UserStore;
import org.junit.Before;
import org.junit.Test;

import module.TestModuleBase;
import tools.AssertHelper;

public class BeanConverterTest extends TestModuleBase {

	/* TEST DATA */
	
	private AuxiliariesStore _auxStore;
	private ServicesStore _sadStore;
	private UserStore _userStore;

	@Before
	public void setUpService() {
		_auxStore = new AuxiliariesStore();
		_sadStore = new ServicesStore();
		_userStore = new UserStore();
	}
	
	/* TEST CASES */
	
	@Test
	public void test_checkAuxiliaryConversion() throws APException {
		AssertHelper.assertAuxiliary(auxiliaryA, _auxStore.get(auxiliaryA.getId()));
	}
	@Test
	public void test_checkServiceConversion() throws APException {
		AssertHelper.assertService(service1, _sadStore.get(service1.getId()));
	}
	@Test
	public void test_checkUserConversion() throws APException {
		AssertHelper.assertUser(userAdmin, _userStore.get(userAdmin.getId()));
		AssertHelper.assertUser(userGuest, _userStore.get(userGuest.getId()));
		AssertHelper.assertUser(userAuxA, _userStore.get(userAuxA.getId()));
		AssertHelper.assertUser(userSadZ, _userStore.get(userSadZ.getId()));
	}
}
