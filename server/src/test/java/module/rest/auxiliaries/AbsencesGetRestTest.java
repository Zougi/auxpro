package module.rest.auxiliaries;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.AbsenceBean;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class AbsencesGetRestTest extends RestTestBase {
	
	public String getUrl(String id) {
		return "/" + id + "/absences";
	}
	
	public AbsencesGetRestTest() {
		super(AuxiliariesServlet.PATH);
	}
 
	/* TEST CASES */

	/* Negative Testing */

	@Test
	public void testI_getUnknownAuxiliairy() throws Exception {
		Response rsp = prepare(getUrl(StringConverter.stringToHex("dummy")), accountAdmin.getUser()).get();
		TestCase.assertEquals(Status.NOT_FOUND.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_asUnknownUser() throws Exception {
		Response rsp = prepare(getUrl(auxiliary1.getId()), "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_invalidPassword() throws Exception {
		Response rsp = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser().getName(), "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testV_asOtherUser() throws Exception {
		Response rsp  = prepare(getUrl(auxiliary1.getId()), auxiliary2.getUser()).get();
		TestCase.assertEquals(Status.FORBIDDEN.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}

	/* Positive Testing */

	@Test
	public void testV_getResponse() throws Exception {
		Response rsp = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser()).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asAdmin() throws Exception {
		AbsenceBean[] beans = prepare(getUrl(auxiliary1.getId()), accountAdmin.getUser()).get(AbsenceBean[].class);
		TestCase.assertEquals(1, beans.length);
		AssertHelper.assertAbsence(absenceAux11, beans[0]);
	}
	@Test
	public void testV_asSelf() throws Exception {
		AbsenceBean[] beans = prepare(getUrl(auxiliary1.getId()), auxiliary1.getUser()).get(AbsenceBean[].class);
		TestCase.assertEquals(1, beans.length);
		AssertHelper.assertAbsence(absenceAux11, beans[0]);
	}
	@Test
	public void testV_asSelfSeveral() throws Exception {
		AbsenceBean[] beans = prepare(getUrl(auxiliary2.getId()), auxiliary2.getUser()).get(AbsenceBean[].class);
		TestCase.assertEquals(2, beans.length);
	}
}
