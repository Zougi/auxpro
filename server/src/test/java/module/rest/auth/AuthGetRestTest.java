package module.rest.auth;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.mongo.UserBean;
import org.ap.web.rest.servlet.auth.AuthServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class AuthGetRestTest extends RestTestBase {

	public AuthGetRestTest() {
		super(AuthServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
	
	@Test
	public void testI_getAuth_UnknownUser() {
		Response response = prepare("", "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_getAuth_AdminUser() throws Exception {
		UserBean user = prepare("", userAdmin).get(UserBean.class);
		AssertHelper.assertUser(userAdmin, user);
	}
	@Test
	public void testV_getAuth_GuestUser() throws Exception {
		UserBean user = prepare("", userGuest).get(UserBean.class);
		AssertHelper.assertUser(userGuest, user);
	}
	@Test
	public void testV_getAuth_User() throws Exception {
		UserBean user = prepare("", userAuxA).get(UserBean.class);
		AssertHelper.assertUser(userAuxA, user);
	}
}
