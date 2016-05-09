package module.rest.users;

import javax.ws.rs.core.Response;

import org.ap.web.rest.entity.user.UserBean;
import org.ap.web.rest.servlet.users.UsersServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class UsersGetRestTest extends RestTestBase {

	public UsersGetRestTest() {
		super(UsersServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
	
	@Test
	public void testI_getUsers_NotAllowed() throws Exception {
		Response response = prepare("", userAux1.getName(), userAux1.getPassword()).get();
		TestCase.assertEquals(403, response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testI_getUsers_UnknownUser() {
		Response response = prepare("", "dummy", "dummy").get();
		TestCase.assertEquals(401, response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_getUsers() throws Exception {
		UserBean[] users = prepare("", userAdmin.getName(), userAdmin.getPassword()).get(UserBean[].class);
		TestCase.assertEquals(8, users.length);
	}
	@Test
	public void testV_getUsers_response() throws Exception {
		Response rsp = prepare("", userAdmin.getName(), userAdmin.getPassword()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
}
