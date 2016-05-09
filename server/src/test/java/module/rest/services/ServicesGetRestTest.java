package module.rest.services;

import javax.ws.rs.core.Response;

import org.ap.web.rest.entity.user.UserBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.TestData;

public class ServicesGetRestTest extends RestTestBase {

	public ServicesGetRestTest() {
		super(ServicesServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() {
		Response response = prepare("", "dummy", "dummy").get();
		TestCase.assertEquals(401, response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asAdmin_checkStatus() throws Exception {
		UserBean userAdmin = TestData.getUserFromJson("users_admin.json");
		Response rsp = prepare("", userAdmin.getName(), userAdmin.getPassword()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
}
