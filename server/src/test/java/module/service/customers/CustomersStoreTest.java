package module.service.customers;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.ContactBean;
import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.internal.APException;
import org.ap.web.service.stores.customers.CustomersStore;
import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;
import module.TestModuleBase;
import tools.AssertHelper;

public class CustomersStoreTest extends TestModuleBase {

	/* TEST DATA */
	
	private CustomersStore store;
	@Before
	public void setUp() {
		store = new CustomersStore();
	}

	public CustomerBean getTestCustomer() {
		CustomerBean customer = new CustomerBean();
		ContactBean contact = new ContactBean();
		contact.setEmail("dummy@kiko.com");
		contact.setPhone("0102030405");
		customer.setContact(contact);
		customer.setId(StringConverter.stringToHex("dummy"));
		return customer;
	}
	
	/* TEST CASES */
	
	// Negative Testing //
	
	@Test
	public void testI_getUnkwon() throws APException {
		TestCase.assertNull(store.getCustomer(StringConverter.stringToHex("dummy")));
	}
	@Test(expected=APException.class)
	public void testI_updateUnkwon() throws APException {
		store.updateCustomer(getTestCustomer());
	}
	@Test(expected=APException.class)
	public void testI_deleteUnkwon() throws APException {
		TestCase.assertNull(store.deleteCustomer(StringConverter.stringToHex("dummy")));
	}
	
	// Positive Testing //
	
	@Test
	public void testV_getExisting() throws APException {
		CustomerBean customer = store.getCustomer(StringConverter.stringToHex("cus1"));
		AssertHelper.assertCustomer(customer1, customer);
	}
	@Test
	public void testV_createNew() throws APException {
		CustomerBean customer = getTestCustomer();
		CustomerBean customerCreated = store.createCustomer(customer);
		AssertHelper.assertCustomer(customer, customerCreated);
		AssertHelper.assertCustomer(customer, store.getCustomer(customer.getId()));
	}
	@Test
	public void testV_updateExisting() throws APException {
		customer1.getPerson().setFirstName("dummy");
		CustomerBean customer = store.updateCustomer(customer1);
		AssertHelper.assertCustomer(customer1, customer);
	}
	@Test
	public void testV_deleteExisting() throws APException {
		CustomerBean customer = store.deleteCustomer(StringConverter.stringToHex("cus1"));
		AssertHelper.assertCustomer(customer1, customer);
		TestCase.assertNull(store.getCustomer(StringConverter.stringToHex("cus1")));
	}
}
