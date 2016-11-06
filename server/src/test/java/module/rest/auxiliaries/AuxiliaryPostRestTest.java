package module.rest.auxiliaries;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.UserBean;
import org.ap.web.entity.mongo.UserCredentialsBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Before;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;
import tools.TestDataGenerator;

public class AuxiliaryPostRestTest extends RestTestBase {

	public AuxiliaryPostRestTest() {
		super(AuxiliariesServlet.PATH);
	}
	
	/* TEST DATA */
	
	private UserCredentialsBean bean;
	private UserCredentialsBean bean2;
	@Before
	public void setUp() {
		bean = TestDataGenerator.next(new UserCredentialsBean());
		bean2 = TestDataGenerator.next(new UserCredentialsBean());
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
	public void testV_getResponse() throws Exception {
		String response = prepare("", userAdmin).post(write(bean), String.class);
		System.out.println(response);
		TestCase.assertNotNull(response);		
	}
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
