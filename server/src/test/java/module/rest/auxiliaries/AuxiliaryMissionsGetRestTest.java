package module.rest.auxiliaries;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.MissionBean;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class AuxiliaryMissionsGetRestTest extends RestTestBase {

	public AuxiliaryMissionsGetRestTest() {
		super(AuxiliariesServlet.PATH);
	}
 
	/* TEST CASES */

	/* Negative Testing */

	// users/{userId} GET
	@Test
	public void testI_getUnknownAuxiliairy() throws Exception {
		Response rsp = prepare("/" + StringConverter.stringToHex("dummy") + "/missions", accountAdmin.getUser()).get();
		TestCase.assertEquals(Status.NOT_FOUND.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response rsp = prepare("/" + auxiliary1.getId() + "/missions", "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_invalidPassword() throws Exception {
		Response rsp = prepare("/" + auxiliary1.getId() + "/missions", auxiliary1.getUser().getName(), "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testV_asOtherUser() throws Exception {
		Response rsp  = prepare("/" + auxiliary1.getId() + "/missions", auxiliary2.getUser()).get();
		TestCase.assertEquals(Status.FORBIDDEN.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}

	/* Positive Testing */

	// users/{userId} GET
	@Test
	public void testV_getResponse() throws Exception {
		Response rsp = prepare("/" + auxiliary1.getId() + "/missions", auxiliary1.getUser()).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asAdmin() throws Exception {
		MissionBean[] missions = prepare("/" + auxiliary1.getId() + "/missions", accountAdmin.getUser()).get(MissionBean[].class);
		TestCase.assertEquals(1, missions.length);
	}
	@Test
	public void testV_asSelf() throws Exception {
		MissionBean[] missions = prepare("/" + auxiliary1.getId() + "/missions", auxiliary1.getUser()).get(MissionBean[].class);
		TestCase.assertEquals(1, missions.length);
	}
	
}
