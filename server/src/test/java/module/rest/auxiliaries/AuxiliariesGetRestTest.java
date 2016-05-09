package module.rest.auxiliaries;

import javax.ws.rs.core.Response;

import org.ap.web.rest.entity.user.AuxiliaryBean;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class AuxiliariesGetRestTest extends RestTestBase {

	public AuxiliariesGetRestTest() {
		super(AuxiliariesServlet.PATH);
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_getUsers_UnknownUser() {
		Response response = prepare("", "dummy", "dummy").get();
		TestCase.assertEquals(401, response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asAdmin() throws Exception {
		AuxiliaryBean[] beans = prepare("", userAdmin.getName(), userAdmin.getPassword()).get(AuxiliaryBean[].class);
		TestCase.assertEquals(3, beans.length);
	}
	@Test
	public void testV_asGuest() throws Exception {
		Response rsp = prepare("", userGuest.getName(), userGuest.getPassword()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asAdmin_responseStatus() throws Exception {
		Response rsp = prepare("", userAdmin.getName(), userAdmin.getPassword()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
}
