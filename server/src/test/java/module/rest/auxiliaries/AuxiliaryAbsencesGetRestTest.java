package module.rest.auxiliaries;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class AuxiliaryAbsencesGetRestTest extends RestTestBase {

	private static final String ABSENCES = "/absences";
	
	public AuxiliaryAbsencesGetRestTest() {
		super(AuxiliariesServlet.PATH);
	}
 
	/* TEST CASES */

	/* Negative Testing */

	// users/{userId} GET
	@Test
	public void testI_getUnknownAuxiliairy() throws Exception {
		Response rsp = prepare("/" + StringConverter.stringToHex("dummy") + ABSENCES, accountAdmin.getUser()).get();
		TestCase.assertEquals(Status.NOT_FOUND.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response rsp = prepare("/" + auxiliary1.getId() + ABSENCES, "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_invalidPassword() throws Exception {
		Response rsp = prepare("/" + auxiliary1.getId() + ABSENCES, auxiliary1.getUser().getName(), "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testV_asOtherUser() throws Exception {
		Response rsp  = prepare("/" + auxiliary1.getId() + ABSENCES, auxiliary2.getUser()).get();
		TestCase.assertEquals(Status.FORBIDDEN.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}

	/* Positive Testing */

	// users/{userId} GET
	@Test
	public void testV_getResponse() throws Exception {
		Response rsp = prepare("/" + auxiliary1.getId() + ABSENCES, auxiliary1.getUser()).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asAdmin() throws Exception {
		AbsenceBean[] beans = prepare("/" + auxiliary1.getId() + ABSENCES, accountAdmin.getUser()).get(AbsenceBean[].class);
		TestCase.assertEquals(1, beans.length);
	}
	@Test
	public void testV_asSelf() throws Exception {
		AbsenceBean[] beans = prepare("/" + auxiliary1.getId() + ABSENCES, auxiliary1.getUser()).get(AbsenceBean[].class);
		TestCase.assertEquals(1, beans.length);
	}
	
}
