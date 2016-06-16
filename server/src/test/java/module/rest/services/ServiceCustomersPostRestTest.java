package module.rest.services;

import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestData;

public class ServiceCustomersPostRestTest extends RestTestBase {

	public ServiceCustomersPostRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST DATA */
	
	private CustomerBean bean;
	@Before
	public void setUp() {
		bean = TestData.next(new CustomerBean());
	}
	
	/* TEST CASES */
	
	/* Negative Testing */

	/* Positive Testing */
	
	@Test
	public void testV_asService() throws Exception {
		int before = prepare("/" + service1.getId() + "/customers", service1.getUser()).get(CustomerBean[].class).length;
		CustomerBean response = prepare("/" + service1.getId() + "/customers", service1.getUser()).post(write(bean), CustomerBean.class);
		AssertHelper.assertCustomer(bean, response);
		int after = prepare("/" + service1.getId() + "/customers", service1.getUser()).get(CustomerBean[].class).length;
		TestCase.assertEquals(before + 1, after);
	}
}
