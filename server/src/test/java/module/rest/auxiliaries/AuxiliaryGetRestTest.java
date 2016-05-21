package module.rest.auxiliaries;

import javax.ws.rs.core.Response;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class AuxiliaryGetRestTest extends RestTestBase {

	public AuxiliaryGetRestTest() {
		super(AuxiliariesServlet.PATH);
	}
 
	/* TEST CASES */

	/* Negative Testing */

	// users/{userId} GET
	@Test
	public void testI_getUser_getUnknownAuxiliairy() throws Exception {
		Response rsp = prepare("/" + StringConverter.stringToHex("dummy"), accountAdmin.getUser()).get();
		TestCase.assertEquals(404, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_getUser_asUnknownUser() throws Exception {
		Response rsp = prepare("/" + auxiliary1.getId(), "dummy", "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_getUser_invalidPassword() throws Exception {
		Response rsp = prepare("/" + auxiliary1.getId(), auxiliary1.getUser().getName(), "dummy").get();
		TestCase.assertEquals(401, rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}

	/* Positive Testing */

	// users/{userId} GET
	@Test
	public void testV_getAuxiliaryResponse() throws Exception {
		Response rsp = prepare("/" + auxiliary1.getId(), auxiliary1.getUser()).get();
		TestCase.assertEquals(200, rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_getAuxiliaryObject_AsAdmin() throws Exception {
		AuxiliaryBean userAux = prepare("/" + auxiliary1.getId(), accountAdmin.getUser()).get(AuxiliaryBean.class);
		AssertHelper.assertAuxiliary(auxiliary1, userAux);
	}
	@Test
	public void testV_getAuxiliaryObject_AsSelf() throws Exception {
		AuxiliaryBean userAux = prepare("/" + auxiliary1.getId(), auxiliary1.getUser()).get(AuxiliaryBean.class);
		AssertHelper.assertAuxiliary(auxiliary1, userAux);
	}
	@Test
	public void testV_getAuxiliaryObject_AsOther() throws Exception {
		AuxiliaryBean userAux = prepare("/" + auxiliary1.getId(), auxiliary2.getUser()).get(AuxiliaryBean.class);
		// Informations are private
		auxiliary1.getUser().setName(null);
		auxiliary1.getUser().setPassword(null);
		auxiliary1.getUser().setEmail(null);
		auxiliary1.getUser().setActive(false);
		auxiliary1.getUser().setTutoSkipped(false);
		AssertHelper.assertAuxiliary(auxiliary1, userAux);
	}
}
