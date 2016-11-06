package module.rest.indisponibilities;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.common.string.StringConverter;
import org.ap.web.entity.mongo.IndisponibilityBean;
import org.ap.web.internal.APException;
import org.ap.web.rest.servlet.indisponibilities.IndisponibilitiesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;
import tools.AssertHelper;

public class IndiosponibilityGetRestTest extends RestTestBase {

	public IndiosponibilityGetRestTest() {
		super(IndisponibilitiesServlet.PATH);
	}
	
	/* TEST DATA */
	
	private String getBaseUrl() {
		return "/" + indisponibility1.getId();
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() {
		Response response = prepare(getBaseUrl(), "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	@Test
	public void testI_getUnknown() throws Exception {
		Response response = prepare("/" + StringConverter.stringToHex("dummy"), userAuxA).get();
		AssertHelper.assertException(APException.INDISPONIBILITY_NOT_FOUND, response);
	}
	@Test
	public void testI_notOwner() throws Exception {
		Response response = prepare(getBaseUrl(), userAuxB).get();
		AssertHelper.assertException(APException.INDISPONIBILITY_NOT_FOUND, response);
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_checkStatus() throws Exception {
		Response rsp = prepare(getBaseUrl(), userAuxA).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_getValid() throws Exception {
		IndisponibilityBean indisponibility = prepare(getBaseUrl(), userAuxA).get(IndisponibilityBean.class);
		AssertHelper.assertIndisponibility(indisponibility1, indisponibility);
	}
}
