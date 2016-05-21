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
		AssertHelper.assertAuxiliary(auxiliary1, _auxStore.get(auxiliary1.getId()));
	}
	@Test
	public void test_checkServiceConversion() throws APException {
		AssertHelper.assertService(service_1, _sadStore.get(service_1.getId()));
	}
	@Test
	public void test_checkUserConversion() throws APException {
		AssertHelper.assertUser(accountAdmin.getUser(), _userStore.get(accountAdmin.getId()));
		AssertHelper.assertUser(account_guest.getUser(), _userStore.get(account_guest.getId()));
		AssertHelper.assertUser(auxiliary1.getUser(), _userStore.get(auxiliary1.getId()));
		AssertHelper.assertUser(service_1.getUser(), _userStore.get(service_1.getId()));	}
	
}
