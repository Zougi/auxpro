package module.rest.auxiliaries;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.AuxiliaryBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.auxiliaries.AuxiliariesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class AuxiliaryGetRestTest extends RestTestBase {

	public AuxiliaryGetRestTest() {
		super(AuxiliariesServlet.PATH);
	}
 
	public String getBaseUrl() {
		return "/" + auxiliary1.getId();
	}
	
	/* TEST CASES */

	/* Negative Testing */

	@Test
	public void testI_asUnknown() throws Exception {
		Response rsp = prepare(getBaseUrl(), "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_invalidPassword() throws Exception {
		Response rsp = prepare(getBaseUrl(), auxiliary1.getUser().getName(), "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), rsp.getStatus());
		TestCase.assertFalse(rsp.hasEntity());
	}
	@Test
	public void testI_getUnknown() throws Exception {
		Response response = prepare("/" + StringConverter.stringToHex("dummy"), accountAdmin.getUser()).get();
		AssertHelper.assertException(APException.AUXILIARY_NOT_FOUND, response);
	}

	/* Positive Testing */

	@Test
	public void testV_checkStatus() throws Exception {
		Response rsp = prepare(getBaseUrl(), auxiliary1.getUser()).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_getValid() throws Exception {
		AuxiliaryBean userAux = prepare(getBaseUrl(), auxiliary1.getUser()).get(AuxiliaryBean.class);
		AssertHelper.assertAuxiliary(auxiliary1, userAux);
	}
	@Test
	public void testV_asOther() throws Exception {
		AuxiliaryBean userAux = prepare(getBaseUrl(), auxiliary2.getUser()).get(AuxiliaryBean.class);
		// Informations are private
		auxiliary1.getUser().setName(null);
		auxiliary1.getUser().setPassword(null);
		auxiliary1.getUser().setEmail(null);
		auxiliary1.getUser().setProfileActive(false);
		auxiliary1.getUser().setTutoSkipped(false);
		AssertHelper.assertAuxiliary(auxiliary1, userAux);
	}
}
