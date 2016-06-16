package module.rest.services;

import javax.ws.rs.core.Response;

import org.ap.web.entity.mongo.CustomerBean;
import org.ap.web.entity.mongo.ServiceBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class ServiceCustomerPutRestTest extends RestTestBase {

	public ServiceCustomerPutRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST DATA */
	
	public String path() {
		return path(service1, customer1);
	}
	public String path(ServiceBean serv, CustomerBean cust) {
		return path(serv.getId(), cust.getId());
	}
	public String path(String servId, String custId) {
		return "/" + servId + "/customers/" + custId;
	}
	
	/* TEST CASES */
	
	/* Negative Testing */

	@Test
	public void testI_notSameUser() throws Exception {
		Response response = prepare(path(), service2.getUser()).put(write(customer1));
		TestCase.assertEquals(403, response.getStatus());
	}
	@Test
	public void testI_invalidName() throws Exception {
		Response response = prepare(path(service1.getId(), "dummy"), service1.getUser()).put(write(customer1));
		TestCase.assertEquals(403, response.getStatus());
	}
	@Test
	public void testI_unknownUser() throws Exception {
		Response response = prepare(path(), "dummy", "dummy").post(write(customer1));
		TestCase.assertEquals(401, response.getStatus());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_update() throws Exception {
		CustomerBean bean = prepare(path(), service1.getUser()).get(CustomerBean.class);
		AssertHelper.assertCustomer(customer1, bean);
		
		customer1.getContact().setEmail("newemail@kiko.com");
		Response response = prepare(path(), service1.getUser()).put(write(customer1));
		TestCase.assertEquals(200, response.getStatus());
		
		bean = prepare(path(), service1.getUser()).get(CustomerBean.class);
		AssertHelper.assertCustomer(customer1, bean);
	}
}
