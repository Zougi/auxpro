package module.rest.services;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import org.ap.web.entity.auxiliary.AuxiliaryBean;
import org.ap.web.rest.servlet.services.ServicesServlet;
import org.junit.Test;

import junit.framework.TestCase;
import module.rest.RestTestBase;

public class ServiceGetAuxiliariesRestTest extends RestTestBase {

	public ServiceGetAuxiliariesRestTest() {
		super(ServicesServlet.PATH);
	}
	
	public String getUrlBase() {
		return "/" + userSadZ.getId() + "/auxiliaries";
	}
	
	/* TEST CASES */
	
	/* Negative Testing */
		
	@Test
	public void testI_asUnknownUser() {
		Response response = prepare(getUrlBase(), "dummy", "dummy").get();
		TestCase.assertEquals(Status.UNAUTHORIZED.getStatusCode(), response.getStatus());
		TestCase.assertFalse(response.hasEntity());
	}
	
	/* Positive Testing */
	
	@Test
	public void testV_asService_checkStatus() throws Exception {
		Response rsp = prepare(getUrlBase(), userSadZ).get();
		TestCase.assertEquals(Status.OK.getStatusCode(), rsp.getStatus());
		TestCase.assertTrue(rsp.hasEntity());
	}
	@Test
	public void testV_asService() throws Exception {
		AuxiliaryBean[] rsp = prepare(getUrlBase(), userSadZ).get(AuxiliaryBean[].class);
		TestCase.assertEquals(1, rsp.length);
	}
}
