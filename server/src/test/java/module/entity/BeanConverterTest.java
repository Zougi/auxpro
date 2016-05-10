package module.entity;

import org.ap.web.entity.BeanConverter;
import org.ap.web.entity.user.AuxiliaryBean;
import org.ap.web.entity.user.ServiceBean;
import org.ap.web.entity.user.UserBean;
import org.ap.web.internal.APException;
import org.ap.web.service.users.UsersMongoService;
import org.bson.Document;
import org.junit.Before;
import org.junit.Test;

import module.TestModuleBase;
import tools.AssertHelper;

public class BeanConverterTest extends TestModuleBase {

	/* TEST DATA */
	
	private UsersMongoService _svc;
	@Before
	public void setUpService() {
		_svc = new UsersMongoService();
	}
	
	/* TEST CASES */
	
	@Test
	public void test_checkUserConversion() throws APException {
		Document doc = _svc.getUserByName(userAdmin.getName());
		UserBean bean = BeanConverter.convertToUser(doc);
		AssertHelper.assertUser(userAdmin, bean);
	}
	@Test
	public void test_checkAuxiliaryConversion() throws APException {
		Document doc = _svc.getUserByName(userAux1.getName());
		AuxiliaryBean bean = BeanConverter.convertToAuxiliary(doc);
		AssertHelper.assertAuxiliary(userAux1, bean);
	}
	@Test
	public void test_checkAuxiliaryNoAddressConversion() throws APException {
		userAux1.setAddress(null);
		_svc.updateUser(BeanConverter.convertToDocument(userAux1));
		Document doc = _svc.getUserByName(userAux1.getName());
		AuxiliaryBean bean = BeanConverter.convertToAuxiliary(doc);
		AssertHelper.assertAuxiliary(userAux1, bean);
	}
	@Test
	public void test_checkSocietyConversion() throws APException {
		Document doc = _svc.getUserByName(userSad1.getName());
		ServiceBean bean = BeanConverter.convertToService(doc);
		AssertHelper.assertService(userSad1, bean);
	}
}
