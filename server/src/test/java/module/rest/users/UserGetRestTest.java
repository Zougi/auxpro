package module.rest.users;

import javax.ws.rs.core.Response;

import org.ap.web.rest.entity.user.UserBean;
import org.ap.web.rest.servlet.users.UsersServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class UserGetRestTest extends RestTestBase {

	public UserGetRestTest() {
		super(UsersServlet.PATH);
	}

	/* TEST CASES */

	/* Negative Testing */

	// users/{userId} GET
	@Test
	public void testI_getUser_getUnknownUser() throws Exception {
		Response rsp = prepare("/dummy", userAdmin.getName(), userAdmin.getPassword()).get();
		TestCase.assertEquals(404, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testI_getUser_asUnknownUser() throws Exception {
		Response rsp = prepare("/" + userAux1.getName(), "dummy", "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_getUser_invalidPassword() throws Exception {
		Response rsp = prepare("/" + userAux1.getName(), userAux1.getName(), "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}

	/* Positive Testing */

	// users/{userId} GET
	@Test
	public void testV_getUserResponse() throws Exception {
		Response rsp = prepare("/" + userAux1.getName(), userAdmin.getName(), userAdmin.getPassword()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_getUserObject_AsAdmin() throws Exception {
		UserBean user = prepare("/" + userAux1.getName(), userAdmin.getName(), userAdmin.getPassword()).get(UserBean.class);
		AssertHelper.assertUser(userAux1, user);
	}
	@Test
	public void testV_getUserObject_AsSelf() throws Exception {
		UserBean user = prepare("/" + userAux1.getName(), userAux1.getName(), userAux1.getPassword()).get(UserBean.class);
		AssertHelper.assertUser(userAux1, user);
	}
	@Test
	public void testV_getUserObject_AsOther() throws Exception {
		UserBean user = prepare("/" + userAux1.getName(), userSad1.getName(), userSad1.getPassword()).get(UserBean.class);
		// Informations are private
		userAux1.setName(null);
		userAux1.setPassword(null);
		userAux1.setEmail(null);
		userAux1.setActive(false);
		userAux1.setTutoSkipped(false);
		AssertHelper.assertUser(userAux1, user);
	}
}
