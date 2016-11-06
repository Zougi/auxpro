package module.rest.services;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.UserCredentialsBean;
import org.ap.web.entity.mongo.UserBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestDataGenerator;

public class ServicePostRestTest extends RestTestBase {

	public ServicePostRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST DATA */
	
	private UserCredentialsBean bean;
	private UserCredentialsBean bean2;
	@Before
	public void setUp() {
		bean = TestDataGenerator.getNextCredentials();
		bean2 = TestDataGenerator.getNextCredentials();
	}
	
	/* TEST CASES */
	
	/* Negative Testing */

	@Test
	public void testI_sameName() throws Exception {
		bean2.setName(bean.getName());
		prepare("", userAdmin).post(write(bean));
		Response response = prepare("", userAdmin).post(write(bean2));
		AssertHelper.assertException(APException.USER_NAME_INUSE, response);
	}
	@Test
	public void testI_noName() throws Exception {
		bean.setName(null);
		Response response = prepare("", userAdmin).post(write(bean));
		AssertHelper.assertException(APException.USER_NAME_INVALID, response);
	}
	@Test
	public void testI_invalidName() throws Exception {
		bean.setName("**--//");
		Response response = prepare("", userAdmin).post(write(bean));
		AssertHelper.assertException(APException.USER_NAME_INVALID, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asAdmin() throws Exception {
		UserBean response = prepare("", userAdmin).post(write(bean), UserBean.class);
		TestCase.assertEquals(bean.getName(), response.getName());
	}
	@Test
	public void testV_asGuest() throws Exception {
		Response response = prepare("", userGuest).post(write(bean));
		TestCase.assertEquals(Status.CREATED.getStatusCode(), response.getStatus());
	}
}